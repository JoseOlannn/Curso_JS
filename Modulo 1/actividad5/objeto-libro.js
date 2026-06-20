// ============================================
// Actividad 5: Crear Objeto a partir de un Libro
// ============================================
// Crear un objeto libro que contenga varias propiedades
// y un método para imprimir la información básica.

console.log('=== OBJETO LIBRO ===\n');

// --- Libro 1 ---
const libro1 = {
  titulo: 'Cien Años de Soledad',
  autor: 'Gabriel García Márquez',
  anio: 1967,
  estado: 'disponible',
  capitulos: [
    'Capítulo 1: El hielo',
    'Capítulo 2: La fundación de Macondo',
    'Capítulo 3: La peste del insomnio'
  ],

  // Método para describir el libro
  describirLibro: function() {
    console.log(`📖 Libro titulado "${this.titulo}", escrito por ${this.autor} en el año ${this.anio}, el estado es: ${this.estado}.`);
  },

  // Método para agregar un capítulo (opcional)
  agregarCapitulo: function(capitulo) {
    if (!capitulo) {
      console.log('⚠️  Debes proporcionar el nombre del capítulo.');
      return;
    }
    this.capitulos.push(capitulo);
    console.log(`✅ Se agregó: "${capitulo}"`);
  },

  // Método para eliminar un capítulo (opcional)
  eliminarCapitulo: function(indice) {
    if (indice < 0 || indice >= this.capitulos.length) {
      console.log('⚠️  Índice de capítulo no válido.');
      return;
    }
    const eliminado = this.capitulos.splice(indice, 1);
    console.log(`🗑️  Se eliminó: "${eliminado[0]}"`);
  },

  // Método para listar capítulos
  listarCapitulos: function() {
    if (this.capitulos.length === 0) {
      console.log('📑 Este libro no tiene capítulos registrados.');
      return;
    }
    console.log(`\n📑 Capítulos de "${this.titulo}":`);
    this.capitulos.forEach((cap, i) => {
      console.log(`  ${i + 1}. ${cap}`);
    });
  },

  // Método para cambiar el estado del libro
  cambiarEstado: function(nuevoEstado) {
    const estadosValidos = ['disponible', 'prestado'];
    if (!estadosValidos.includes(nuevoEstado)) {
      console.log(`⚠️  Estado no válido. Usa: ${estadosValidos.join(' o ')}`);
      return;
    }
    this.estado = nuevoEstado;
    console.log(`📋 Estado de "${this.titulo}" cambiado a: ${this.estado}`);
  }
};

// --- Libro 2 ---
const libro2 = {
  titulo: 'El Principito',
  autor: 'Antoine de Saint-Exupéry',
  anio: 1943,
  estado: 'prestado',
  capitulos: [
    'Capítulo I: El dibujo del elefante',
    'Capítulo II: Encuentro en el desierto',
    'Capítulo III: El asteroide B-612'
  ],

  describirLibro: function() {
    console.log(`📖 Libro titulado "${this.titulo}", escrito por ${this.autor} en el año ${this.anio}, el estado es: ${this.estado}.`);
  },

  agregarCapitulo: function(capitulo) {
    this.capitulos.push(capitulo);
    console.log(`✅ Se agregó: "${capitulo}"`);
  },

  eliminarCapitulo: function(indice) {
    if (indice < 0 || indice >= this.capitulos.length) {
      console.log('⚠️  Índice no válido.');
      return;
    }
    const eliminado = this.capitulos.splice(indice, 1);
    console.log(`🗑️  Se eliminó: "${eliminado[0]}"`);
  },

  listarCapitulos: function() {
    console.log(`\n📑 Capítulos de "${this.titulo}":`);
    this.capitulos.forEach((cap, i) => {
      console.log(`  ${i + 1}. ${cap}`);
    });
  }
};

// --- Uso de los objetos ---

// Describir libros
console.log('--- Descripción de los libros ---');
libro1.describirLibro();
libro2.describirLibro();

// Listar capítulos
console.log('\n--- Capítulos ---');
libro1.listarCapitulos();
libro2.listarCapitulos();

// Agregar capítulos
console.log('\n--- Agregar capítulos ---');
libro1.agregarCapitulo('Capítulo 4: Los gitanos');
libro1.agregarCapitulo('Capítulo 5: Rebeca');
libro1.listarCapitulos();

// Eliminar un capítulo
console.log('\n--- Eliminar capítulo ---');
libro1.eliminarCapitulo(0); // Eliminar el primer capítulo
libro1.listarCapitulos();

// Cambiar estado
console.log('\n--- Cambiar estado ---');
libro1.cambiarEstado('prestado');
libro1.describirLibro();
libro1.cambiarEstado('disponible');
libro1.describirLibro();

// Intentar estado inválido
libro1.cambiarEstado('perdido');

console.log('\n=== FIN DE ACTIVIDAD 5 ===');
