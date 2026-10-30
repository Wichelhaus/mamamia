const TRIP = {
  start: '2026-12-17',
  end: '2027-01-04',
  center: [-22.9068, -43.1729],
  radiusKm: 300,
};

const REGIONS = {
  rio: { label: 'Rio', sub: 'Die Stadt', color: '#e6337a' },
  norden: { label: 'Norden', sub: 'Berge & Seenregion', color: '#1aa6c4' },
  sueden: { label: 'Süden', sub: 'Costa Verde', color: '#ff9f1c' },
  westen: { label: 'Westen', sub: 'Serra da Mantiqueira', color: '#5f8a3a' },
};

const CATEGORIES = {
  strand: '🏖️ Strand',
  natur: '🌿 Natur & Wandern',
  kultur: '🏛️ Kultur',
  aussicht: '🌄 Aussicht',
};

const PLACES = [
  {
    id: 'copacabana', name: 'Copacabana', region: 'rio', cats: ['strand'],
    coords: [-22.9711, -43.1822], time: 'in Rio',
    text: '4 km Strand mit der berühmten Wellen-Promenade, Strandkiosken und einer der größten Silvesterpartys der Welt.',
    tip: 'Nur das Nötigste mit an den Strand nehmen – Handy und Wertsachen im Hotel lassen.',
  },
  {
    id: 'cristo', name: 'Cristo Redentor', region: 'rio', cats: ['aussicht', 'kultur'],
    coords: [-22.9519, -43.2105], time: 'in Rio',
    text: 'Die berühmte Christusstatue auf dem Corcovado (710 m) – mit der Zahnradbahn ab Cosme Velho oder per Van hinauf.',
    tip: 'Ganz früh hinfahren und vorher die Wolken checken – mittags ist es voll und oft diesig.',
  },
  {
    id: 'zuckerhut', name: 'Zuckerhut (Pão de Açúcar)', region: 'rio', cats: ['aussicht'],
    coords: [-22.9492, -43.1545], time: 'in Rio',
    text: 'Mit der Seilbahn in zwei Etappen über den Morro da Urca auf den Zuckerhut – Blick über Bucht, Strände und Cristo.',
    tip: 'Zum Sonnenuntergang hochfahren. Sportlich: die erste Etappe auf dem Trilha do Morro da Urca zu Fuß gehen.',
  },
  {
    id: 'ipanema', name: 'Ipanema & Arpoador', region: 'rio', cats: ['strand', 'aussicht'],
    coords: [-22.9890, -43.1925], time: 'in Rio',
    text: 'Der schönste Stadtstrand Rios. Am Arpoador-Felsen applaudieren alle, wenn die Sonne hinter den Dois Irmãos versinkt.',
    tip: 'Posto 9 ist der Szene-Treffpunkt, Richtung Leblon wird es ruhiger.',
  },
  {
    id: 'jardim', name: 'Jardim Botânico & Parque Lage', region: 'rio', cats: ['natur', 'kultur'],
    coords: [-22.9674, -43.2240], time: 'in Rio',
    text: 'Die berühmte Königspalmen-Allee und nebenan der Parque Lage mit Café im Innenhof der Villa – direkt unterhalb des Cristo.',
    tip: 'Passt perfekt an denselben Tag wie der Cristo Redentor.',
  },
  {
    id: 'museu', name: 'Museu do Amanhã & Porto Maravilha', region: 'rio', cats: ['kultur'],
    coords: [-22.8944, -43.1797], time: 'in Rio',
    text: 'Futuristisches Museum von Santiago Calatrava am Hafen, das riesige Kobra-Wandbild am Boulevard Olímpico und die Confeitaria Colombo.',
    tip: 'Öffnungszeiten vorab checken – Museen sind meist montags geschlossen.',
  },
  {
    id: 'centro', name: 'Santa Teresa, Selarón & Lapa', region: 'rio', cats: ['kultur'],
    coords: [-22.9154, -43.1793], time: 'in Rio',
    text: 'Die Escadaria Selarón mit Fliesen aus aller Welt, das Künstlerviertel Santa Teresa mit der alten Straßenbahn und abends Samba in Lapa.',
    tip: 'Abends in Lapa auf belebten Straßen bleiben und per Uber zurückfahren.',
  },
  {
    id: 'tijuca', name: 'Floresta da Tijuca & Pedra Bonita', region: 'rio', cats: ['natur', 'aussicht'],
    coords: [-22.9886, -43.2797], time: 'in Rio',
    text: 'Einer der größten Stadtwälder der Welt. Kurze Wanderung (ca. 30–45 Min.) auf die Pedra Bonita – Startplatz der Gleitschirmflieger mit Blick auf die Pedra da Gávea.',
    tip: 'Ein Tandem-Gleitschirmflug hinunter zum Strand von São Conrado ist ein echtes Highlight.',
  },
  {
    id: 'doisirmaos', name: 'Morro Dois Irmãos', region: 'rio', cats: ['natur', 'aussicht'],
    coords: [-22.9877, -43.2360], time: 'in Rio',
    text: 'Mit dem Mototaxi durch Vidigal zum Startpunkt, dann ca. 1 h bergauf – Panorama über Ipanema, Leblon und die Lagoa.',
    tip: 'Früh morgens gehen, viel Wasser mitnehmen, am besten mit lokalem Guide.',
  },
  {
    id: 'prainha', name: 'Prainha & Grumari', region: 'rio', cats: ['strand', 'natur'],
    coords: [-23.0440, -43.5100], time: 'ca. 1 h',
    text: 'Wilde, grüne Strände im Naturschutzgebiet ganz im Westen der Stadt – ohne Hochhäuser, beliebt bei Surfern.',
    tip: 'Am besten mit Auto oder Uber, Snacks und Wasser mitnehmen.',
  },
  {
    id: 'telegrafo', name: 'Pedra do Telégrafo', region: 'rio', cats: ['aussicht', 'natur'],
    coords: [-23.0668, -43.5670], time: 'ca. 1–1,5 h',
    text: 'Der Foto-Felsen: Durch die Perspektive sieht es aus, als würdest du über dem Abgrund hängen. Ca. 45 Min. Aufstieg ab Barra de Guaratiba.',
    tip: 'Sehr früh starten – später gibt es lange Warteschlangen für das Foto.',
  },
  {
    id: 'niteroi', name: 'Niterói (MAC & Itacoatiara)', region: 'norden', cats: ['kultur', 'strand'],
    coords: [-22.9078, -43.1258], time: 'ca. 30 Min. / 20 Min. Fähre',
    text: 'Das ufoförmige Museum MAC von Oscar Niemeyer mit Blick auf Rio – und der Surfstrand Itacoatiara mit Kletterfelsen.',
    tip: 'Mit der Fähre ab Praça XV übersetzen – günstig und mit tollem Blick auf die Skyline.',
  },
  {
    id: 'petropolis', name: 'Petrópolis', region: 'norden', cats: ['kultur'],
    coords: [-22.5070, -43.1786], time: 'ca. 1–1,5 h',
    text: 'Die Kaiserstadt in den Bergen: Sommerresidenz von Dom Pedro II mit Museu Imperial, Kathedrale, Kristallpalast und dem Haus von Santos Dumont.',
    tip: 'Das Museu Imperial ist montags geschlossen. Abends wird es angenehm kühl.',
  },
  {
    id: 'teresopolis', name: 'Teresópolis & Serra dos Órgãos', region: 'norden', cats: ['natur', 'aussicht'],
    coords: [-22.4520, -42.9850], time: 'ca. 1,5–2 h',
    text: 'Nationalpark mit dem markanten Felsfinger Dedo de Deus, Wasserfällen, Naturbecken und Wanderwegen jeder Länge – bis zur Pedra do Sino (2.275 m).',
    tip: 'Dezember ist Regenzeit: früh losgehen, nachmittags gibt es oft Gewitter.',
  },
  {
    id: 'friburgo', name: 'Nova Friburgo & Lumiar', region: 'norden', cats: ['natur'],
    coords: [-22.2819, -42.5311], time: 'ca. 2,5 h',
    text: 'Von Schweizer Einwanderern gegründete Bergstadt. In den Dörfern Lumiar und São Pedro da Serra warten Flüsse, Wasserfälle und Naturbecken.',
    tip: 'Guter Abstecher, wenn ihr in den Bergen einen Tag länger bleiben wollt.',
  },
  {
    id: 'saquarema', name: 'Saquarema', region: 'norden', cats: ['strand'],
    coords: [-22.9350, -42.4930], time: 'ca. 1,5–2 h',
    text: 'Brasiliens Surf-Hauptstadt: Profi-Wellen am Praia de Itaúna und die weiße Kirche Nossa Senhora de Nazaré auf dem Felsen über dem Meer.',
    tip: 'Schöner Zwischenstopp auf dem Weg zwischen Rio und der Seenregion.',
  },
  {
    id: 'arraial', name: 'Arraial do Cabo', region: 'norden', cats: ['strand', 'natur'],
    coords: [-22.9661, -42.0278], time: 'ca. 2,5–3 h',
    text: 'Die „Karibik Brasiliens“: türkisfarbenes Wasser, Praia do Forno, die Prainhas do Pontal do Atalaia und Bootstouren zur Ilha do Farol und zur Gruta Azul.',
    tip: 'Das Wasser ist hier überraschend kühl (Kaltwasser-Auftrieb) – dafür glasklar zum Schnorcheln und Tauchen.',
  },
  {
    id: 'cabofrio', name: 'Cabo Frio', region: 'norden', cats: ['strand'],
    coords: [-22.8894, -42.0286], time: 'ca. 2,5 h',
    text: 'Langer weißer Praia do Forte, das Fort São Mateus und Sanddünen am Praia do Peró.',
    tip: 'Lässt sich gut mit Arraial do Cabo oder Búzios kombinieren.',
  },
  {
    id: 'buzios', name: 'Búzios', region: 'norden', cats: ['strand', 'kultur'],
    coords: [-22.7469, -41.8817], time: 'ca. 2,5–3 h',
    text: 'Ehemaliges Fischerdorf, das Brigitte Bardot berühmt machte: über 20 Strände, die Rua das Pedras zum Ausgehen und die Uferpromenade Orla Bardot.',
    tip: 'Geribá für Surfer, Ferradura sowie Azeda und Azedinha zum Baden.',
  },
  {
    id: 'angra', name: 'Angra dos Reis', region: 'sueden', cats: ['strand', 'natur'],
    coords: [-23.0067, -44.3181], time: 'ca. 2,5 h',
    text: 'Bucht mit unzähligen Inseln – Startpunkt für Schoner-Touren zu Badebuchten wie der Ilha da Gipóia und für Boote nach Ilha Grande.',
    tip: 'Bootstouren direkt am Hafen buchen und Preise vergleichen.',
  },
  {
    id: 'ilhagrande', name: 'Ilha Grande', region: 'sueden', cats: ['strand', 'natur'],
    coords: [-23.1428, -44.1681], time: 'ca. 2 h + 20 Min. Boot',
    text: 'Autofreie Dschungelinsel mit dem Dorf Abraão, dem Traumstrand Lopes Mendes, der Lagoa Azul zum Schnorcheln und dem Pico do Papagaio.',
    tip: 'Speedboot ab Conceição de Jacareí. Mit leichtem Gepäck reisen – auf der Insel geht alles zu Fuß.',
  },
  {
    id: 'paraty', name: 'Paraty', region: 'sueden', cats: ['kultur', 'strand'],
    coords: [-23.2178, -44.7131], time: 'ca. 4 h',
    text: 'Koloniales UNESCO-Welterbe mit Kopfsteinpflaster, bunten Türen, Schonern zu einsamen Inseln, Wasserfällen und Cachaça-Destillerien.',
    tip: 'Cachoeira do Tobogã: ein glatter Felsen, auf dem man ins Becken rutscht.',
  },
  {
    id: 'trindade', name: 'Trindade', region: 'sueden', cats: ['strand', 'natur'],
    coords: [-23.3480, -44.7240], time: 'ca. 4,5 h',
    text: 'Hippie-Fischerdorf südlich von Paraty mit wilden Stränden und der Piscina Natural do Cachadaço – einem Naturpool zwischen Felsen.',
    tip: 'Bei ruhiger See am schönsten, Badeschuhe helfen auf den Felsen.',
  },
  {
    id: 'ubatuba', name: 'Ubatuba', region: 'sueden', cats: ['strand'],
    coords: [-23.4336, -45.0838], time: 'ca. 5 h',
    text: 'Über 100 Strände an der Küste von São Paulo – zum Beispiel Praia do Félix oder Praia do Prumirim.',
    tip: 'Spitzname „Ubachuva“ – hier regnet es öfter, also flexibel planen.',
  },
  {
    id: 'ilhabela', name: 'Ilhabela', region: 'sueden', cats: ['strand', 'natur'],
    coords: [-23.7781, -45.3581], time: 'ca. 6–7 h inkl. Fähre',
    text: 'Gebirgige Insel mit Regenwald, Wasserfällen und Stränden – erreichbar per Autofähre ab São Sebastião.',
    tip: 'Nur mit zusätzlichen Tagen sinnvoll. Mückenschutz gegen die Borrachudos!',
  },
  {
    id: 'itatiaia', name: 'Nationalpark Itatiaia', region: 'westen', cats: ['natur'],
    coords: [-22.4520, -44.6090], time: 'ca. 2,5 h',
    text: 'Brasiliens ältester Nationalpark: Wasserfälle wie der Véu da Noiva im unteren Teil, oben der Pico das Agulhas Negras (2.791 m).',
    tip: 'Warme Schicht einpacken – oben kann es auch im Sommer kalt werden.',
  },
  {
    id: 'penedo', name: 'Penedo', region: 'westen', cats: ['kultur'],
    coords: [-22.4440, -44.5290], time: 'ca. 2,5 h',
    text: 'Von finnischen Einwanderern gegründetes Bergdorf mit Schokoladenläden, Saunas und der „Kleinen Finnland“ samt Weihnachtsmann-Haus.',
    tip: 'Passt perfekt in die Weihnachtszeit.',
  },
  {
    id: 'maua', name: 'Visconde de Mauá', region: 'westen', cats: ['natur'],
    coords: [-22.3320, -44.5370], time: 'ca. 3,5 h',
    text: 'Ruhige Bergdörfer wie Maromba und Maringá mit Forellen-Restaurants und Wasserfällen wie der Cachoeira do Escorrega mit natürlicher Rutsche.',
    tip: 'Kurvige Bergstraßen – am besten bei Tageslicht fahren.',
  },
];

const PHASES = [
  { id: 'rio1', title: 'Ankommen in Rio', region: 'rio' },
  { id: 'norden', title: 'Norden: Berge & Seenregion', region: 'norden' },
  { id: 'rio2', title: 'Zwischenstopp in Rio', region: 'rio' },
  { id: 'sueden', title: 'Süden: Costa Verde', region: 'sueden' },
  { id: 'abreise', title: 'Abreise', region: 'rio' },
];

const ITINERARY = [
  {
    date: '2026-12-17', phase: 'rio1', title: 'Ankunft in Rio', places: ['copacabana'],
    travel: 'Flughafen GIG → Zona Sul ca. 45–60 Min.', stay: 'Rio (Copacabana/Ipanema)',
    items: ['Transfer zur Unterkunft in Copacabana oder Ipanema', 'Erster Spaziergang auf der Wellen-Promenade', 'Kokoswasser oder Caipirinha am Strandkiosk', 'Früh schlafen gegen den Jetlag'],
  },
  {
    date: '2026-12-18', phase: 'rio1', title: 'Cristo & Sonnenuntergang', places: ['cristo', 'jardim', 'ipanema'],
    stay: 'Rio',
    items: ['Früh morgens zum Cristo Redentor', 'Jardim Botânico und Café im Parque Lage', 'Nachmittags Strand in Ipanema', 'Sonnenuntergang am Arpoador-Felsen'],
  },
  {
    date: '2026-12-19', phase: 'rio1', title: 'Centro, Santa Teresa & Lapa', places: ['museu', 'centro'],
    stay: 'Rio',
    items: ['Museu do Amanhã und Kobra-Wandbild am Boulevard Olímpico', 'Mittagspause in der Confeitaria Colombo', 'Escadaria Selarón und Künstlerviertel Santa Teresa', 'Abends Samba in Lapa'],
  },
  {
    date: '2026-12-20', phase: 'norden', title: 'Kaiserstadt Petrópolis', places: ['petropolis'],
    travel: 'Rio → Petrópolis ca. 1,5 h', stay: 'Petrópolis',
    items: ['Mietwagen übernehmen und hinauf in die Berge', 'Museu Imperial und Kathedrale', 'Kristallpalast und Haus von Santos Dumont', 'Abendessen in der kühlen Bergluft'],
  },
  {
    date: '2026-12-21', phase: 'norden', title: 'Ab nach Teresópolis', places: ['teresopolis'],
    travel: 'Petrópolis → Teresópolis ca. 1 h', stay: 'Teresópolis',
    items: ['Fahrt durch die Serra dos Órgãos', 'Aussichtspunkt Mirante do Soberbo mit Blick auf den Dedo de Deus', 'Kurze Wanderung zu Wasserfällen und Naturbecken im Nationalpark'],
  },
  {
    date: '2026-12-22', phase: 'norden', title: 'Wandertag Serra dos Órgãos', places: ['teresopolis'],
    stay: 'Teresópolis',
    items: ['Früh starten – nachmittags drohen Gewitter', 'Ambitioniert: Richtung Pedra do Sino (lang, gute Kondition nötig)', 'Gemütlich: Rundwege und Badestellen am Parkeingang'],
  },
  {
    date: '2026-12-23', phase: 'norden', title: 'An die Küste nach Búzios', places: ['buzios'],
    travel: 'Teresópolis → Búzios ca. 3,5 h', stay: 'Búzios',
    items: ['Von den Bergen hinunter ans Meer', 'Nachmittags erster Strand: Ferradura', 'Abends Rua das Pedras und Orla Bardot'],
  },
  {
    date: '2026-12-24', phase: 'norden', title: 'Heiligabend in Búzios 🎄', places: ['buzios'],
    stay: 'Búzios',
    items: ['Strand-Hopping: Geribá, Azeda & Azedinha, João Fernandes', 'Optional: Schoner-Tour zu mehreren Buchten', 'Heiligabend-Dinner – unbedingt vorher reservieren!'],
  },
  {
    date: '2026-12-25', phase: 'norden', title: 'Weihnachten in Arraial do Cabo', places: ['arraial'],
    travel: 'Búzios → Arraial do Cabo ca. 1 h', stay: 'Arraial do Cabo',
    items: ['Kurze Fahrt nach Arraial do Cabo', 'Prainhas do Pontal do Atalaia (über Treppen erreichbar)', 'Abends frischer Fisch am Hafen'],
  },
  {
    date: '2026-12-26', phase: 'norden', title: 'Bootstour in der „Karibik Brasiliens“', places: ['arraial', 'cabofrio'],
    stay: 'Arraial do Cabo',
    items: ['Bootstour: Ilha do Farol, Gruta Azul, Praia do Forno', 'Schnorcheln im klaren (kühlen!) Wasser', 'Optional: Dünen und Praia do Forte in Cabo Frio'],
  },
  {
    date: '2026-12-27', phase: 'norden', title: 'Über die Küste zurück nach Rio', places: ['saquarema', 'niteroi'],
    travel: 'Arraial → Rio ca. 3–4 h mit Stopps', stay: 'Rio',
    items: ['Stopp in Saquarema: Kirche auf dem Felsen, Surfer am Praia de Itaúna', 'Stopp in Niterói: Museum MAC mit Blick auf Rio', 'Mietwagen abgeben, entspannter Abend'],
  },
  {
    date: '2026-12-28', phase: 'rio2', title: 'Pedra Bonita & Zuckerhut', places: ['tijuca', 'zuckerhut'],
    stay: 'Rio',
    items: ['Morgens Wanderung auf die Pedra Bonita', 'Optional: Tandem-Gleitschirmflug nach São Conrado', 'Zum Sonnenuntergang auf den Zuckerhut'],
  },
  {
    date: '2026-12-29', phase: 'sueden', title: 'Auf nach Ilha Grande', places: ['ilhagrande'],
    travel: 'Rio → Conceição de Jacareí ca. 2 h + 20 Min. Speedboot', stay: 'Ilha Grande (Abraão)',
    items: ['Mietwagen oder Transfer – das Auto bleibt auf dem Festland', 'Ankommen im autofreien Abraão', 'Erste Badebucht und Sonnenuntergang am Steg'],
  },
  {
    date: '2026-12-30', phase: 'sueden', title: 'Traumstrand Lopes Mendes', places: ['ilhagrande'],
    stay: 'Ilha Grande (Abraão)',
    items: ['Wanderung (ca. 2–3 h) oder Boot + kurzer Fußweg nach Lopes Mendes', 'Alternativ: Bootstour zur Lagoa Azul zum Schnorcheln', 'Abends Fisch am Hafen von Abraão'],
  },
  {
    date: '2026-12-31', phase: 'sueden', title: 'Silvester in Paraty 🎆', places: ['paraty'],
    travel: 'Boot + ca. 1,5–2 h Fahrt', stay: 'Paraty',
    items: ['Vormittags zurück aufs Festland und weiter nach Paraty', 'Bummel durch die Altstadt', 'Weiß anziehen, Feuerwerk am Wasser, über sieben Wellen springen'],
  },
  {
    date: '2027-01-01', phase: 'sueden', title: 'Neujahr in Paraty', places: ['paraty'],
    stay: 'Paraty',
    items: ['Ausschlafen 😴', 'Schoner-Tour zu Inseln und Badebuchten', 'Abends Livemusik in der Altstadt'],
  },
  {
    date: '2027-01-02', phase: 'sueden', title: 'Trindade', places: ['trindade'],
    travel: 'Paraty → Trindade ca. 40 Min.', stay: 'Paraty',
    items: ['Praia do Meio und Praia do Cachadaço', 'Kurze Wanderung zur Piscina Natural do Cachadaço', 'Zurück in Paraty: Cachaça-Probe'],
  },
  {
    date: '2027-01-03', phase: 'sueden', title: 'Wasserfälle & Rückfahrt', places: ['paraty', 'prainha'],
    travel: 'Paraty → Rio ca. 4 h', stay: 'Rio',
    items: ['Vormittags Cachoeira do Tobogã (Felsrutsche)', 'Rückfahrt entlang der Costa Verde', 'Wenn Zeit bleibt: Stopp an Prainha & Grumari'],
  },
  {
    date: '2027-01-04', phase: 'abreise', title: 'Tchau, Rio!', places: ['ipanema'],
    travel: 'Zona Sul → Flughafen GIG ca. 45–60 Min.',
    items: ['Letzter Strandmorgen und ein Açaí', 'Souvenirs: Havaianas, Cachaça, Kaffee', 'Rechtzeitig zum Flughafen – Puffer für Verkehr einplanen'],
  },
];

const ROUTE_LINES = [
  { region: 'norden', stops: ['copacabana', 'petropolis', 'teresopolis', 'buzios', 'arraial', 'saquarema', 'niteroi', 'copacabana'] },
  { region: 'sueden', stops: ['copacabana', 'ilhagrande', 'paraty', 'trindade', 'paraty', 'prainha', 'copacabana'] },
];

const TIPS = [
  { icon: '☀️', title: 'Wetter im Dezember', text: 'Hochsommer: 25–35 °C, schwül, oft kurze heftige Gewitter am Nachmittag. In den Bergen wird es nachts frisch (ca. 15 °C).' },
  { icon: '🎆', title: 'Silvester (Réveillon)', text: 'Weiß tragen bringt Glück. Um Mitternacht über sieben Wellen springen und Blumen für Iemanjá ins Meer werfen.' },
  { icon: '🚗', title: 'Unterwegs', text: 'Für Norden und Süden lohnt ein Mietwagen, in Rio Uber/99 und Metro. Fernbusse fahren ab der Rodoviária Novo Rio. Zwischen den Feiertagen viel Verkehr!' },
  { icon: '🛏️', title: 'Früh buchen', text: 'Weihnachten und Silvester sind Hochsaison – Unterkünfte, Festessen und Bootstouren rechtzeitig reservieren.' },
  { icon: '🔒', title: 'Sicherheit', text: 'Wenig Wertsachen zeigen, das Handy nicht am Straßenrand nutzen und nachts lieber Uber statt zu Fuß.' },
];

const PACKLIST = [
  {
    id: 'todo', title: 'Vor der Abreise erledigen', icon: '✅',
    items: ['Unterkünfte für Weihnachten & Silvester buchen', 'Mietwagen buchen', 'Impfungen mit Hausarzt/Tropenmedizin abklären', 'Auslandskrankenversicherung abschließen', 'Kreditkarte für das Ausland freischalten', 'eSIM oder Datenpaket für Brasilien besorgen', 'Uber und 99 als Apps installieren', 'Offline-Karten von Rio & Umgebung herunterladen', 'Ein paar Sätze Portugiesisch lernen'],
  },
  {
    id: 'dokumente', title: 'Dokumente & Geld', icon: '🛂',
    items: ['Reisepass (am besten noch 6 Monate gültig)', 'Flugtickets / Boardingpässe', 'Nachweis Auslandskrankenversicherung', 'Führerschein + internationaler Führerschein', 'Zwei Kreditkarten (getrennt aufbewahren)', 'Etwas Bargeld in Reais', 'Impfpass', 'Buchungsbestätigungen (Unterkünfte, Mietwagen)', 'Kopien aller Dokumente in der Cloud'],
  },
  {
    id: 'kleidung', title: 'Kleidung', icon: '👕',
    items: ['6–8 leichte T-Shirts / Tops', '2–3 kurze Hosen', '1 leichte lange Hose (Abende, Mücken, Wandern)', 'Sommerkleid oder Leinenhemd', 'Weißes Outfit für Silvester', 'Schickes Outfit für Heiligabend', 'Pullover oder Fleece für die Berge', 'Leichte Regenjacke', 'Unterwäsche & Socken für ca. 10 Tage', 'Schlafsachen', 'Sonnenhut oder Cap', 'Sonnenbrille'],
  },
  {
    id: 'schuhe', title: 'Schuhe', icon: '🩴',
    items: ['Flip-Flops', 'Bequeme Sneaker', 'Leichte Wanderschuhe', 'Wassertaugliche Sandalen für Boote & Felsen'],
  },
  {
    id: 'strand', title: 'Strand & Wasser', icon: '🏖️',
    items: ['2–3 Badesachen', 'Dünnes, schnell trocknendes Strandtuch', 'Schnorchel & Maske', 'Wasserdichter Packsack für Bootstouren', 'Wasserdichte Handyhülle', 'UV-Shirt gegen Sonnenbrand beim Schnorcheln'],
  },
  {
    id: 'gesundheit', title: 'Gesundheit & Pflege', icon: '🧴',
    items: ['Sonnencreme LSF 50+', 'After-Sun', 'Mückenschutz mit DEET oder Icaridin', 'Lippenpflege mit LSF', 'Persönliche Medikamente', 'Reiseapotheke: Schmerzmittel, Durchfallmittel, Elektrolyte', 'Pflaster & Blasenpflaster', 'Desinfektionsmittel', 'Kulturbeutel'],
  },
  {
    id: 'technik', title: 'Technik', icon: '🔌',
    items: ['Handy + Ladekabel', 'Reiseadapter (Typ N, oft passt auch Typ C)', 'Powerbank', 'Kopfhörer', 'Kamera oder Action-Cam + Speicherkarten'],
  },
  {
    id: 'kleinkram', title: 'Rucksack & Kleinkram', icon: '🎒',
    items: ['Reiserucksack statt Rollkoffer (Ilha Grande ist autofrei)', 'Tagesrucksack', 'Trinkflasche', 'Unauffällige Bauchtasche', 'Ohrstöpsel & Schlafmaske', 'Kleines Vorhängeschloss', 'Wäschebeutel', 'Kleine Weihnachtsgeschenke 🎁'],
  },
];
