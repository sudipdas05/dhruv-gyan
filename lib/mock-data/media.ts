
import type { MediaAsset, MediaKind } from "@/lib/types";

const COLORS = [
  "from-sky-500 to-indigo-700",
  "from-cyan-500 to-blue-700",
  "from-indigo-500 to-slate-800",
  "from-teal-500 to-cyan-800",
  "from-blue-500 to-indigo-900",
  "from-slate-600 to-sky-900",
];

let seq = 0;
function mk(kind: MediaKind, title: string, date: string, location: string, expedition: string, tags: string[], credit: string, description: string, opts?: { duration?: string; featured?: boolean; color?: string }): MediaAsset {
  seq += 1;
  return {
    id: `m-${String(seq).padStart(3, "0")}`,
    kind, title, date, location, expedition, tags, credit, description,
    color: opts?.color ?? COLORS[seq % COLORS.length],
    duration: opts?.duration,
    featured: opts?.featured,
  };
}

export const mediaAssets: MediaAsset[] = [
  // ---------- PHOTOS (15) ----------
  mk("photo", "Aurora australis over Bharati Station", "2022-07-14", "Larsemann Hills, Antarctica", "42nd Indian Antarctic Expedition", ["aurora", "Bharati", "night sky"], "Wintering Photo Team / NCPOR", "A green-purple auroral arc stretches above Bharati's fuel farm during the 2022 polar night, captured during the strongest geomagnetic storm of the season.", { featured: true }),
  mk("photo", "Maitri under the midnight sun", "2023-01-04", "Schirmacher Oasis, Antarctica", "43rd Indian Antarctic Expedition", ["Maitri", "station", "summer"], "Dr. K. Joshi / NCPOR", "The Maitri station complex bathed in 24-hour daylight, with the polar plateau rising behind the Schirmacher Oasis."),
  mk("photo", "Bharati module assembly, final lift", "2011-11-22", "Larsemann Hills, Antarctica", "Bharati Commissioning Expedition", ["Bharati", "construction", "logistics"], "NCPOR Logistics", "A heavy-lift helicopter positions the final habitation module during Bharati's construction season."),
  mk("photo", "Emperor penguin colony census frame", "2022-10-30", "Atka Bay vicinity, Antarctica", "43rd Indian Antarctic Expedition", ["penguins", "ecology", "monitoring"], "Dr. F. Ali / NCPOR", "Very-high-resolution satellite frame used in the emperor penguin census methodology, validated by ground counts."),
  mk("photo", "Pancake ice in the Southern Ocean", "2023-12-08", "Southern Ocean, 62°S", "44th Indian Antarctic Expedition", ["sea ice", "Southern Ocean", "transit"], "Deck Team / NCPOR", "Fresh pancake ice forming during the southbound transit — an early sign of the freeze-up season."),
  mk("photo", "CTD rosette deployment at dusk", "2024-02-11", "Prydz Bay, Antarctica", "44th Indian Antarctic Expedition", ["oceanography", "CTD", "Prydz Bay"], "Dr. M. Krishnan / NCPOR", "The conductivity-temperature-depth rosette is lowered for the 30th station of the Prydz Bay multidisciplinary survey."),
  mk("photo", "Sastrugi wind ridges, polar plateau", "2022-06-19", "Interior Dronning Maud Land", "42nd Indian Antarctic Expedition", ["snow", "wind", "plateau"], "Traverse Team / NCPOR", "Hard-packed sastrugi ridges sculpt the plateau surface along the fuel-traverse route."),
  mk("photo", "Rope team near the Larsemann Hills", "2024-01-27", "Larsemann Hills, Antarctica", "44th Indian Antarctic Expedition", ["fieldwork", "safety", "Bharati"], "Field Safety Officer / NCPOR", "A roped field party crosses a blue-ice field during geological sampling operations."),
  mk("photo", "Nacreous clouds over Maitri", "2022-08-02", "Schirmacher Oasis, Antarctica", "42nd Indian Antarctic Expedition", ["clouds", "stratosphere", "Maitri"], "Dr. K. Joshi / NCPOR", "Polar stratospheric (nacreous) clouds glow above Maitri during the late-winter ozone season."),
  mk("photo", "Flag ceremony, station opening day", "2023-01-26", "Bharati Station, Antarctica", "43rd Indian Antarctic Expedition", ["ceremony", "Republic Day", "Bharati"], "NCPOR Outreach", "Expedition members mark Republic Day at Bharati with the tricolour on the Antarctic ice."),
  mk("photo", "Winter-over team farewell", "2023-02-20", "Bharati Station, Antarctica", "43rd Indian Antarctic Expedition", ["wintering", "team", "Bharati"], "NCPOR Outreach", "The departing summer team bids farewell to the 14-member wintering crew who will keep the station alive through the polar night."),
  mk("photo", "Krill specimen sampling aboard", "2023-12-29", "Prydz Bay, Antarctica", "44th Indian Antarctic Expedition", ["krill", "biology", "lab"], "Dr. F. Ali / NCPOR", "Live krill specimens from a targeted net tow are sorted in the wet lab for length-frequency analysis."),
  mk("photo", "Lichens of the Schirmacher Oasis", "2022-01-15", "Schirmacher Oasis, Antarctica", "41st Indian Antarctic Expedition", ["lichens", "ecology", "oasis"], "Dr. S. Pillai / NCPOR", "Cold-adapted lichen communities on exposed gneiss — among the few visible signs of life in the Oasis."),
  mk("photo", "Mobile outreach exhibition, Goa", "2024-06-08", "Science Centre, Goa", "National Polar Science Day 2024", ["outreach", "exhibition", "students"], "NCPOR Outreach Cell", "Students explore the travelling polar exhibition during National Polar Science Day celebrations."),
  mk("photo", "Supply traverse departure, Bharati", "2024-11-30", "Larsemann Hills, Antarctica", "44th Indian Antarctic Expedition", ["traverse", "logistics", "Bharati"], "NCPOR Logistics", "The annual fuel and cargo traverse departs Bharati for the coast, resupplying field depots."),
  // ---------- VIDEOS (6) ----------
  mk("video", "44th Expedition: The Road to Bharati", "2025-01-12", "Larsemann Hills, Antarctica", "44th Indian Antarctic Expedition", ["expedition", "documentary", "Bharati"], "NCPOR Outreach Cell", "Feature-length look at the 44th expedition — the voyage south, the traverse, and the science that keeps India's polar legacy moving.", { duration: "12:44", featured: true }),
  mk("video", "Life at Maitri: A Wintering Diary", "2023-09-10", "Maitri Station, Antarctica", "43rd Indian Antarctic Expedition", ["wintering", "life", "Maitri"], "Wintering Team / NCPOR", "Fourteen people, nine months of darkness. The wintering crew of Maitri records daily life at 70°S.", { duration: "08:31" }),
  mk("video", "Glacier calving timelapse, Amery front", "2022-02-14", "Amery Ice Shelf, Antarctica", "42nd Indian Antarctic Expedition", ["glacier", "calving", "timelapse"], "Dr. R. Verma / NCPOR", "Weeks compressed into seconds as the Amery Ice Shelf front sheds bergs into Prydz Bay.", { duration: "00:58" }),
  mk("video", "Himadri: India's Arctic Outpost", "2024-03-15", "Ny-Alesund, Svalbard", "Himadri Arctic Programme", ["Arctic", "Himadri", "documentary"], "NCPOR Outreach Cell", "Meet the scientists who keep India's northernmost observatory running through the polar night.", { duration: "06:47" }),
  mk("video", "Crossing the Polar Front", "2023-12-19", "Southern Ocean, 58°S", "43rd Indian Antarctic Expedition", ["ocean", "polar front", "transit"], "NCPOR Outreach Cell", "Why one invisible line in the Southern Ocean matters to India's climate — explained by the oceanographers who cross it every year.", { duration: "04:12" }),
  mk("video", "Students Ask: Polar Science Special", "2024-08-20", "NCPOR, Goa", "National Polar Science Day 2024", ["education", "students", "Q&A"], "NCPOR Outreach Cell", "School students put their toughest questions to returning expedition scientists.", { duration: "09:26" }),
  // ---------- INFOGRAPHICS (2) ----------
  mk("infographic", "Anatomy of the 44th Expedition", "2024-12-01", "NCPOR, Goa", "44th Indian Antarctic Expedition", ["infographic", "expedition", "logistics"], "DHRUV GYAN Design Cell", "One-screen breakdown of the 44th expedition: team composition, station footprints, vessel track and science tracks."),
  mk("infographic", "Why the poles control your monsoon", "2025-06-15", "NCPOR, Goa", "Outreach Series", ["infographic", "climate", "monsoon"], "DHRUV GYAN Design Cell", "Explains the teleconnection between Antarctic sea ice, Southern Ocean heat uptake and the Indian monsoon."),
  // ---------- AUDIO (1) ----------
  mk("audio", "Sounds of the station: wind at Bharati", "2023-06-21", "Bharati Station, Antarctica", "43rd Indian Antarctic Expedition", ["audio", "ambience", "Bharati"], "Wintering Team / NCPOR", "Field recording of katabatic wind events across the Bharati plateau, used in the 'Life at Maitri' documentary."),
  // ---------- PRESS (2) ----------
  mk("press", "Press kit: 44th Indian Antarctic Expedition", "2024-11-05", "NCPOR, Goa", "44th Indian Antarctic Expedition", ["press", "media", "kit"], "NCPOR Public Information", "Approved imagery, fact sheets and backgrounders for media coverage of the 44th expedition."),
  mk("press", "Backgrounder: India's Polar Programme", "2025-01-09", "NCPOR, Goa", "Institutional", ["press", "background", "programme"], "NCPOR Public Information", "Two-page institutional backgrounder covering the history, stations and priorities of India's polar research."),
];

export function getMedia(id: string): MediaAsset | undefined {
  return mediaAssets.find((m) => m.id === id);
}
