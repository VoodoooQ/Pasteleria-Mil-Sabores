// Carrito de compras
let carrito = [];
let usuario = null;
function cargarUsuario() {
	const guardado = localStorage.getItem('usuario');
	usuario = guardado ? JSON.parse(guardado) : null;
}

function agregarAlCarrito(producto) {
	// Sincronizar carrito con localStorage antes de agregar
	cargarCarrito();
	// Si el producto tiene mensaje personalizado, se agrega como producto único
	if (producto.mensaje && producto.mensaje.trim() !== '') {
		// Generar un código temporal único para el producto con mensaje
		const tempCodigo = producto.codigo + '_msg_' + Date.now() + '_' + Math.floor(Math.random()*10000);
		carrito.push({ ...producto, codigo: tempCodigo, cantidad: 1 });
	} else {
		// Si el producto ya está en el carrito, aumenta cantidad
		const encontrado = carrito.find(p => p.codigo === producto.codigo && (!p.mensaje || p.mensaje === ''));
		if (encontrado) {
			encontrado.cantidad += 1;
		} else {
			carrito.push({ ...producto, cantidad: 1 });
		}
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
		cargarUsuario();
		carrito.forEach(producto => {
			const div = document.createElement('div');
			div.className = 'producto';
			let precioOriginal = producto.precio;
			let precioFinal = precioOriginal;
			let descuentos = [];
			// Aplicar descuentos según usuario
			if (usuario) {
				if (usuario.descuento50) {
					precioFinal = Math.round(precioFinal * 0.5);
					descuentos.push('50% por edad');
				}
				if (usuario.descuento10) {
					precioFinal = Math.round(precioFinal * 0.9);
					descuentos.push('10% por código FELICES50');
				}
			}
						div.innerHTML = `
								<div style='display:flex;align-items:center;gap:1em;'>
									<img src='${producto.img}' alt='${producto.nombre}' style='width:90px;height:90px;object-fit:cover;border-radius:8px;border:1px solid #B0BEC5;'>
									<div style='flex:1;'>
										<h3 style='font-family:Pacifico;color:#8B4513;'>${producto.nombre}</h3>
										<p style='font-family:Lato;color:#5D4037;'>Precio original: $${precioOriginal}</p>
										<p style='font-family:Lato;color:#5D4037;'>Descuentos: ${descuentos.length ? descuentos.join(', ') : 'Ninguno'}</p>
										<p style='font-family:Lato;color:#8B4513;'>Precio final: $${precioFinal}</p>
										<p style='font-family:Lato;color:#5D4037;'>Cantidad: ${producto.cantidad}</p>
										${producto.mensaje ? `<p style='font-family:Lato;color:#5D4037;'>Mensaje: ${producto.mensaje}</p>` : ''}
										<button class='btn' onclick="eliminarDelCarrito('${producto.codigo}')">Eliminar</button>
									</div>
								</div>
						`;
			lista.appendChild(div);
			total += precioFinal * producto.cantidad;
		});
		// Torta gratis por cumpleaños
		let tortaGratisMsg = '';
		if (usuario && usuario.tortaGratis) {
			const hoy = new Date();
			const cumple = new Date(usuario.fecha);
			if (hoy.getDate() === cumple.getDate() && hoy.getMonth() === cumple.getMonth()) {
				tortaGratisMsg = '<p style="color:#8B4513;font-weight:bold;">¡Torta gratis por tu cumpleaños!</p>';
				totalDiv.innerHTML = `<h3>Total: $${total}</h3>${tortaGratisMsg}`;
				return;
			}
		}
		totalDiv.innerHTML = `<h3>Total: $${total}</h3>`;
}

function mostrarDetalleCarrito() {
	cargarCarrito();
	const lista = document.getElementById('detalle-carrito-lista');
	const totalDiv = document.getElementById('detalle-carrito-total');
	if (!lista) return;
	lista.innerHTML = '';
	let total = 0;
	cargarUsuario();
	let tortaGratisMsg = '';
	carrito.forEach((producto, i) => {
		let precioOriginal = producto.precio;
		let precioFinal = precioOriginal;
		let descuentos = [];
		if (usuario) {
			if (usuario.descuento50) {
				precioFinal = Math.round(precioFinal * 0.5);
				descuentos.push('50% por edad');
			}
			if (usuario.descuento10) {
				precioFinal = Math.round(precioFinal * 0.9);
				descuentos.push('10% por código FELICES50');
			}
		}
		const div = document.createElement('div');
		div.className = 'producto';
		div.innerHTML = `
			<img src='${producto.img}' alt='${producto.nombre}' style='width:120px;display:block;margin-bottom:8px;border-radius:8px;'>
			<h3>${producto.nombre}</h3>
			<p>Precio original: $${precioOriginal}</p>
			<p>Descuentos: ${descuentos.length ? descuentos.join(', ') : 'Ninguno'}</p>
			<p>Precio final: $${precioFinal}</p>
			<p>
			  Cantidad: <button class='btn' onclick="cambiarCantidadCarrito('${producto.codigo}', -1)">-</button>
			  <span id='cantidad-${producto.codigo}'>${producto.cantidad}</span>
			  <button class='btn' onclick="cambiarCantidadCarrito('${producto.codigo}', 1)">+</button>
			</p>
		${producto.mensaje ? `<p>Mensaje: ${producto.mensaje}</p>` : ''}
		<button class='btn' onclick="eliminarDelCarritoDetalle('${producto.codigo}')">Eliminar</button>
		`;
		lista.appendChild(div);
		total += precioFinal * producto.cantidad;
	});
	// Torta gratis por cumpleaños
	if (usuario && usuario.tortaGratis) {
		const hoy = new Date();
		const cumple = new Date(usuario.fecha);
		if (hoy.getDate() === cumple.getDate() && hoy.getMonth() === cumple.getMonth()) {
			tortaGratisMsg = '<p style="color:#8B4513;font-weight:bold;">¡Torta gratis por tu cumpleaños!</p>';
		}
	}
	totalDiv.innerHTML = `<h3>Total: $${total}</h3>${tortaGratisMsg}`;
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
window.agregarAlCarrito = agregarAlCarrito;
// Puedes llamar a esta función desde el botón "Agregar al Carrito"
