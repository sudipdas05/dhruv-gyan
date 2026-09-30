
import type { QuizQuestion } from "@/lib/types";

let seq = 0;
function q(topic: string, question: string, options: string[], answerIndex: number, explanation: string): QuizQuestion {
  seq += 1;
  return { id: `q-${String(seq).padStart(3, "0")}`, topic, question, options, answerIndex, explanation };
}

export const quizTopics = [
  { id: "antarctica", label: "Antarctica", color: "from-sky-500 to-indigo-700" },
  { id: "arctic", label: "Arctic", color: "from-cyan-500 to-blue-700" },
  { id: "climate", label: "Climate Science", color: "from-teal-500 to-cyan-800" },
  { id: "india", label: "Indian Polar Research", color: "from-blue-500 to-indigo-900" },
];

export const quizQuestions: QuizQuestion[] = [
  // ---- Antarctica (8) ----
  q("antarctica", "Approximately what fraction of the world's fresh water is locked in Antarctica?", ["About 20%", "About 50%", "About 70%", "About 95%"], 2, "Antarctica holds roughly 70% of Earth's fresh water, mostly as ice."),
  q("antarctica", "What is the lowest temperature ever recorded on Earth, at Vostok Station?", ["−58.3 °C", "−73.1 °C", "−89.2 °C", "−101.5 °C"], 2, "Vostok recorded −89.2 °C in 1983 — the coldest directly measured temperature on Earth."),
  q("antarctica", "Which organism sits at the centre of the Antarctic marine food web?", ["Antarctic krill", "Leopard seal", "Albatross", "Squid"], 0, "Krill convert algae into food for penguins, seals and whales — the keystone of the ecosystem."),
  q("antarctica", "Why does the Sun not set at Bharati station for part of the year?", ["Refraction off the ice sheet", "Earth's axial tilt during summer", "Reflection from the Moon", "Solar magnetic storms"], 1, "Earth's 23.5° tilt keeps Antarctica tilted toward the Sun for months around December."),
  q("antarctica", "The Schirmacher Oasis, home to Maitri station, is unusual because it is:", ["An ice-free rocky oasis", "A frozen lake", "A volcanic crater", "A floating ice shelf"], 0, "The Oasis is one of the few ice-free areas of Antarctica, exposing bare rock and lichens."),
  q("antarctica", "Emperor penguin colonies are counted from space using:", ["Thermal cameras", "Guano stains visible in satellite images", "GPS tags on chicks", "Acoustic sensors"], 1, "Colonies leave reddish-brown guano stains on the ice that are visible in high-resolution imagery."),
  q("antarctica", "Katabatic winds in Antarctica are caused by:", ["Tropical cyclones moving south", "Cold dense air flowing downhill off the plateau", "Earthquake activity", "Ocean tides"], 1, "Cold, dense air slides down the plateau under gravity, reaching hurricane force at the coast."),
  q("antarctica", "If the entire Antarctic ice sheet melted, global sea level would rise by roughly:", ["2 metres", "7 metres", "30 metres", "58 metres"], 3, "Complete melting would add about 58 m to sea level — which is why even small losses matter."),
  // ---- Arctic (7) ----
  q("arctic", "Geographically, the Arctic region is best described as:", ["A frozen continent", "An ocean surrounded by continents", "A giant glacier", "A mountain plateau"], 1, "The Arctic is the Arctic Ocean covered by sea ice, ringed by the land of eight nations."),
  q("arctic", "India's Arctic research station Himadri is located in:", ["Alaska", "Greenland", "Ny-Alesund, Svalbard (Norway)", "Iceland"], 2, "Himadri opened in 2008 in the international research town of Ny-Alesund."),
  q("arctic", "Melting Arctic sea ice does not directly raise sea level because:", ["The ice is too thin", "Sea ice already displaces its own mass in the water", "The water evaporates", "Ocean currents absorb it"], 1, "Floating ice displaces its weight in water (Archimedes' principle); land ice is what raises sea level."),
  q("arctic", "'Arctic amplification' refers to:", ["Loud ice-breaking operations", "The Arctic warming faster than the global average", "Stronger polar winds", "Increased aurora activity"], 1, "Feedbacks like the ice-albedo loop make the Arctic warm roughly four times faster than the globe."),
  q("arctic", "The ice-albedo feedback happens because:", ["Ice is darker than water", "Open water absorbs more sunlight than reflective ice", "Ice releases heat when it melts", "Salt lowers the freezing point"], 1, "Bright ice reflects sunlight; dark ocean absorbs it, warming the region and melting more ice."),
  q("arctic", "The largest land-ice reservoir in the Arctic region is:", ["Svalbard glaciers", "The Greenland ice sheet", "The Canadian ice cap", "Franz Josef Land"], 1, "Greenland's ice sheet holds enough water to raise sea level by about 7 metres."),
  q("arctic", "Kongsfjorden, near Himadri, is studied because it:", ["Is the deepest fjord on Earth", "Serves as a natural laboratory for glacier-ocean interactions", "Has no ice at all", "Contains oil reserves"], 1, "The fjord hosts glaciers, ocean moorings and a unique land-ocean continuum ideal for study."),
  // ---- Climate (8) ----
  q("climate", "What drives the global wind and ocean circulation system?", ["Earthquakes", "The temperature difference between equator and poles", "The Moon's gravity alone", "Underwater volcanoes"], 1, "Heat imbalance between equator and poles powers winds and currents that redistribute heat."),
  q("climate", "The 'biological pump' refers to:", ["Ships transporting fish", "Plankton sinking carbon to the deep ocean", "Pumps that circulate seawater", "Whales migrating north"], 1, "Plankton absorb CO2; when they sink, carbon is transported to the deep ocean for centuries."),
  q("climate", "Which ocean absorbs the largest share of human-emitted excess heat?", ["Indian Ocean", "Atlantic Ocean", "Southern Ocean", "Arctic Ocean"], 2, "The Southern Ocean around Antarctica takes up most of the excess heat and much of the CO2."),
  q("climate", "Sea level rises today because of:", ["Only melting glaciers", "Only expanding warm water", "Both melting land ice and thermal expansion", "Sinking coastlines only"], 2, "About half of current rise comes from warming (expansion) and half from added land-ice meltwater."),
  q("climate", "The Antarctic ozone hole forms in which season?", ["Austral spring (Sep–Nov)", "Austral autumn", "Antarctic winter only", "It is constant year-round"], 0, "Cold winter stratospheric clouds catalyse ozone destruction when sunlight returns in spring."),
  q("climate", "The Montreal Protocol is significant because it:", ["Banned fishing in Antarctica", "Phased out ozone-depleting CFCs", "Created the Arctic Council", "Limited greenhouse gas emissions"], 1, "It is widely regarded as the most successful international environmental agreement ever."),
  q("climate", "A 'teleconnection' in climate science means:", ["Undersea cables", "A linked climate relationship between distant regions", "Satellite phone calls", "Weather forecasts"], 1, "For example, Antarctic sea-ice variability can influence Indian monsoon rainfall thousands of km away."),
  q("climate", "Ice cores from Antarctica let scientists read:", ["Only temperature", "Past atmospheres up to 800,000 years old", "Ocean depth", "Earthquake history"], 1, "Trapped air bubbles in ice are direct samples of ancient atmospheres — a climate time machine."),
  // ---- Indian Polar Research (7) ----
  q("india", "India's first Antarctic expedition sailed in:", ["1962", "1971", "1981", "1991"], 2, "The 21-member team departed in December 1981 aboard the M/V Trishna."),
  q("india", "India's first Antarctic station, commissioned in 1984, was named:", ["Maitri", "Bharati", "Dakshin Gangotri", "Himadri"], 2, "Dakshin Gangotri — 'Ganga of the South' — was later decommissioned as it was snow-buried."),
  q("india", "Maitri station is located in the:", ["Larsemann Hills", "Schirmacher Oasis", "Transantarctic Mountains", "Ellsworth Land"], 1, "Maitri stands in the ice-free Schirmacher Oasis of Queen Maud Land."),
  q("india", "Bharati station, commissioned in 2012, is located in the:", ["Schirmacher Oasis", "Larsemann Hills", "Vestfold Hills", "Thala Hills"], 1, "Bharati is in the Larsemann Hills of Prydz Bay, East Antarctica."),
  q("india", "National Polar Science Day is celebrated on 9 January to mark:", ["The founding of NCPOR", "The arrival of the first Indian team in Antarctica (1982)", "The commissioning of Bharati", "The signing of the Antarctic Treaty"], 1, "It commemorates the first Indian expedition's arrival on the Antarctic continent."),
  q("india", "Which Indian institution coordinates the national polar programme?", ["ISRO", "NCPOR", "CSIR", "IIT Delhi"], 1, "The National Centre for Polar and Ocean Research (NCPOR), Goa, under the Ministry of Earth Sciences."),
  q("india", "As of the 2024–25 season, India has conducted how many Antarctic expeditions?", ["22", "33", "44", "55"], 2, "The 44th Indian Antarctic Expedition operated in the 2024–25 austral summer."),
];

export function getQuestions(topic: string): QuizQuestion[] {
  return quizQuestions.filter((x) => x.topic === topic);
}
