const encontrarMaximo = (arr) => {
    // Caso base: si el arreglo tiene un solo elemento, ese es el máximo
    if (arr.length === 1) {
        return arr[0];
    }
    
    // Dividimos el arreglo en dos mitades
    const mitad = Math.floor(arr.length / 2);
    const mitadIzquierda = arr.slice(0, mitad);
    const mitadDerecha = arr.slice(mitad);
    
    // Llamadas recursivas para encontrar el máximo en cada mitad
    const maxIzquierda = encontrarMaximo(mitadIzquierda);
    const maxDerecha = encontrarMaximo(mitadDerecha);
    
    // Combinar las soluciones
    return maxIzquierda > maxDerecha ? maxIzquierda : maxDerecha;
};

const numeros = [3, 5, 9, 1, 14, 8, 2, 10];
console.log("Arreglo de números:", numeros);
console.log("El número máximo usando Divide and Conquer es:", encontrarMaximo(numeros));
