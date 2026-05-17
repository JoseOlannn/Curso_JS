// ============================================
// Actividad 1: Tipos de Datos en JavaScript
// ============================================
// Este archivo muestra los distintos tipos de datos
// que existen en JavaScript usando typeof.

console.log('=== TIPOS DE DATOS EN JAVASCRIPT ===\n');

// --- Tipo: number ---
console.log('--- Números (number) ---');
console.log('typeof 42 =>', typeof 42);               // number
console.log('typeof -666 =>', typeof -666);             // number
console.log('typeof 0 =>', typeof 0);                   // number
console.log('typeof 3.14 =>', typeof 3.14);             // number (decimales)
console.log('typeof Infinity =>', typeof Infinity);     // number
console.log('typeof NaN =>', typeof NaN);               // number (¡sorpresa!)
console.log('typeof -0 =>', typeof -0);                 // number

// --- Tipo: string ---
console.log('\n--- Cadenas de texto (string) ---');
console.log("typeof 'Veinticinco' =>", typeof 'Veinticinco');  // string
console.log("typeof '' =>", typeof '');                         // string (cadena vacía)
console.log("typeof 'FALSE' =>", typeof 'FALSE');               // string (¡no es boolean!)
console.log("typeof `template` =>", typeof `template`);         // string (template literal)
console.log("typeof '42' =>", typeof '42');                     // string (número como texto)

// --- Tipo: boolean ---
console.log('\n--- Booleanos (boolean) ---');
console.log('typeof true =>', typeof true);             // boolean
console.log('typeof false =>', typeof false);           // boolean

// --- Tipo: undefined ---
console.log('\n--- Undefined ---');
console.log('typeof undefined =>', typeof undefined);   // undefined
let variableSinValor;
console.log('typeof variableSinValor =>', typeof variableSinValor); // undefined

// --- Tipo: object ---
console.log('\n--- Objetos (object) ---');
console.log('typeof null =>', typeof null);             // object (¡es un bug histórico de JS!)
console.log('typeof {} =>', typeof {});                 // object
console.log('typeof [] =>', typeof []);                 // object (los arrays son objetos)
console.log('typeof new Date() =>', typeof new Date()); // object

// --- Tipo: function ---
console.log('\n--- Funciones (function) ---');
console.log('typeof function(){} =>', typeof function(){}); // function
console.log('typeof console.log =>', typeof console.log);   // function

// --- Tipo: symbol ---
console.log('\n--- Símbolos (symbol) ---');
console.log('typeof Symbol() =>', typeof Symbol());     // symbol

// --- Tipo: bigint ---
console.log('\n--- BigInt ---');
console.log('typeof 42n =>', typeof 42n);               // bigint

// ============================================
// Ejemplos propios y experimentación
// ============================================
console.log('\n=== EXPERIMENTACIÓN PROPIA ===\n');

// ¿Qué pasa con FALSE (sin comillas no existe, con comillas es string)?
// console.log(typeof FALSE); // ¡Error! FALSE no está definida como variable
console.log("typeof 'FALSE' =>", typeof 'FALSE');       // string
// En JS los booleanos son: true y false (minúsculas)

// Valores truthy y falsy
console.log('\n--- Valores Truthy y Falsy ---');
console.log('Boolean(0) =>', Boolean(0));               // false (falsy)
console.log('Boolean("") =>', Boolean(''));              // false (falsy)
console.log('Boolean(null) =>', Boolean(null));          // false (falsy)
console.log('Boolean(undefined) =>', Boolean(undefined)); // false (falsy)
console.log('Boolean(NaN) =>', Boolean(NaN));            // false (falsy)
console.log('Boolean(1) =>', Boolean(1));               // true (truthy)
console.log('Boolean("hola") =>', Boolean('hola'));      // true (truthy)
console.log('Boolean([]) =>', Boolean([]));              // true (truthy, ¡array vacío es truthy!)
console.log('Boolean({}) =>', Boolean({}));              // true (truthy, ¡objeto vacío es truthy!)

console.log('\n=== FIN DE ACTIVIDAD 1 ===');
