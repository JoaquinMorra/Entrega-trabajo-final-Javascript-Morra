const listaProductos = document.getElementById('productos');
const listaCarrito = document.getElementById('listaCarrito');
const totalCarrito = document.getElementById('totalCarrito');
const btnVaciarCarrito = document.getElementById('vaciarCarrito');

let carrito = [];
let productosData;

// Cargar productos desde productos.json usando fetch y JSON
async function cargarProductos() {
    try {
        const response = await fetch('./assets/data/productos.json');
        productosData = await response.json();

        productosData.forEach(producto => {
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('producto');
            productoDiv.innerHTML = `
                <img src="./assets/${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p class="precio">$${producto.precio}</p>
                <button class="agregar-carrito" data-id="${producto.id}">Agregar al Carrito</button>
            `;
            listaProductos.appendChild(productoDiv);
        });

    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}

// Función para agregar un producto al carrito
function agregarAlCarrito(producto) {
    carrito.push(producto);
    console.log('Producto agregado al carrito:', producto); 
    actualizarCarrito();
}

// Función para actualizar el carrito en el DOM
function actualizarCarrito() {
    listaCarrito.innerHTML = '';
    let total = 0;
    
    carrito.forEach(producto => {
        const productoLi = document.createElement('li');
        productoLi.innerHTML = `
            <span>${producto.nombre} - $${producto.precio}</span>
        `;
        listaCarrito.appendChild(productoLi);
        total += producto.precio;
    });

    totalCarrito.textContent = `Total: $${total}`;
}

// Evento click en los botones "Agregar al Carrito"
listaProductos.addEventListener('click', event => {
    if (event.target.classList.contains('agregar-carrito')) {
        const idProducto = parseInt(event.target.getAttribute('data-id'));
        const productoSeleccionado = productosData.find(producto => producto.id === idProducto);
        if (productoSeleccionado) {
            agregarAlCarrito(productoSeleccionado);
        }
    }
});

// Evento click en el botón "Vaciar Carrito"
btnVaciarCarrito.addEventListener('click', () => {
    carrito = [];
    actualizarCarrito();
});

cargarProductos();
