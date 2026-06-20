const gifts = ["Pelota", "Bicicleta", "Consola", "Libro", "Rompecabezas"];

const buscarRegalo = (gifts, giftName, index = 0) => {
    // Caso base 1: se recorrió todo el arreglo sin encontrar el regalo
    if (index === gifts.length) {
        return `El regalo '${giftName}' no está en la lista.`;
    }
    // Caso base 2: se encontró el regalo
    if (gifts[index] === giftName) {
        return `El regalo '${giftName}' está en la posición ${index}.`;
    }
    // Llamada recursiva avanzando al siguiente elemento
    return buscarRegalo(gifts, giftName, index + 1);
};

console.log(buscarRegalo(gifts, "Libro"));
console.log(buscarRegalo(gifts, "Tren"));
