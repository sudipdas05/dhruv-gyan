"use client";

import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { stations } from "@/lib/mock-data";
import type { Station } from "@/lib/types";
import { cn } from "@/lib/utils";

const R = 1;

function latLonToVec3(lat: number, lon: number, r: number = R): THREE.Vector3 {
  const phi = (lat * Math.PI) / 180;
  const theta = (lon * Math.PI) / 180;
  return new THREE.Vector3(r * Math.cos(phi) * Math.cos(theta), r * Math.sin(phi), -r * Math.cos(phi) * Math.sin(theta));
}

function graticule(r: number): THREE.BufferGeometry {
  const pts: number[] = [];
  const seg = 72;
  const push = (a: THREE.Vector3, b: THREE.Vector3) => pts.push(a.x, a.y, a.z, b.x, b.y, b.z);
  for (let lat = -60; lat <= 60; lat += 30)
    for (let i = 0; i < seg; i++) push(latLonToVec3(lat, (i / seg) * 360, r), latLonToVec3(lat, ((i + 1) / seg) * 360, r));
  for (let lon = 0; lon < 360; lon += 30)
    for (let i = 0; i < seg; i++) push(latLonToVec3(-90 + (i / seg) * 180, lon, r), latLonToVec3(-90 + ((i + 1) / seg) * 180, lon, r));
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
  return g;
}

function stars(): THREE.BufferGeometry {
  const pts: number[] = [];
  for (let i = 0; i < 700; i++) {
    const v = new THREE.Vector3().randomDirection().multiplyScalar(28 + Math.random() * 45);
    pts.push(v.x, v.y, v.z);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
  return g;
}

function arcLine(from: THREE.Vector3, to: THREE.Vector3): THREE.Line {
  const mid = from.clone().add(to).normalize().multiplyScalar(R + from.distanceTo(to) * 0.35);
  const curve = new THREE.QuadraticBezierCurve3(from, mid, to);
  const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(64));
  return new THREE.Line(geo, new THREE.LineBasicMaterial({ color: "#22d3ee", transparent: true, opacity: 0.5 }));
}

function Marker({ station, onSelect }: { station: Station; onSelect: (id: string) => void }) {
  const ring = useRef<THREE.Mesh>(null);
  const pos = useMemo(() => latLonToVec3(station.lat, station.lon, R * 1.01), [station]);
  const quat = useMemo(
    () => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), pos.clone().normalize()),
    [pos]
  );
  useFrame((state) => {
    if (ring.current) ring.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2 + station.lon) * 0.18);
  });
  return (
    <group
      position={pos}
      quaternion={quat}
      onClick={(e) => { e.stopPropagation(); onSelect(station.id); }}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "grab")}
    >
      <mesh>
        <sphereGeometry args={[0.022, 12, 12]} />
        <meshBasicMaterial color={station.color} />
      </mesh>
      <mesh ref={ring}>
        <ringGeometry args={[0.035, 0.05, 32]} />
        <meshBasicMaterial color={station.color} transparent opacity={0.7} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

interface RotState { x: number; y: number; tx: number; ty: number; z: number; tz: number }

/**
 * Everything that calls useFrame / uses the R3F store MUST live inside <Canvas>.
 * (The previous version called useFrame in the component that renders <Canvas>,
 * which throws "R3F: Hooks can only be used within the Canvas component!")
 */
function Scene({ rot, autoRef, dragging, onSelect }: {
  rot: MutableRefObject<RotState>;
  autoRef: MutableRefObject<boolean>;
  dragging: MutableRefObject<boolean>;
  onSelect: (id: string) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const grat = useMemo(() => graticule(R * 1.001), []);
  const starGeo = useMemo(() => stars(), []);
  const india = useMemo(() => latLonToVec3(21, 78, R), []);
  const arcs = useMemo(
    () =>
      stations
        .filter((s) => ["himadri", "maitri", "bharati"].includes(s.id))
        .map((s) => arcLine(latLonToVec3(21, 78, R * 1.005), latLonToVec3(s.lat, s.lon, R * 1.005))),
    []
  );

  useFrame((state, delta) => {
    const r = rot.current;
    if (autoRef.current && !dragging.current) r.ty += delta * 0.12;
    r.x += (r.tx - r.x) * 0.08;
    r.y += (r.ty - r.y) * 0.08;
    r.z += (r.tz - r.z) * 0.1;
    if (group.current) {
      group.current.rotation.x = r.x;
      group.current.rotation.y = r.y;
    }
    state.camera.position.z = r.z;
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 3, 5]} intensity={1.1} />
      <points geometry={starGeo}>
        <pointsMaterial color="#7dd3fc" size={0.045} sizeAttenuation transparent opacity={0.7} />
      </points>
      <group ref={group}>
        <mesh>
          <sphereGeometry args={[R, 64, 64]} />
          <meshStandardMaterial color="#0b1e3a" roughness={0.85} metalness={0.15} />
        </mesh>
        <lineSegments geometry={grat}>
          <lineBasicMaterial color="#38bdf8" transparent opacity={0.16} />
        </lineSegments>
        {arcs.map((l, i) => <primitive key={i} object={l} />)}
        <mesh position={india}>
          <sphereGeometry args={[0.014, 10, 10]} />
          <meshBasicMaterial color="#fbbf24" />
        </mesh>
        {stations.map((s) => <Marker key={s.id} station={s} onSelect={onSelect} />)}
      </group>
      <mesh scale={1.16}>
        <sphereGeometry args={[R, 32, 32]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.05} side={THREE.BackSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </>
  );
}

export default function PolarGlobe({ interactive = true, onSelectStation, className }: {
  interactive?: boolean; onSelectStation?: (id: string) => void; className?: string;
}) {
  const rot = useRef<RotState>({ x: 0.35, y: 0.8, tx: 0.35, ty: 0.8, z: 2.7, tz: 2.7 });
  const [auto, setAuto] = useState(true);
  const autoRef = useRef(true);
  const dragging = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => { autoRef.current = auto; }, [auto]);

  // Non-passive wheel listener so zooming the globe doesn't also scroll the page.
  // Only hijack the wheel on the interactive globe (Explore page), never on the home hero.
  useEffect(() => {
    const el = wrap.current;
    if (!el || !interactive) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      rot.current.tz = Math.max(1.7, Math.min(4.4, rot.current.tz + e.deltaY * 0.002));
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [interactive]);

  const down = (e: React.PointerEvent) => { dragging.current = true; last.current = { x: e.clientX, y: e.clientY }; };
  const move = (e: React.PointerEvent) => {
    if (!dragging.current || !last.current) return;
    const dx = e.clientX - last.current.x;
    const dy = e.clientY - last.current.y;
    last.current = { x: e.clientX, y: e.clientY };
    rot.current.ty += dx * 0.006;
    rot.current.tx = Math.max(-1.5, Math.min(1.5, rot.current.tx + dy * 0.006));
  };
  const up = () => { dragging.current = false; last.current = null; };

  return (
    <div
      ref={wrap}
      className={cn("relative select-none", className)}
      style={{ touchAction: "none", cursor: "grab" }}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerLeave={up}
    >
      {interactive && (
        <div className="absolute right-3 top-3 z-10 flex flex-col gap-1.5">
          <button onClick={() => setAuto(!auto)} className="glass rounded-lg px-2.5 py-1.5 text-[11px] font-medium text-primary focus-ring">
            {auto ? "Pause" : "Rotate"}
          </button>
          <button onClick={() => { rot.current.tx = -Math.PI / 2 + 0.12; }} className="glass rounded-lg px-2.5 py-1.5 text-[11px] font-medium text-primary focus-ring">
            South pole
          </button>
          <button onClick={() => { rot.current.tx = 0.35; rot.current.ty = 0.8; rot.current.tz = 2.7; }} className="glass rounded-lg px-2.5 py-1.5 text-[11px] font-medium text-primary focus-ring">
            Reset
          </button>
        </div>
      )}
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 2.7], fov: 42 }}
        onPointerMissed={() => { if (interactive) onSelectStation?.(""); }}
      >
        <Scene rot={rot} autoRef={autoRef} dragging={dragging} onSelect={(id) => onSelectStation?.(id)} />
      </Canvas>
    </div>
  );
}
