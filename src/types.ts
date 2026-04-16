export interface Insumo {
  producto: string;
  cantidad: number;
  unidad: string;
}

export interface GroupedInsumos {
  [category: string]: {
    items: Insumo[];
    subtotals: { [unit: string]: number };
  };
}

export const CATEGORY_MAPPING: { [key: string]: string[] } = {
  "Perecederos y Verduras": [
    "QUESO MIXTO MANCHEGO,MOZARELA",
    "JITOMATE",
    "TOMATE",
    "CILANTRO",
    "PIÑA",
    "LIMON XXX",
    "PIMIENTO ROJO",
    "PIMIENTO AMARILLO",
    "PIMIENTO VERDE",
    "CHILE CUARESMEÑO",
    "CHILE ANCHO"
  ],
  "Despensa e Ingredientes Secos": [
    "CACAHUATE PELADO",
    "SEMILLA DE GIRASOL",
    "PEPITA PELADA",
    "SAL",
    "KNORR SUIZA",
    "ACHIOTE",
    "CANELA ENTERA",
    "COMINO",
    "ARANDANOS",
    "FLOR DE JAMAICA",
    "AZUCAR",
    "ARROZ"
  ],
  "Lácteos y Líquidos": [
    "ACEITE VEGETAL",
    "LECHERA",
    "LECHE ENTERA",
    "LECHE CLAVEL"
  ],
  "Panificados y Tortillas": [
    "TORTILLINAS",
    "PAN ARABE",
    "TORTILLAS BURRERA",
    "BRIOCHE"
  ],
  "Empaque y Servicio": [
    "CHAROLA CHICA",
    "SERVILLETAS DE 100",
    "EGAPACK 30X1200",
    "SOUFLE DE 4 A",
    "TAPA SOUFLE 4 A",
    "PAPEL GRADO ALIMENTICIO",
    "PALILLOS",
    "BOLSA POLIPAPEL 1 KG"
  ],
  "Limpieza, Higiene y Seguridad": [
    "BOLSA DE BASURA POLIET NEGRA",
    "GUANTES DE LATEX NEGRO",
    "CUBREBOCAS COLOR NEGRO",
    "SANITAS",
    "PAPEL DE BAÑO",
    "TRAPO VERDE DE MICRO FIBRA",
    "TRAPO ROJO DE M ICRO FIBRA",
    "TRAPO AZUL DE MICROFIBRA",
    "JABON DE ROMA",
    "CLORO",
    "GEL ANTIBACTERIAL",
    "FIBRA VERDE",
    "FIBRAS DE METAL",
    "PIEDRA POMEX",
    "DETERGENTE",
    "BOTIQUIN DE PRIMEROS AUXILIOS"
  ]
};

export const INITIAL_DATA: Insumo[] = [
  { producto: "QUESO MIXTO MANCHEGO,MOZARELA", cantidad: 3, unidad: "KG" },
  { producto: "JITOMATE", cantidad: 1, unidad: "KG" },
  { producto: "TOMATE", cantidad: 1.5, unidad: "KG" },
  { producto: "CILANTRO", cantidad: 1, unidad: "KG" },
  { producto: "PIÑA", cantidad: 1, unidad: "PZ" },
  { producto: "LIMON XXX", cantidad: 3, unidad: "KG" },
  { producto: "PIMIENTO ROJO", cantidad: 0.5, unidad: "KG" },
  { producto: "PIMIENTO AMARILLO", cantidad: 0.5, unidad: "KG" },
  { producto: "PIMIENTO VERDE", cantidad: 0.5, unidad: "KG" },
  { producto: "CHILE CUARESMEÑO", cantidad: 0.5, unidad: "KG" },
  { producto: "CHILE ANCHO", cantidad: 1, unidad: "KG" },
  { producto: "CACAHUATE PELADO", cantidad: 1, unidad: "KG" },
  { producto: "SEMILLA DE GIRASOL", cantidad: 0.5, unidad: "KG" },
  { producto: "PEPITA PELADA", cantidad: 0.5, unidad: "KG" },
  { producto: "SAL", cantidad: 3, unidad: "KG" },
  { producto: "KNORR SUIZA", cantidad: 13, unidad: "KG" },
  { producto: "ACHIOTE", cantidad: 1, unidad: "KG" },
  { producto: "CANELA ENTERA", cantidad: 0.5, unidad: "KG" },
  { producto: "COMINO", cantidad: 0.5, unidad: "KG" },
  { producto: "ARANDANOS", cantidad: 1.5, unidad: "KG" },
  { producto: "FLOR DE JAMAICA", cantidad: 2, unidad: "KG" },
  { producto: "ACEITE VEGETAL", cantidad: 10, unidad: "LT" },
  { producto: "TORTILLINAS", cantidad: 3, unidad: "PQ" },
  { producto: "PAN ARABE", cantidad: 1, unidad: "PQ" },
  { producto: "TORTILLAS BURRERA", cantidad: 1, unidad: "PQ" },
  { producto: "BRIOCHE", cantidad: 1, unidad: "PQ" },
  { producto: "AZUCAR", cantidad: 5, unidad: "KG" },
  { producto: "LECHERA", cantidad: 3, unidad: "PZ" },
  { producto: "LECHE ENTERA", cantidad: 3, unidad: "PZ" },
  { producto: "LECHE CLAVEL", cantidad: 3, unidad: "LT" },
  { producto: "ARROZ", cantidad: 2, unidad: "KG" },
  { producto: "CHAROLA CHICA", cantidad: 1, unidad: "PQ" },
  { producto: "SERVILLETAS DE 100", cantidad: 5, unidad: "PAQ" },
  { producto: "EGAPACK 30X1200", cantidad: 1, unidad: "ROLLO" },
  { producto: "SOUFLE DE 4 A", cantidad: 5, unidad: "PAQ" },
  { producto: "TAPA SOUFLE 4 A", cantidad: 5, unidad: "PAQ" },
  { producto: "BOLSA DE BASURA POLIET NEGRA", cantidad: 2, unidad: "KG" },
  { producto: "PAPEL GRADO ALIMENTICIO", cantidad: 1, unidad: "KG" },
  { producto: "PALILLOS", cantidad: 3, unidad: "PZ" },
  { producto: "BOLSA POLIPAPEL 1 KG", cantidad: 1, unidad: "ROLLO" },
  { producto: "GUANTES DE LATEX NEGRO", cantidad: 2, unidad: "CAJA" },
  { producto: "CUBREBOCAS COLOR NEGRO", cantidad: 1, unidad: "CAJA" },
  { producto: "SANITAS", cantidad: 1, unidad: "CAJA" },
  { producto: "PAPEL DE BAÑO", cantidad: 1, unidad: "PQ" },
  { producto: "TRAPO VERDE DE MICRO FIBRA", cantidad: 1, unidad: "PZ" },
  { producto: "TRAPO ROJO DE M ICRO FIBRA", cantidad: 1, unidad: "PZ" },
  { producto: "TRAPO AZUL DE MICROFIBRA", cantidad: 1, unidad: "PZ" },
  { producto: "JABON DE ROMA", cantidad: 10, unidad: "KG" },
  { producto: "CLORO", cantidad: 20, unidad: "LT" },
  { producto: "GEL ANTIBACTERIAL", cantidad: 1, unidad: "LT" },
  { producto: "FIBRA VERDE", cantidad: 1, unidad: "PQ" },
  { producto: "FIBRAS DE METAL", cantidad: 10, unidad: "PZ" },
  { producto: "PIEDRA POMEX", cantidad: 1, unidad: "KG" },
  { producto: "DETERGENTE", cantidad: 20, unidad: "LT" },
  { producto: "BOTIQUIN DE PRIMEROS AUXILIOS", cantidad: 1, unidad: "PZ" }
];
