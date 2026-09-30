
import type { EducationModule, Lesson } from "@/lib/types";

function lesson(id: string, title: string, concepts: string[], sections: Lesson["sections"]): Lesson {
  return { id, title, concepts, sections };
}

export const educationModules: EducationModule[] = [
  {
    id: "mod-antarctica",
    topic: "Antarctica",
    title: "Antarctica 101",
    audience: "School Students",
    level: "Beginner",
    color: "from-sky-500 to-indigo-700",
    description: "The frozen continent: geography, climate, wildlife and why it matters to every person on Earth.",
    lessons: [
      lesson("les-a1", "The White Continent", ["continent", "ice sheet", "scale"],
        [
          { heading: "A continent like no other", body: "Antarctica is the fifth-largest continent, nearly twice the size of Australia, yet it holds about 90% of the world's ice and 70% of its fresh water. It is the coldest, driest and windiest continent — a polar desert where the interior receives less precipitation than the Sahara." },
          { heading: "Ice that shapes the planet", body: "The Antarctic ice sheet averages around 2 km in thickness and reaches more than 4.7 km at its deepest. If it melted completely, global sea level would rise by roughly 58 metres — which is why scientists watch it so closely." },
        ]),
      lesson("les-a2", "Climate and Seasons", ["polar night", "midnight sun", "katabatic winds"],
        [
          { heading: "Six months of light, six of dark", body: "Because Earth's axis is tilted, Antarctica experiences one long day and one long night each year. At Bharati station, the sun does not rise at all in mid-winter and never sets in mid-summer — rhythms that shape every aspect of station life." },
          { heading: "The wind that falls downhill", body: "Cold, dense air slides off the high plateau toward the coast as katabatic wind, often exceeding 200 km/h in gusts. Stations are engineered around these winds, and expedition teams plan fieldwork around them." },
        ]),
      lesson("les-a3", "Life on the Ice", ["adaptation", "food web", "penguins"],
        [
          { heading: "Survivors of the extreme", body: "Life clusters at the edges: emperor and Adélie penguins, seals, whales and seabirds depend on the sea, not the land. On land, only small plants like lichens and mosses survive, hiding in sheltered oases like the Schirmacher Oasis where Maitri stands." },
          { heading: "Krill: the keystone", body: "Antarctic krill — small shrimp-like crustaceans — link microscopic algae to the largest animals on Earth. A single blue whale can consume several tonnes of krill a day during the feeding season." },
        ]),
    ],
  },
  {
    id: "mod-arctic",
    topic: "Arctic",
    title: "The Arctic: Ocean at the Top of the World",
    audience: "School Students",
    level: "Beginner",
    color: "from-cyan-500 to-blue-700",
    description: "An ocean surrounded by continents — the Arctic, its sea ice, and why it warms faster than anywhere else.",
    lessons: [
      lesson("les-r1", "An Ocean, Not a Continent", ["sea ice", "North Pole", "Arctic Ocean"],
        [
          { heading: "A frozen ocean", body: "Unlike Antarctica, the Arctic is an ocean covered by floating sea ice, ringed by the land of eight countries. India's Himadri station sits in the international research town of Ny-Alesund in the Norwegian archipelago of Svalbard." },
          { heading: "Sea ice versus ice sheets", body: "Sea ice forms from frozen ocean water, is a few metres thick and floats — melting it does not raise sea level. Land ice, like Greenland's, sits on rock and does. Confusing the two is one of the most common climate mistakes." },
        ]),
      lesson("les-r2", "Arctic Amplification", ["albedo", "feedback", "warming"],
        [
          { heading: "The albedo feedback", body: "Bright ice reflects most sunlight back to space. As the Arctic warms, ice turns to dark ocean water that absorbs heat, which melts more ice — a self-reinforcing loop called Arctic amplification. The Arctic is warming nearly four times faster than the global average." },
          { heading: "Consequences far away", body: "A warmer Arctic changes jet-stream patterns, with consequences for monsoons, heatwaves and rainfall far to the south — including in India." },
        ]),
      lesson("les-r3", "India in the Arctic", ["Himadri", "research station", "Ny-Alesund"],
        [
          { heading: "Himadri: a window on the north", body: "Since 2008, Indian scientists at Himadri have measured aerosols, glaciers and sea ice alongside 11 other countries in Ny-Alesund. The station anchors India's contribution to coordinated international Arctic observation." },
        ]),
    ],
  },
  {
    id: "mod-poles",
    topic: "Climate Change",
    title: "Why the Polar Regions Matter",
    audience: "General Public",
    level: "Beginner",
    color: "from-teal-500 to-cyan-800",
    description: "How the poles regulate Earth's climate, oceans and biodiversity — and how Indian research contributes.",
    lessons: [
      lesson("les-c1", "The Global Thermostat", ["heat transport", "ocean circulation", "climate regulation"],
        [
          { heading: "Poles as the planet's radiator", body: "The polar regions are where Earth sheds heat to space. The temperature difference between the hot equator and the cold poles drives winds and ocean currents that distribute heat worldwide — the engine of Earth's climate system." },
        ]),
      lesson("les-c2", "Ice, Ocean and Sea Level", ["ice sheets", "sea-level rise", "thermal expansion"],
        [
          { heading: "Two kinds of ice, two kinds of risk", body: "Floating sea ice melt does not raise sea level, but it accelerates warming through the albedo feedback. Land ice — Antarctic and Greenland — does raise sea level when it melts. Half of today's measured sea-level rise comes from thermal expansion of warming water." },
          { heading: "What Indian scientists measure", body: "NCPOR teams track ice-sheet mass balance with satellites, moorings and field surveys, contributing the Indian-sector data that global assessments rely on." },
        ]),
      lesson("les-c3", "Biodiversity and the Food Web", ["food web", "krill", "indicator species"],
        [
          { heading: "A web anchored in ice", body: "Sea ice shelters the algae that feed krill, which feed penguins, seals and whales. When ice timing shifts, the whole web feels it — which is why penguin colonies are such sensitive indicators of change." },
        ]),
      lesson("les-c4", "India's Polar Research", ["NCPOR", "expeditions", "global assessments"],
        [
          { heading: "From Goa to the poles", body: "From the National Centre for Polar and Ocean Research in Goa, India has mounted 44 Antarctic expeditions since 1981, alongside Arctic and Himalayan programmes. Indian data flow into the IPCC assessments that guide global climate policy." },
        ]),
    ],
  },
  {
    id: "mod-glaciers",
    topic: "Glaciers",
    title: "Glaciers: Frozen Rivers of Ice",
    audience: "School Students",
    level: "Intermediate",
    color: "from-blue-500 to-indigo-900",
    description: "How glaciers form, move, and why their retreat matters for water security from the Himalaya to Antarctica.",
    lessons: [
      lesson("les-g1", "Birth of a Glacier", ["firn", "accumulation", "ablation"],
        [
          { heading: "From snow to ice", body: "Years of snowfall compress into dense ice — when more snow accumulates each year than melts, a glacier is born. Gravity then sets it flowing, slowly at first, then faster where the bed is steep and wet." },
        ]),
      lesson("les-g2", "Glaciers on the Move", ["mass balance", "surge", "ice velocity"],
        [
          { heading: "Measuring the pulse", body: "Glaciologists measure mass balance — gains minus losses — and track velocity with GPS and satellite feature tracking. Some Karakoram glaciers periodically 'surge', moving up to 100 times faster for a year or two." },
        ]),
      lesson("les-g3", "Himalayan Water Towers", ["water security", "third pole", "Himansh"],
        [
          { heading: "The third pole", body: "The Hindu Kush Himalaya is the world's largest store of ice outside the poles — the 'third pole' — feeding ten major river systems. NCPOR's Himansh observatory in the Chandra basin tracks how this frozen reservoir is changing." },
        ]),
    ],
  },
  {
    id: "mod-oceans",
    topic: "Polar Oceans",
    title: "Polar Oceans: Engines of the Blue Planet",
    audience: "College Students",
    level: "Intermediate",
    color: "from-slate-600 to-sky-900",
    description: "Circulation, carbon and the biology of the Southern Ocean — the least-known ocean on Earth.",
    lessons: [
      lesson("les-o1", "The Global Conveyor", ["thermohaline circulation", "Antarctic Bottom Water", "ocean currents"],
        [
          { heading: "Sinking at the edge of the ice", body: "As sea ice forms, it leaves behind cold, salty, dense water that sinks to the ocean floor and creeps northward as Antarctic Bottom Water — the deepest limb of the global conveyor that takes a thousand years to complete a circuit." },
        ]),
      lesson("les-o2", "Carbon Sink of the South", ["carbon uptake", "pCO2", "biological pump"],
        [
          { heading: "The ocean that breathes", body: "The Southern Ocean absorbs roughly a quarter of humanity's carbon emissions and most of the excess heat. Tiny drifting algae lock carbon into bodies that sink when they die — the biological pump NCPOR's Prydz Bay cruises help quantify." },
        ]),
      lesson("les-o3", "Life in the Cold", ["adaptation", "antifreeze proteins", "ecosystem"],
        [
          { heading: "Built for the freeze", body: "Polar fish produce antifreeze proteins in their blood. Slow metabolisms, fat insulation and seasonal timing let seals, penguins and whales exploit one of the richest — and fastest-changing — ecosystems on the planet." },
        ]),
    ],
  },
  {
    id: "mod-wildlife",
    topic: "Polar Wildlife",
    title: "Wildlife of the Ends of the Earth",
    audience: "School Students",
    level: "Beginner",
    color: "from-indigo-500 to-slate-800",
    description: "Penguins, seals, krill and the predators of two poles — and how scientists count them from space.",
    lessons: [
      lesson("les-w1", "Penguins of Antarctica", ["emperor penguin", "Adélie", "colony census"],
        [
          { heading: "Counting from orbit", body: "Emperor penguins breed on sea ice, so colonies are mapped by satellites detecting the reddish-brown guano stains they leave on the ice. Indian teams validate these counts with ground and drone surveys near Bharati." },
        ]),
      lesson("les-w2", "Seals and Whales", ["Weddell seal", "krill", "predators"],
        [
          { heading: "Giants of the Southern Ocean", body: "Weddell seals dive to 600 m under the ice; humpbacks migrate thousands of kilometres to feast on krill. Both are studied with satellite tags and acoustic listening devices." },
        ]),
      lesson("les-w3", "Arctic Wildlife", ["polar bear", "reindeer", "migration"],
        [
          { heading: "A different cast", body: "The Arctic hosts land predators like the polar bear and Arctic fox, plus massive migrations of caribou and birds. Himadri researchers track how changing snow and ice alter these rhythms." },
        ]),
    ],
  },
  {
    id: "mod-atmosphere",
    topic: "Atmospheric Science",
    title: "Air Above the Ice",
    audience: "College Students",
    level: "Advanced",
    color: "from-cyan-600 to-indigo-800",
    description: "Aerosols, ozone and the cleanest air on Earth — what polar atmospheres teach us about the planet's lungs.",
    lessons: [
      lesson("les-t1", "The Cleanest Air Baseline", ["aerosols", "baseline", "Maitri"],
        [
          { heading: "A reference for a polluted world", body: "Antarctic air is the cleanest on Earth — which makes it the perfect baseline for detecting human influence. Maitri's instruments have shown that even here, soot from southern-hemisphere wildfires arrives on the wind." },
        ]),
      lesson("les-t2", "The Ozone Story", ["ozone hole", "CFCs", "recovery"],
        [
          { heading: "A rare environmental success", body: "The Antarctic ozone hole, discovered in 1985, led to the Montreal Protocol that banned CFCs. Polar stations monitor its slow recovery each austral spring — proof that global environmental agreements can work." },
        ]),
      lesson("les-t3", "Auroras: Light from the Sun", ["aurora australis", "solar wind", "magnetosphere"],
        [
          { heading: "The sky above Bharati", body: "Charged particles from the sun spiral along Earth's magnetic field into the polar skies, lighting them in green and violet. Wintering teams at Bharati and Maitri photograph and instrument these displays for space-weather research." },
        ]),
    ],
  },
  {
    id: "mod-missions",
    topic: "Indian Polar Missions",
    title: "India's Polar Journey",
    audience: "Teachers / Public",
    level: "All Levels",
    color: "from-sky-600 to-blue-800",
    description: "From the first voyage in 1981 to today's three stations and 44 expeditions — the story of Indian polar science.",
    lessons: [
      lesson("les-i1", "The First Voyage", ["1981", "M/V Trishna", "Dakshin Gangotri"],
        [
          { heading: "A nation reaches the ice", body: "On 9 January 1982, the first Indian team reached Antarctica aboard the M/V Trishna. Within two years, Dakshin Gangotri — 'Ganga of the South' — rose on the ice, making India the first Asian country... one of the earliest Asian nations to build an Antarctic station." },
        ]),
      lesson("les-i2", "Stations of India", ["Maitri", "Bharati", "Himadri"],
        [
          { heading: "Three stations, two poles", body: "Maitri (1989) in the Schirmacher Oasis, Bharati (2012) in the Larsemann Hills, and Himadri (2008) in the Arctic make India one of the few nations with research infrastructure at both ends of the Earth — plus Himalayan cryosphere programmes in between." },
        ]),
      lesson("les-i3", "How an Expedition Works", ["logistics", "traverse", "wintering"],
        [
          { heading: "The machine behind the science", body: "Each expedition is a small town on the move: icebreaker voyage, helicopter operations, fuel traverses, medical teams and satellite communications. Up to 100 members support dozens of science projects through a single austral summer." },
        ]),
    ],
  },
];

export function getModule(id: string): EducationModule | undefined {
  return educationModules.find((m) => m.id === id);
}

export const AUDIENCES = ["School Students", "College Students", "Teachers", "Researchers", "General Public"];
