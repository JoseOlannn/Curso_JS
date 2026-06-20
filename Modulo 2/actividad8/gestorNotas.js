const fs = require('fs');
const path = require('path');

const archivoNotas = path.join(__dirname, 'notas.json');

// Función auxiliar para asegurar que el archivo existe
const inicializarArchivo = () => {
    if (!fs.existsSync(archivoNotas)) {
        fs.writeFileSync(archivoNotas, JSON.stringify([]));
    }
};

const crearNota = (titulo, contenido) => {
    inicializarArchivo();
    const notas = JSON.parse(fs.readFileSync(archivoNotas, 'utf-8'));
    notas.push({ titulo, contenido });
    fs.writeFileSync(archivoNotas, JSON.stringify(notas, null, 2));
    console.log(`Nota '${titulo}' creada exitosamente.`);
};

const listarNotas = () => {
    inicializarArchivo();
    const notas = JSON.parse(fs.readFileSync(archivoNotas, 'utf-8'));
    console.log("\n--- Lista de Notas ---");
    if (notas.length === 0) {
        console.log("No hay notas guardadas.");
    } else {
        notas.forEach((nota, index) => {
            console.log(`${index + 1}. ${nota.titulo}: ${nota.contenido}`);
        });
    }
    console.log("----------------------\n");
};

const eliminarNota = (titulo) => {
    inicializarArchivo();
    const notas = JSON.parse(fs.readFileSync(archivoNotas, 'utf-8'));
    const notasFiltradas = notas.filter(nota => nota.titulo !== titulo);
    
    if (notas.length === notasFiltradas.length) {
        console.log(`No se encontró ninguna nota con el título '${titulo}'.`);
    } else {
        fs.writeFileSync(archivoNotas, JSON.stringify(notasFiltradas, null, 2));
        console.log(`Nota '${titulo}' eliminada exitosamente.`);
    }
};

// --- Ejemplos de uso ---
// Agregamos algunas notas de prueba
crearNota("Compras", "Comprar leche, huevos y pan.");
crearNota("Recordatorio", "Llamar al médico mañana a las 10 AM.");

// Listamos las notas
listarNotas();

// Eliminamos una nota
eliminarNota("Compras");

// Volvemos a listar para verificar la eliminación
listarNotas();
