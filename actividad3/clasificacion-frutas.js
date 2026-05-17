// ============================================
// Actividad 3: Clasificación de Frutas
// ============================================
// Este programa clasifica las frutas según su tipo
// y cuenta cuántas hay de cada tipo.

console.log('=== CLASIFICACIÓN DE FRUTAS ===\n');

// Paso 1: Declarar un arreglo con varios tipos de frutas
const frutas = [
  'manzana', 'plátano', 'naranja', 'manzana', 'fresa',
  'plátano', 'uva', 'naranja', 'manzana', 'fresa',
  'kiwi', 'plátano', 'naranja', 'uva', 'manzana',
  'sandía', 'fresa', 'kiwi', 'plátano', 'uva'
];

console.log('Frutas en el arreglo:', frutas);
console.log('Total de frutas:', frutas.length);

// Paso 2: Crear un objeto para almacenar la cantidad de cada tipo de fruta
const conteoFrutas = {};

// ============================================
// Método 1: Usando ciclo FOR
// ============================================
console.log('\n--- Método 1: Ciclo FOR ---');

for (let i = 0; i < frutas.length; i++) {
  const fruta = frutas[i];
  // Si la fruta ya existe en el objeto, incrementar el contador
  if (conteoFrutas[fruta]) {
    conteoFrutas[fruta]++;
  } else {
    // Si no existe, inicializar el contador en 1
    conteoFrutas[fruta] = 1;
  }
}

// Imprimir el conteo de cada fruta
console.log('\nResultado del conteo (con FOR):');
for (const fruta in conteoFrutas) {
  console.log(`  🍎 ${fruta}: ${conteoFrutas[fruta]} unidad(es)`);
}

// ============================================
// Método 2: Usando ciclo WHILE (opcional)
// ============================================
console.log('\n--- Método 2: Ciclo WHILE ---');

const conteoConWhile = {};
let indice = 0;

while (indice < frutas.length) {
  const fruta = frutas[indice];
  if (conteoConWhile[fruta]) {
    conteoConWhile[fruta]++;
  } else {
    conteoConWhile[fruta] = 1;
  }
  indice++;
}

// Imprimir el conteo de cada fruta
console.log('\nResultado del conteo (con WHILE):');
const claves = Object.keys(conteoConWhile);
let j = 0;
while (j < claves.length) {
  console.log(`  🍎 ${claves[j]}: ${conteoConWhile[claves[j]]} unidad(es)`);
  j++;
}

// ============================================
// Método 3 (Bonus): Usando forEach y reduce
// ============================================
console.log('\n--- Método 3 (Bonus): forEach ---');

const conteoForEach = {};
frutas.forEach((fruta) => {
  conteoForEach[fruta] = (conteoForEach[fruta] || 0) + 1;
});

Object.entries(conteoForEach).forEach(([fruta, cantidad]) => {
  console.log(`  🍎 ${fruta}: ${cantidad} unidad(es)`);
});

console.log('\n--- Método 4 (Bonus): reduce ---');

const conteoReduce = frutas.reduce((acumulador, fruta) => {
  acumulador[fruta] = (acumulador[fruta] || 0) + 1;
  return acumulador;
}, {});

console.log('Conteo final:', conteoReduce);

// Fruta más popular
const frutaMasPopular = Object.entries(conteoReduce)
  .sort((a, b) => b[1] - a[1])[0];
console.log(`\n🏆 La fruta más popular es: ${frutaMasPopular[0]} con ${frutaMasPopular[1]} unidades`);

console.log('\n=== FIN DE ACTIVIDAD 3 ===');
