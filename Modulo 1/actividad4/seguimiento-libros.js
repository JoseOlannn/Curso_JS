// ============================================
// Actividad 4: Seguimiento de Libros
// ============================================
// Sistema sencillo para hacer seguimiento de los
// libros que has leído usando funciones.

console.log('=== SEGUIMIENTO DE LIBROS ===\n');

// Array para almacenar los libros leídos
const librosLeidos = [];

/**
 * Función para agregar un libro al array de libros leídos.
 * @param {string} titulo - El título del libro a agregar
 */
function agregarLibro(titulo) {
  if (!titulo || typeof titulo !== 'string') {
    console.log('⚠️  Por favor ingresa un título válido.');
    return;
  }

  // Verificar si el libro ya existe
  if (librosLeidos.includes(titulo)) {
    console.log(`📖 "${titulo}" ya está en tu lista de libros leídos.`);
    return;
  }

  librosLeidos.push(titulo);
  console.log(`✅ "${titulo}" ha sido agregado a tu lista de libros leídos.`);
}

/**
 * Función para mostrar todos los libros que has leído.
 */
function mostrarLibrosLeidos() {
  if (librosLeidos.length === 0) {
    console.log('📚 No has leído ningún libro todavía. ¡Empieza a leer!');
    return;
  }

  console.log(`\n📚 Lista de libros leídos (${librosLeidos.length} libros):`);
  console.log('─'.repeat(40));
  librosLeidos.forEach((libro, index) => {
    console.log(`  ${index + 1}. 📖 ${libro}`);
  });
  console.log('─'.repeat(40));
}

// --- Uso del sistema ---

// Mostrar lista vacía
mostrarLibrosLeidos();

console.log('');

// Agregar libros
agregarLibro('Cien Años de Soledad');
agregarLibro('El Principito');
agregarLibro('Don Quijote de la Mancha');
agregarLibro('Harry Potter y la Piedra Filosofal');
agregarLibro('1984');
agregarLibro('El Alquimista');

console.log('');

// Intentar agregar un libro repetido
agregarLibro('El Principito');

console.log('');

// Intentar agregar un título inválido
agregarLibro('');
agregarLibro(null);

console.log('');

// Mostrar todos los libros leídos
mostrarLibrosLeidos();

// --- Funcionalidad extra ---
console.log('\n--- Funcionalidades Extra ---');

/**
 * Función para eliminar un libro de la lista.
 * @param {string} titulo - El título del libro a eliminar
 */
function eliminarLibro(titulo) {
  const indice = librosLeidos.indexOf(titulo);
  if (indice === -1) {
    console.log(`⚠️  "${titulo}" no se encontró en la lista.`);
    return;
  }
  librosLeidos.splice(indice, 1);
  console.log(`🗑️  "${titulo}" ha sido eliminado de tu lista.`);
}

/**
 * Función para buscar un libro en la lista.
 * @param {string} busqueda - Término de búsqueda
 */
function buscarLibro(busqueda) {
  const resultados = librosLeidos.filter(libro =>
    libro.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (resultados.length === 0) {
    console.log(`🔍 No se encontraron libros con "${busqueda}".`);
  } else {
    console.log(`🔍 Resultados para "${busqueda}":`);
    resultados.forEach(libro => console.log(`  📖 ${libro}`));
  }
}

// Buscar un libro
buscarLibro('principito');
buscarLibro('javascript');

console.log('');

// Eliminar un libro
eliminarLibro('1984');
mostrarLibrosLeidos();

console.log('\n=== FIN DE ACTIVIDAD 4 ===');
