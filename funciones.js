// Carrito de compras
let carrito = [];

function agregarAlCarrito(producto) {
	// Si el producto ya está en el carrito, aumenta cantidad
	const encontrado = carrito.find(p => p.codigo === producto.codigo);
	if (encontrado) {
		encontrado.cantidad += 1;
	} else {
		carrito.push({ ...producto, cantidad: 1 });
	}
	guardarCarrito();
}

function eliminarDelCarrito(codigo) {
	carrito = carrito.filter(p => p.codigo !== codigo);
	guardarCarrito();
	mostrarCarrito();
}

function guardarCarrito() {
	localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarrito() {
	const guardado = localStorage.getItem('carrito');
	carrito = guardado ? JSON.parse(guardado) : [];
}

function mostrarCarrito() {
	cargarCarrito();
	const lista = document.getElementById('carrito-lista');
	const totalDiv = document.getElementById('carrito-total');
	if (!lista) return;
	lista.innerHTML = '';
	let total = 0;
	carrito.forEach(producto => {
		const div = document.createElement('div');
		div.className = 'producto';
		div.innerHTML = `
			<h3>${producto.nombre}</h3>
			<p>Precio: $${producto.precio}</p>
			<p>Cantidad: ${producto.cantidad}</p>
			<button class='btn' onclick="eliminarDelCarrito('${producto.codigo}')">Eliminar</button>
		`;
		lista.appendChild(div);
		total += producto.precio * producto.cantidad;
	});
	totalDiv.innerHTML = `<h3>Total: $${total}</h3>`;
}

function mostrarDetalleCarrito() {
	cargarCarrito();
	const lista = document.getElementById('detalle-carrito-lista');
	const totalDiv = document.getElementById('detalle-carrito-total');
	if (!lista) return;
	lista.innerHTML = '';
	let total = 0;
	carrito.forEach(producto => {
		const div = document.createElement('div');
		div.className = 'producto';
		div.innerHTML = `
			<h3>${producto.nombre}</h3>
			<p>Precio: $${producto.precio}</p>
			<p>Cantidad: ${producto.cantidad}</p>
		`;
		lista.appendChild(div);
		total += producto.precio * producto.cantidad;
	});
	totalDiv.innerHTML = `<h3>Total: $${total}</h3>`;
}

document.addEventListener('DOMContentLoaded', function() {
	if (document.getElementById('carrito-lista')) {
		mostrarCarrito();
	}
	if (document.getElementById('detalle-carrito-lista')) {
		mostrarDetalleCarrito();
		const form = document.getElementById('form-compra');
		if (form) {
			form.addEventListener('submit', function(e) {
				e.preventDefault();
				carrito = [];
				guardarCarrito();
				document.getElementById('detalle-carrito-lista').innerHTML = '';
				document.getElementById('detalle-carrito-total').innerHTML = '';
				document.getElementById('mensaje-compra').innerHTML = '<h3>¡Compra realizada con éxito!</h3>';
			});
		}
	}
});

// Ejemplo de cómo agregar producto desde detalle_producto.html
// Puedes llamar a esta función desde el botón "Agregar al Carrito"
agregarAlCarrito({codigo: 'TC001', nombre: 'Torta de Chocolate', precio: 45000});
