// import localStorage from 'local-storage';
localStorage.setItem('clave', 'valor');
const valor = localStorage.getItem('clave');
const listaProductos = document.getElementById('productos');
const listaCarrito = document.getElementById('listaCarrito');
const totalCarrito = document.getElementById('totalCarrito');
const btnVaciarCarrito = document.getElementById('vaciarCarrito');
const btnRealizarCompra = document.getElementById('realizarCompra');
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
// Función para guardar el carrito en el localStorage
function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito',JSON.stringify(carrito));
}

// Función para cargar el carrito desde el localStorage
function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
    if (carritoGuardado) {
        carrito = carritoGuardado;
        actualizarCarrito();
    }
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
    localStorage.remove('carrito'); 
});

// Evento click en el botón "Realizar Compra"
btnRealizarCompra.addEventListener('click', () => {
    if (carrito.length > 0) {
        // Aquí puedes agregar la lógica de cierre de compra
        // Por ejemplo, simular una operación de pago, guardar detalles de la compra, etc.
        alert('¡Compra realizada con éxito!');
        carrito = [];
        actualizarCarrito();
        localStorage.remove('carrito'); // Remover el carrito del localStorage
    } else {
        alert('El carrito está vacío. Agrega productos antes de realizar la compra.');
    }
});


// Cargar el carrito desde el localStorage al iniciar
cargarCarritoDesdeLocalStorage();

cargarProductos();
