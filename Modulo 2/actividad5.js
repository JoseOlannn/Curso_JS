const encontrarPalabraMasLarga = (texto) => {
    const palabras = texto.split(' ');
    let longestWord = "";

    for (let i = 0; i < palabras.length; i++) {
        // Opcional: remover signos de puntuación básicos al comparar
        const palabraActual = palabras[i].replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ]/g, '');
        if (palabraActual.length > longestWord.length) {
            longestWord = palabraActual;
        }
    }
    return longestWord;
};

const texto = "El algoritmo de Sliding Window es muy eficiente para este tipo de problemas.";
console.log("Texto original:", texto);
console.log("Palabra más larga:", encontrarPalabraMasLarga(texto));
