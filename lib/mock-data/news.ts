
import type { NewsItem } from "@/lib/types";

const C = ["from-sky-500 to-indigo-700", "from-cyan-500 to-blue-700", "from-indigo-500 to-slate-800", "from-teal-500 to-cyan-800", "from-blue-500 to-indigo-900", "from-slate-600 to-sky-900"];

let seq = 0;
function mk(date: string, category: NewsItem["category"], title: string, excerpt: string, body: string): NewsItem {
  seq += 1;
  return { id: `news-${String(seq).padStart(3, "0")}`, date, category, title, excerpt, body, color: C[seq % C.length] };
}

export const newsItems: NewsItem[] = [
  mk("2025-01-09", "Expedition Updates", "44th Indian Antarctic Expedition marks National Polar Science Day from Bharati",
    "Team members at Bharati and Maitri joined students across India via live link to commemorate the day the first Indian team set foot on Antarctica.",
    "Members of the 44th Indian Antarctic Expedition marked National Polar Science Day with a live interaction connecting Bharati station to classrooms across six states. Expedition scientists answered student questions on polar logistics, wintering life and climate science. The day commemorates the arrival of the first Indian Antarctic expedition team in 1982."),
  mk("2024-12-18", "Expedition Updates", "Annual resupply traverse reaches Maitri on schedule",
    "The fuel and cargo convoy completed the ice-shelf traverse to Maitri, sustaining year-round station operations.",
    "The annual traverse carrying fuel and cargo from the coast to Maitri station has been completed on schedule, expedition officials confirmed. The traverse is the lifeline of Indian Antarctic operations, resupplying the station ahead of the winter isolation period."),
  mk("2024-11-28", "Expedition Updates", "44th expedition departs Goa aboard research vessel",
    "A 101-member team began the voyage south for the 2024–25 austral summer season.",
    "The 44th Indian Antarctic Expedition departed Goa with 101 members and 42 science projects spanning six disciplines. The team will operate from Bharati and Maitri stations through the austral summer, continuing three decades of long-term observations."),
  mk("2025-02-20", "Research", "New ice-velocity mosaic maps the Indian Antarctic sector at 100 m resolution",
    "Feature-tracked Sentinel-1 scenes reveal changing flow patterns of 14 outlet glaciers around Prydz Bay.",
    "Scientists at NCPOR have released a six-year ice-velocity mosaic of the Indian Antarctic sector derived from feature tracking of Sentinel-1 radar imagery. The dataset quantifies accelerating flow in three outlet glaciers and provides new flux-gate estimates for the Prydz Bay drainage system."),
  mk("2024-10-05", "Research", "Prydz Bay carbon uptake study published",
    "Underway measurements show the region acts as a strong but variable summertime carbon sink.",
    "A study led by NCPOR oceanographers quantified carbon dioxide fluxes in Prydz Bay across three summer seasons. The Southern Ocean surrounding Antarctica absorbs a significant share of human-emitted carbon, and the new data reduce uncertainty for the Indian sector."),
  mk("2024-09-12", "Institutional News", "NCPOR commissions upgraded atmospheric chemistry laboratory",
    "The new facility at Maitri will expand continuous measurements of aerosols and reactive gases.",
    "An upgraded atmospheric chemistry laboratory was commissioned at Maitri station, extending continuous aerosol and trace-gas observations that form one of the longest such records in East Antarctica."),
  mk("2025-03-22", "Events", "International Polar Week: NCPOR opens virtual lab tours to schools",
    "Over 18,000 students registered for live virtual tours of polar laboratories and stations.",
    "As part of International Polar Week, NCPOR scientists hosted virtual laboratory tours and live Q&A sessions for schools. The programme introduced students to ice-core analysis, ocean moorings and the operation of automatic weather stations."),
  mk("2024-07-19", "Announcements", "Call for proposals: 45th Indian Antarctic Expedition scientific programme",
    "Researchers are invited to submit project proposals for the 2025–26 austral summer season.",
    "NCPOR has invited proposals for the scientific programme of the 45th Indian Antarctic Expedition. Priority areas include continued long-term observing series, Prydz Bay ocean processes, ice-shelf stability and polar biomedical research."),
  mk("2024-12-02", "Education", "Polar learning modules now mapped to NCERT competencies",
    "The DHRUV GYAN education cell has aligned six learning modules with Class 8–10 science outcomes.",
    "Six polar science learning modules — covering Antarctica, the Arctic, glaciers, polar oceans and climate — have been mapped to NCERT science competencies for Classes 8 to 10, supporting classroom adoption across school boards."),
  mk("2025-05-30", "Institutional News", "Himadri completes sixteenth year of continuous Arctic observations",
    "The Svalbard station's aerosol and cryosphere record now spans nearly two decades.",
    "India's Arctic station Himadri completed sixteen years of continuous observations in Ny-Alesund, Svalbard. The record includes one of the longest continuous black-carbon datasets in the high Arctic and underpins India's contributions to international assessing bodies."),
];

export function getNews(id: string): NewsItem | undefined {
  return newsItems.find((n) => n.id === id);
}
