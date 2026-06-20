const productos = [
    { nombre: 'Zapatos', precio: 120, categoria: 'Ropa' },
    { nombre: 'Camisa', precio: 45, categoria: 'Ropa' },
    { nombre: 'Auriculares', precio: 80, categoria: 'Electrónica' },
    { nombre: 'Reloj', precio: 150, categoria: 'Accesorios' },
    { nombre: 'Billetera', precio: 30, categoria: 'Accesorios' }
];

// 2. Uso de filter()
const productosBaratos = productos.filter(producto => producto.precio < 100);
console.log("Productos menores a $100:", productosBaratos);

// 3. Uso de sort()
const productosOrdenados = productosBaratos.sort((a, b) => a.nombre.localeCompare(b.nombre));
console.log("Productos ordenados alfabéticamente:", productosOrdenados);

// 4. Uso de map()
const nombresProductos = productosOrdenados.map(producto => producto.nombre);
console.log("Nombres de los productos ordenados:", nombresProductos);

// 6. Opcional: Uso de reduce()
const precioTotal = productos.reduce((total, producto) => total + producto.precio, 0);
console.log("Precio total de todos los productos (reduce):", precioTotal);

// Opcional: Uso de some()
const hayProductosCaros = productos.some(producto => producto.precio > 100);
console.log("¿Hay productos que cuesten más de $100? (some):", hayProductosCaros);
