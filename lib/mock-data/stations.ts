
import type { Station } from "@/lib/types";

export const stations: Station[] = [
  {
    id: "himadri",
    name: "Himadri",
    region: "Arctic",
    country: "Norway (Svalbard)",
    lat: 78.92, lon: 11.93,
    established: 2008,
    purpose:
      "India's first Arctic research station, located in the international research town of Ny-Ålesund, Svalbard. Himadri anchors India's contributions to coordinated international Arctic observing programmes.",
    researchAreas: [
      "Atmospheric science and aerosol chemistry",
      "Glaciology and cryosphere monitoring",
      "Arctic oceanography and sea-ice studies",
      "Terrestrial and fjord ecosystems",
    ],
    currentActivities: [
      "Year-round aerosol and greenhouse-gas observations",
      "Kongsfjorden glacier mass-balance programme",
      "Sea-ice drift and thickness monitoring",
    ],
    expeditions: ["Annual Arctic expeditions since 2007–08"],
    relatedResources: ["res-007", "res-018"],
    color: "#22d3ee",
  },
  {
    id: "maitri",
    name: "Maitri",
    region: "Antarctica",
    lat: -70.77, lon: 11.73,
    established: 1989,
    purpose:
      "India's second Antarctic research station, situated in the Schirmacher Oasis of Queen Maud Land. Maitri supports year-round multidisciplinary research and serves as a logistics hub for Indian Antarctic operations.",
    researchAreas: [
      "Meteorology and automatic weather station network",
      "Atmospheric chemistry and aerosols",
      "Earth sciences and geology of the Oasis",
      "Human physiology in polar isolation",
    ],
    currentActivities: [
      "Continuous AWS meteorological record since 1990s",
      "Boundary-layer aerosol and ozone monitoring",
      "Wintering crew physiological study",
    ],
    expeditions: [
      "41st Indian Antarctic Expedition",
      "42nd Indian Antarctic Expedition",
      "43rd Indian Antarctic Expedition",
      "44th Indian Antarctic Expedition",
    ],
    relatedResources: ["res-004", "res-008", "res-011", "res-016"],
    color: "#818cf8",
  },
  {
    id: "bharati",
    name: "Bharati",
    region: "Antarctica",
    lat: -69.05, lon: 76.18,
    established: 2012,
    purpose:
      "India's third Antarctic station, commissioned in the Larsemann Hills of Prydz Bay. Bharati is a modern, energy-efficient facility focused on multidisciplinary science in the Indian Ocean sector of East Antarctica.",
    researchAreas: [
      "Oceanography of Prydz Bay and the shelf break",
      "Glaciology of the Amery Ice Shelf system",
      "Polar ecology and penguin colony monitoring",
      "Geology and Gondwana correlation studies",
    ],
    currentActivities: [
      "Prydz Bay multidisciplinary ocean surveys",
      "Ice-shelf radar and GNSS deformation networks",
      "Satellite-linked emperor penguin census",
    ],
    expeditions: [
      "43rd Indian Antarctic Expedition",
      "44th Indian Antarctic Expedition",
    ],
    relatedResources: ["res-001", "res-002", "res-003", "res-006", "res-009", "res-017", "res-019"],
    color: "#38bdf8",
  },
  {
    id: "himansh",
    name: "Himansh (Himalayan Cryosphere)",
    region: "Himalaya",
    lat: 32.24, lon: 77.58,
    established: 2016,
    purpose:
      "A high-altitude cryosphere observation programme in the Chandra basin of Himachal Pradesh, extending polar research methods to the 'third pole' — the Himalayan cryosphere.",
    researchAreas: [
      "Glacier mass balance and hydrology",
      "Snowpack and permafrost monitoring",
      "Glacio-hydrological modelling for water security",
    ],
    currentActivities: [
      "Runoff and mass-balance measurements on Chhota Shigri Glacier",
      "Automatic weather stations across elevation bands",
    ],
    expeditions: ["Annual Himalayan field campaigns"],
    relatedResources: [],
    color: "#2dd4bf",
  },
  {
    id: "saser",
    name: "Siachen–Saser Kangri Observation Site",
    region: "Himalaya",
    lat: 34.87, lon: 77.75,
    established: 2019,
    purpose:
      "Sample remote-sensing validation site in the Karakoram, studying surge-type glacier behaviour and high-altitude snow processes (sample site for DHRUV GYAN demonstration).",
    researchAreas: [
      "Surge-type glacier dynamics",
      "Avalanche and snow-process observation",
    ],
    currentActivities: [
      "Feature-tracked velocity fields from Sentinel-2",
      "Seasonal snow-line tracking",
    ],
    expeditions: ["Karakoram field campaigns"],
    relatedResources: [],
    color: "#5eead4",
  },
];

export function getStation(id: string): Station | undefined {
  return stations.find((s) => s.id === id);
}
