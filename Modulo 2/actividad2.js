const listaDeCompras = [];

const agregarProducto = (producto) => {
    if (!listaDeCompras.includes(producto)) {
        listaDeCompras.push(producto);
        console.log(`Producto '${producto}' agregado.`);
    } else {
        console.log(`El producto '${producto}' ya existe en la lista.`);
    }
};

const eliminarProducto = (producto) => {
    const index = listaDeCompras.indexOf(producto);
    if (index !== -1) {
        listaDeCompras.splice(index, 1);
        console.log(`Producto '${producto}' eliminado.`);
    } else {
        console.log(`El producto '${producto}' no se encontró en la lista.`);
    }
};

const mostrarLista = () => {
    console.log("--- Lista de Compras ---");
    listaDeCompras.forEach((producto, index) => {
        console.log(`${index + 1}. ${producto}`);
    });
};

agregarProducto('Manzanas');
agregarProducto('Leche');
agregarProducto('Pan');
agregarProducto('Manzanas'); // Intento de duplicado
eliminarProducto('Leche');
mostrarLista();
