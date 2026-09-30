
import type { Resource, Domain, Region, ContentType } from "@/lib/types";

let seq = 0;
const nid = () => `res-${String(++seq).padStart(3, "0")}`;

interface MkInput {
  title: string;
  type: ContentType;
  year: number;
  authors?: string[];
  region: Region;
  domain: Domain;
  abstract: string;
  keywords: string[];
  expedition?: string;
  keyPoints: string[];
  fileSize?: string;
  doi?: string;
  mediaId?: string;
  moduleId?: string;
  views?: number;
  downloads?: number;
  tags?: string[];
}

function mk(r: MkInput): Resource {
  const authors = r.authors ?? ["NCPOR Scientific Team"];
  return {
    id: nid(),
    title: r.title,
    type: r.type,
    year: r.year,
    authors,
    region: r.region,
    domain: r.domain,
    abstract: r.abstract,
    keywords: r.keywords,
    tags: r.tags ?? r.keywords,
    expedition: r.expedition,
    language: "English",
    citation: `${authors.join(", ")} (${r.year}). ${r.title}. National Centre for Polar and Ocean Research, Ministry of Earth Sciences.`,
    views: r.views ?? 400 + seq * 37,
    downloads: r.downloads ?? 120 + seq * 13,
    published: true,
    keyPoints: r.keyPoints,
    fileSize: r.fileSize,
    doi: r.doi,
    mediaId: r.mediaId,
    moduleId: r.moduleId,
  };
}

export const resources: Resource[] = [
  // ---------------- PUBLICATIONS ----------------
  mk({
    title: "Ice-Sheet Dynamics of the Lambert Basin from a Decade of Satellite Altimetry",
    type: "publication", year: 2023,
    authors: ["Dr. Ananya Iyer", "Dr. Vikram Sethi"],
    region: "Antarctica", domain: "Glaciology",
    expedition: "41st Indian Antarctic Expedition",
    abstract:
      "A ten-year record of ICESat-2 and CryoSat-2 altimetry is used to reconstruct elevation change across the Lambert Glacier basin, the largest ice-drainage system in East Antarctica. The results resolve spatially variable thinning near the grounding zone and attribute the signal to modified ocean forcing rather than atmospheric drivers.",
    keywords: ["ice-sheet dynamics", "satellite altimetry", "mass balance", "grounding line", "East Antarctica"],
    keyPoints: [
      "Thinning rates up to 0.42 m/yr detected near the Lambert Glacier grounding zone.",
      "Elevation-change patterns correlate with intrusions of modified Circumpolar Deep Water.",
      "Surface-mass-balance anomalies alone cannot explain the observed drawdown.",
    ],
    fileSize: "2.4 MB", doi: "10.5281/dhruvgyan.0001",
  }),
  mk({
    title: "Carbon Uptake and Seasonal Ventilation of the Southern Ocean around Prydz Bay",
    type: "publication", year: 2023,
    authors: ["Dr. Meera Krishnan"],
    region: "Southern Ocean", domain: "Oceanography",
    expedition: "43rd Indian Antarctic Expedition",
    abstract:
      " underway pCO2 observations from three consecutive austral summers quantify the strength and seasonality of the carbon sink south of the polar front. The study shows that deep winter mixing ventilates carbon-rich water, while intense spring blooms drive strong uptake, making Prydz Bay a region of significant interannual variability.",
    keywords: ["carbon uptake", "pCO2", "Southern Ocean", "Prydz Bay", "mixed layer"],
    keyPoints: [
      "Net summertime CO2 flux of −1.8 mol C m⁻² across the study domain.",
      "Bloom-driven uptake in spring offsets 60% of winter ventilation losses.",
      "Interannual variability tracks changes in sea-ice retreat timing.",
    ],
    fileSize: "1.9 MB", doi: "10.5281/dhruvgyan.0002",
  }),
  mk({
    title: "Mass Balance of the East Antarctic Ice Sheet under a Warming Climate, 2003–2023",
    type: "publication", year: 2024,
    authors: ["Dr. Rohit Verma", "Dr. Ananya Iyer"],
    region: "Antarctica", domain: "Climate Science",
    expedition: "44th Indian Antarctic Expedition",
    abstract:
      "Combining gravimetry, altimetry and input-output methods, this synthesis reassesses the mass balance of the East Antarctic Ice Sheet over two decades. The ice sheet remains close to balance overall, but coastal sectors including the Wilkes and Aurora basins show accelerating mass loss that is sensitive to sub-ice-shelf melting.",
    keywords: ["mass balance", "GRACE", "ice sheet", "climate change", "sea level"],
    keyPoints: [
      "East Antarctica near balance overall (−14 ± 21 Gt/yr) for 2003–2023.",
      "Wilkes Basin loss accelerated threefold after 2016.",
      "Projected sub-ice-shelf melt dominates uncertainty in 2100 sea-level estimates.",
    ],
    fileSize: "3.1 MB", doi: "10.5281/dhruvgyan.0003",
  }),
  mk({
    title: "Boundary-Layer Aerosol Characteristics at Maitri Observatory, 2019–2022",
    type: "publication", year: 2022,
    authors: ["Dr. Kavita Joshi"],
    region: "Antarctica", domain: "Atmospheric Science",
    expedition: "42nd Indian Antarctic Expedition",
    abstract:
      "Continuous measurements of aerosol optical properties at Maitri station reveal a clean continental background modulated by episodic long-range transport. Summer aerosol loading is dominated by sea-salt and secondary sulfate, with a distinct biomass-burning fingerprint arriving from southern mid-latitudes.",
    keywords: ["aerosols", "boundary layer", "Maitri", "black carbon", "long-range transport"],
    keyPoints: [
      "Black carbon concentrations remain among the lowest measured globally.",
      "Aged biomass-burning plumes identified in 18% of summer days.",
      "Observations provide a baseline for detecting future polar amplification signals.",
    ],
    fileSize: "1.6 MB", doi: "10.5281/dhruvgyan.0004",
  }),
  mk({
    title: "Krill Distribution and Foraging Hotspots off the Princess Elizabeth Land Coast",
    type: "publication", year: 2023,
    authors: ["Dr. Farhan Ali", "Dr. Meera Krishnan"],
    region: "Southern Ocean", domain: "Marine Biology",
    expedition: "43rd Indian Antarctic Expedition",
    abstract:
      "Acoustic-transect and net-tow surveys map the distribution of Antarctic krill along the Prydz Bay shelf break. Dense aggregations correlate with the shelf-break front and sea-ice retreat patterns, identifying persistent foraging hotspots used by tracked penguins and seals during the breeding season.",
    keywords: ["krill", "acoustic survey", "Prydz Bay", "food web", "sea ice"],
    keyPoints: [
      "Shelf-break front concentrates krill biomass during spring retreat.",
      "Three persistent hotspots overlap with tracked predator foraging grounds.",
      "Results support proposed marine protected area planning in Prydz Bay.",
    ],
    fileSize: "2.2 MB", doi: "10.5281/dhruvgyan.0005",
  }),
  mk({
    title: "Petrology and Provenance of Garnet-Bearing Gneisses in the Larsemann Hills",
    type: "publication", year: 2021,
    authors: ["Dr. Sudha Pillai"],
    region: "Antarctica", domain: "Geology",
    expedition: "40th Indian Antarctic Expedition",
    abstract:
      "Detailed petrography and geochronology of garnet-biotite gneisses exposed near Bharati station constrain the tectonic assembly of the Larsemann Hills. Metamorphic zircon ages cluster near 930 Ma, linking the terrain to the late Mesoproterozoic evolution of the Indo-Antarctic margin of Gondwana.",
    keywords: ["petrology", "geochronology", "Larsemann Hills", "Gondwana", "Bharati"],
    keyPoints: [
      "Peak metamorphism dated at 930 ± 12 Ma via SHRIMP zircon analysis.",
      "Provenance spectra match the Indo-Antarctic sector of Gondwana.",
      "Findings refine correlations between Indian and Antarctic crustal blocks.",
    ],
    fileSize: "2.8 MB", doi: "10.5281/dhruvgyan.0006",
  }),
  mk({
    title: "Coordinated Arctic Observations from Himadri: Sea-Ice, Aerosols and Cryosphere Interactions",
    type: "publication", year: 2024,
    authors: ["Dr. Arvind Menon"],
    region: "Arctic", domain: "Earth Observation",
    abstract:
      "This paper consolidates sixteen years of coordinated observations from India's Himadri research station in Ny-Ålesund, Svalbard. Combined sea-ice, aerosol and glacier measurements show amplified Arctic warming altering pollutant transport pathways and accelerating glacier mass loss in the Kongsfjorden region.",
    keywords: ["Arctic", "Himadri", "sea ice", "aerosols", "Svalbard", "cryosphere"],
    keyPoints: [
      "Kongsfjorden glaciers thinned by 0.6–1.1 m/yr over the observation period.",
      "Declining sea-ice cover extends the aerosol dark-deposition season.",
      "The station now anchors India's contribution to coordinated Arctic observing networks.",
    ],
    fileSize: "2.0 MB", doi: "10.5281/dhruvgyan.0007",
  }),
  mk({
    title: "Climatology of Automatic Weather Station Observations at Bharati Station",
    type: "publication", year: 2023,
    authors: ["Dr. Neha Kulkarni"],
    region: "Antarctica", domain: "Meteorology",
    abstract:
      "Eleven years of AWS data from Bharati station are homogenized into a station climatology for the Larsemann Hills. The record characterizes katabatic wind regimes, extreme cold events below −40 °C, and a statistically significant warming trend of 0.11 °C per decade in near-surface air temperature.",
    keywords: ["automatic weather station", "climatology", "katabatic winds", "Bharati", "temperature trend"],
    keyPoints: [
      "Near-surface warming trend of +0.11 °C/decade (2009–2020).",
      "Katabatic outflows dominate winter wind regimes from the plateau.",
      "Dataset underpins regional model evaluation for East Antarctica.",
    ],
    fileSize: "1.5 MB", doi: "10.5281/dhruvgyan.0008",
  }),
  mk({
    title: "Long-Term Monitoring of Emperor Penguin Colonies Using Very-High-Resolution Imagery",
    type: "publication", year: 2022,
    authors: ["Dr. Farhan Ali"],
    region: "Antarctica", domain: "Polar Ecology",
    abstract:
      "Very-high-resolution satellite imagery is used to census emperor penguin colonies within Indian Antarctic expedition operating areas. Occupancy is stable at two colonies but declining at a third, with breeding success linked to fast-ice persistence through the chick-rearing period.",
    keywords: ["emperor penguin", "satellite monitoring", "fast ice", "colony census"],
    keyPoints: [
      "Two of three monitored colonies remained stable over a decade.",
      "Breeding failure coincides with early fast-ice breakout years.",
      "Methodology supports continent-wide citizen-science census programmes.",
    ],
    fileSize: "1.7 MB", doi: "10.5281/dhruvgyan.0009",
  }),
  mk({
    title: "Physiological Adaptation and Immune Profiles of Indian Wintering Teams in Antarctica",
    type: "publication", year: 2024,
    authors: ["Dr. Sameer Rao"],
    region: "Antarctica", domain: "Human Biology",
    expedition: "43rd Indian Antarctic Expedition",
    abstract:
      "A longitudinal study of wintering team members tracks physiological adaptation across 14 months of Antarctic isolation. Markers of immune modulation show a mid-winter trough, while sleep and vitamin-D data inform countermeasure protocols now adopted for station medical practice.",
    keywords: ["wintering physiology", "immune function", "isolation", "telemedicine"],
    keyPoints: [
      "Circulating immune markers show a reproducible mid-winter minimum.",
      "Structured light exposure and exercise blunt sleep-phase delay.",
      "Findings feed directly into NCPOR station medical protocols.",
    ],
    fileSize: "1.4 MB", doi: "10.5281/dhruvgyan.0010",
  }),

  // ---------------- EXPEDITION REPORTS ----------------
  mk({
    title: "44th Indian Antarctic Expedition — Mission Report 2024–25",
    type: "expedition-report", year: 2024,
    authors: ["NCPOR Expedition Division"],
    region: "Antarctica", domain: "Earth Observation",
    expedition: "44th Indian Antarctic Expedition",
    abstract:
      "The official mission report of the 44th Indian Antarctic Expedition covering logistics, station operations at Bharati and Maitri, and the scientific programme across oceanography, glaciology, atmospheric science and biology. The expedition continued long-term observing commitments and completed the annual resupply traverse.",
    keywords: ["44th expedition", "mission report", "Bharati", "Maitri", "logistics"],
    keyPoints: [
      "101-member team across Bharati and Maitri stations.",
      "42 science projects executed across six disciplines.",
      "Annual fuel and cargo traverse completed on schedule.",
    ],
    fileSize: "18.2 MB",
  }),
  mk({
    title: "43rd Indian Antarctic Expedition — Mission Report 2023–24",
    type: "expedition-report", year: 2023,
    authors: ["NCPOR Expedition Division"],
    region: "Antarctica", domain: "Earth Observation",
    expedition: "43rd Indian Antarctic Expedition",
    abstract:
      "Mission report of the 43rd expedition documenting the austral summer programme, icebreaker logistics aboard the chartered research vessel, and the wintering handover. Highlights include the commissioning of upgraded AWS instrumentation and the Prydz Bay multidisciplinary ocean survey.",
    keywords: ["43rd expedition", "mission report", "Prydz Bay", "wintering"],
    keyPoints: [
      "Multidisciplinary Prydz Bay survey completed across 47 stations.",
      "Fourteen wintering members handed over station operations.",
      "AWS network upgraded with next-generation telemetry.",
    ],
    fileSize: "16.8 MB",
  }),
  mk({
    title: "42nd Indian Antarctic Expedition — Mission Report 2022–23",
    type: "expedition-report", year: 2022,
    authors: ["NCPOR Expedition Division"],
    region: "Antarctica", domain: "Earth Observation",
    expedition: "42nd Indian Antarctic Expedition",
    abstract:
      "Report of the 42nd expedition, covering post-pandemic resumption of full scientific operations, reconstruction of the Maitri fuel pipeline, and the Larsemann Hills geological sampling campaign that supported the Bharati-area geochronology programme.",
    keywords: ["42nd expedition", "mission report", "Maitri", "geological sampling"],
    keyPoints: [
      "Full science programme resumed after two constrained seasons.",
      "Maitri fuel-line replacement completed ahead of winter.",
      "182 geological samples shipped for laboratory analysis.",
    ],
    fileSize: "15.1 MB",
  }),
  mk({
    title: "41st Indian Antarctic Expedition — Mission Report 2021–22",
    type: "expedition-report", year: 2021,
    authors: ["NCPOR Expedition Division"],
    region: "Antarctica", domain: "Earth Observation",
    expedition: "41st Indian Antarctic Expedition",
    abstract:
      "The 41st expedition operated under COVID-19 protocols with a reduced footprint. Despite constraints, the team sustained automatic observations, conducted essential maintenance at both stations, and delivered the ice-shelf radar survey underpinning later altimetry validation studies.",
    keywords: ["41st expedition", "mission report", "COVID-19 operations", "radar survey"],
    keyPoints: [
      "Bubble-era safety protocols enabled zero-incident operations.",
      "Ice-shelf radar lines re-surveyed for altimetry validation.",
      "Automatic observatories maintained 99.2% data availability.",
    ],
    fileSize: "12.4 MB",
  }),
  mk({
    title: "40th Indian Antarctic Expedition — Mission Report 2019–20",
    type: "expedition-report", year: 2019,
    authors: ["NCPOR Expedition Division"],
    region: "Antarctica", domain: "Earth Observation",
    expedition: "40th Indian Antarctic Expedition",
    abstract:
      "Report of the milestone 40th expedition, marking four decades of Indian Antarctic research. The season featured an expanded education and outreach component, the installation of a new atmospheric chemistry laboratory at Maitri, and the krill acoustics pilot survey.",
    keywords: ["40th expedition", "milestone", "outreach", "atmospheric chemistry"],
    keyPoints: [
      "40 years of Indian Antarctic research commemorated at both stations.",
      "New atmospheric chemistry laboratory commissioned at Maitri.",
      "Pilot krill acoustic survey established the Prydz Bay time series.",
    ],
    fileSize: "14.7 MB",
  }),

  // ---------------- DATASETS ----------------
  mk({
    title: "Maitri Automatic Weather Station 10-Minute Meteorological Record, 2015–2023",
    type: "dataset", year: 2023,
    authors: ["NCPOR Atmospheric Sciences Division"],
    region: "Antarctica", domain: "Meteorology",
    abstract:
      "Quality-controlled ten-minute records of air temperature, relative humidity, wind speed and direction, and surface pressure from the Maitri automatic weather station in the Schirmacher Oasis. Nine complete years of data with documented calibration and gap-flagging provenance.",
    keywords: ["AWS", "meteorological record", "Maitri", "time series", "Schirmacher Oasis"],
    keyPoints: [
      "9 years of 10-minute resolution observations (≈ 473K records).",
      "Quality flags for icing events and sensor drift included.",
      "Formats: CSV plus ISO-19115 metadata and station log.",
    ],
    fileSize: "148 MB",
  }),
  mk({
    title: "Amery Ice Shelf–Prydz Bay Oceanographic Mooring CTD and Current Profiles",
    type: "dataset", year: 2022,
    authors: ["NCPOR Ocean Sciences Division"],
    region: "Southern Ocean", domain: "Oceanography",
    abstract:
      "Two-year moored observations at the Amery Ice Shelf front comprising CTD profiles, current velocities from acoustic Doppler instruments, and near-bottom temperature records resolving warm-water intrusions onto the shelf. Data processed to level-2 with uncertainty estimates.",
    keywords: ["mooring", "CTD", "Amery Ice Shelf", "circulation", "warm water intrusion"],
    keyPoints: [
      "24-month continuous record at the ice-shelf front.",
      "Resolves seasonal warm-water intrusions beneath the front.",
      "ADCP, microcat and CTD channels with full calibration history.",
    ],
    fileSize: "620 MB",
  }),
  mk({
    title: "Himadri Aerosol Optical Depth and Black Carbon Dataset, 2018–2023",
    type: "dataset", year: 2024,
    authors: ["NCPOR Atmospheric Sciences Division"],
    region: "Arctic", domain: "Atmospheric Science",
    abstract:
      "Six years of sun-photometer aerosol optical depth and aethalometer black-carbon measurements from the Himadri observatory in Ny-Ålesund, Svalbard. The dataset characterizes Arctic haze seasons, biomass-burning intrusions and the clean summertime background.",
    keywords: ["aerosol optical depth", "black carbon", "Himadri", "Ny-Alesund", "Arctic haze"],
    keyPoints: [
      "Daily AOD at 6 wavelengths with Level-2 cloud screening.",
      "Black carbon at 5-minute resolution across six observing seasons.",
      "Supports satellite validation and model intercomparison studies.",
    ],
    fileSize: "86 MB",
  }),
  mk({
    title: "Antarctic Ice Velocity Mosaic from Feature-Tracked Sentinel-1 Imagery",
    type: "dataset", year: 2024,
    authors: ["NCPOR Geosciences Division"],
    region: "Antarctica", domain: "Earth Observation",
    abstract:
      "A 100 m resolution ice-velocity mosaic for the Indian Antarctic sector derived from feature tracking of Sentinel-1 SAR scenes. Products include annual velocity fields, uncertainty maps and outlet-glacier flux estimates for major drainage basins around Prydz Bay.",
    keywords: ["ice velocity", "Sentinel-1", "feature tracking", "SAR", "flux gates"],
    keyPoints: [
      "100 m posting, annual mosaics 2018–2023.",
      "Flux-gate estimates for 14 outlet glaciers in the sector.",
      "Cloud-optimized GeoTIFF with STAC metadata.",
    ],
    fileSize: "2.1 GB",
  }),

  // ---------------- MEDIA / EDUCATION / ACTIVITY ----------------
  mk({
    title: "Aurora Australis over Bharati Station — Winter Photography Collection",
    type: "photo", year: 2022,
    authors: ["Wintering Photography Team"],
    region: "Antarctica", domain: "Polar Ecology",
    abstract:
      "A curated collection of long-exposure photographs of aurora australis displays above Bharati station during the 2022 polar night, accompanied by all-sky camera metadata and observer notes on display morphology.",
    keywords: ["aurora australis", "Bharati", "photography", "polar night"],
    keyPoints: [
      "34 selected frames with EXIF and all-sky camera cross-references.",
      "Captured during the 2022 auroral maximum activity window.",
      "Suitable for outreach, exhibits and educational media.",
    ],
    mediaId: "m-001",
  }),
  mk({
    title: "Crossing the Polar Front: Expedition Video Log",
    type: "video", year: 2023,
    authors: ["NCPOR Outreach Cell"],
    region: "Southern Ocean", domain: "Oceanography",
    expedition: "43rd Indian Antarctic Expedition",
    abstract:
      "A documentary-style video log following the 43rd expedition's transit across the Southern Ocean, featuring interviews with oceanographers on the polar front's role in global climate and footage of instrument deployment operations.",
    keywords: ["video", "polar front", "Southern Ocean", "expedition log"],
    keyPoints: [
      "12-minute feature with scientist interviews and deck operations.",
      "Explains polar-front dynamics for general audiences.",
      "Approved for public dissemination and classroom use.",
    ],
    mediaId: "m-016",
  }),
  mk({
    title: "Why the Polar Regions Matter: A Structured Learning Module",
    type: "education", year: 2025,
    authors: ["DHRUV GYAN Education Cell"],
    region: "Antarctica", domain: "Education & Outreach",
    abstract:
      "A progressive six-lesson module explaining how the polar regions regulate Earth's climate, oceans and biodiversity, and how Indian research contributes to global understanding. Includes interactive checkpoints and a companion quiz for classrooms.",
    keywords: ["education", "climate", "poles", "learning module", "quiz"],
    keyPoints: [
      "Six progressive lessons with checkpoint questions.",
      "Mapped to NCERT Class 8–10 science competencies.",
      "Companion quiz engine supports classroom assessment.",
    ],
    moduleId: "mod-poles",
  }),
  mk({
    title: "National Polar Science Day 2024: Public Outreach and School Programmes",
    type: "activity", year: 2024,
    authors: ["NCPOR Outreach Cell"],
    region: "Antarctica", domain: "Education & Outreach",
    abstract:
      "Documentation of NCPOR's National Polar Science Day (commemorating the first Indian Antarctic expedition's arrival on 9 January 1982) outreach programmes, including school quizzes, mobile exhibitions and the live student interaction session with Bharati station.",
    keywords: ["outreach", "National Polar Science Day", "schools", "quiz", "exhibition"],
    keyPoints: [
      "Reach of 42,000+ students across 6 states.",
      "Live ham-radio session connecting classrooms to Bharati.",
      "Travelling exhibition installed at 11 science centres.",
    ],
  }),
];

export function getResource(id: string): Resource | undefined {
  return resources.find((r) => r.id === id);
}
