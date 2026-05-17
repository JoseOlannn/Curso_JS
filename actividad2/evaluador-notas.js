// ============================================
// Actividad 2: Evaluador de Notas con Mensajes Personalizados
// ============================================
// Este programa evalúa la nota de un estudiante y
// genera un mensaje personalizado basado en la nota.

console.log('=== EVALUADOR DE NOTAS ===\n');

/**
 * Función que evalúa una nota y devuelve un mensaje personalizado.
 * @param {number} nota - La nota del estudiante (0-100)
 * @returns {string} Mensaje con el resultado
 */
function evaluarNota(nota) {
  // Verificar que la nota sea un valor válido (truthy y dentro de rango)
  if (typeof nota !== 'number' || nota < 0 || nota > 100) {
    return `⚠️  La nota "${nota}" no es válida. Debe ser un número entre 0 y 100.`;
  }

  // Verificar si la nota es mayor que 0 (truthy)
  if (nota) {
    if (nota >= 90) {
      return `🌟 Nota: ${nota} - ¡APROBADO con "Excelente"! ¡Felicidades, trabajo sobresaliente!`;
    } else if (nota >= 75) {
      return `✅ Nota: ${nota} - APROBADO con "Bien". ¡Buen trabajo, sigue así!`;
    } else if (nota >= 60) {
      return `📝 Nota: ${nota} - APROBADO con "Suficiente". Puedes mejorar, ¡ánimo!`;
    } else {
      return `❌ Nota: ${nota} - NO APROBADO. Necesitas estudiar más. ¡No te rindas!`;
    }
  } else {
    // nota es 0 (falsy)
    return `❌ Nota: ${nota} - NO APROBADO. No se registró calificación.`;
  }
}

// --- Pruebas con diferentes valores ---

// Caso: Excelente (90 o más)
console.log(evaluarNota(95));
console.log(evaluarNota(90));
console.log(evaluarNota(100));

console.log(''); // Línea en blanco

// Caso: Bien (75 - 89)
console.log(evaluarNota(85));
console.log(evaluarNota(75));
console.log(evaluarNota(89));

console.log('');

// Caso: Suficiente (60 - 74)
console.log(evaluarNota(60));
console.log(evaluarNota(70));
console.log(evaluarNota(74));

console.log('');

// Caso: No aprobado (menor de 60)
console.log(evaluarNota(45));
console.log(evaluarNota(30));
console.log(evaluarNota(59));

console.log('');

// Caso: Nota es 0
console.log(evaluarNota(0));

console.log('');

// --- Valor aleatorio (opcional) ---
console.log('--- Evaluación con nota aleatoria ---');
const notaAleatoria = Math.floor(Math.random() * 101); // 0 a 100
console.log(`Nota generada aleatoriamente: ${notaAleatoria}`);
console.log(evaluarNota(notaAleatoria));

console.log('\n=== FIN DE ACTIVIDAD 2 ===');
