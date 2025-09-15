// Compartir el carrito en redes sociales
function compartirRed(red) {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  let texto = '¡Mira mi pedido en Pastelería Mil Sabores!\n';
  carrito.forEach(p => {
    texto += `${p.nombre} x${p.cantidad} ${p.mensaje ? '('+p.mensaje+')' : ''}\n`;
  });
  let link = '';
  if (red === 'facebook') link = 'https://facebook.com';
  if (red === 'whatsapp') link = 'https://whatsapp.com';
  if (red === 'twitter') link = 'https://x.com';
  if (red === 'telegram') link = 'https://instagram.com';
  window.open(link, '_blank');
}
// Editar producto en el carrito (mensaje, tamaño, tipo)
function editarProducto(index) {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const producto = carrito[index];
  const nuevoMensaje = prompt('Editar mensaje personalizado:', producto.mensaje || '');
  if (nuevoMensaje !== null) producto.mensaje = nuevoMensaje;
  const nuevoTamano = prompt('Editar tamaño (pequena, mediana, grande):', producto.tamano || '');
  if (nuevoTamano !== null && nuevoTamano !== '') producto.tamano = nuevoTamano;
  const nuevoTipo = prompt('Editar tipo (cuadrada, circular):', producto.tipo || '');
  if (nuevoTipo !== null && nuevoTipo !== '') producto.tipo = nuevoTipo;
  carrito[index] = producto;
  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarritoEditable();
}
// Mostrar el carrito editable en la página
function mostrarCarritoEditable() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const lista = document.getElementById('carrito-lista');
  const totalDiv = document.getElementById('carrito-total');
  lista.innerHTML = '';
  let total = 0;
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
    lista.innerHTML += `
      <div class="producto" style="display:flex;align-items:center;gap:1em;background:#FFF5E1;border:2px solid #FFC0CB;margin-bottom:1em;padding:1em;border-radius:12px;">
        <img src="${producto.img}" alt="${producto.nombre}" style="width:90px;height:90px;object-fit:cover;border-radius:8px;border:1px solid #B0BEC5;">
        <div style="flex:1;">
          <h3 style="font-family:Pacifico;color:#8B4513;">${producto.nombre}</h3>
          <p style="font-family:Lato;color:#5D4037;">Precio original: $${precioOriginal}</p>
          <p style="font-family:Lato;color:#5D4037;">Descuentos: ${descuentos.length ? descuentos.join(', ') : 'Ninguno'}</p>
          <p style="font-family:Lato;color:#8B4513;">Precio final: $${precioFinal}</p>
          <p style="font-family:Lato;color:#5D4037;">Cantidad: 
            <button class='btn' style='padding:2px 8px;' onclick="cambiarCantidadCarrito('${producto.codigo}', -1)">-</button>
            <span id='cantidad-${producto.codigo}'>${producto.cantidad}</span>
            <button class='btn' style='padding:2px 8px;' onclick="cambiarCantidadCarrito('${producto.codigo}', 1)">+</button>
          </p>
          <p style="font-family:Lato;color:#5D4037;">Tipo: ${producto.tipo || '-'}</p>
          <p style="font-family:Lato;color:#5D4037;">Tamaño: ${producto.tamano || '-'}</p>
          <p style="font-family:Lato;color:#5D4037;">Mensaje: ${producto.mensaje || '-'}</p>
          <button class='btn' onclick='editarProducto(${i})'>Editar</button>
          <button class='btn' onclick="eliminarDelCarrito('${producto.codigo}')">Eliminar</button>
        </div>
      </div>
    `;
    total += precioFinal * producto.cantidad;
  });
  let tortaGratisMsg = '';
  if (usuario && usuario.tortaGratis) {
    const hoy = new Date();
    const cumple = new Date(usuario.fecha);
    if (hoy.getDate() === cumple.getDate() && hoy.getMonth() === cumple.getMonth()) {
      tortaGratisMsg = '<p style="color:#8B4513;font-weight:bold;">¡Torta gratis por tu cumpleaños!</p>';
    }
  }
  totalDiv.innerHTML = `<h3>Total: $${total}</h3>${tortaGratisMsg}`;
}
// Cambiar la cantidad de un producto en el carrito
function cambiarCantidadCarrito(codigo, delta) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const idx = carrito.findIndex(p => p.codigo === codigo);
  if (idx !== -1) {
    carrito[idx].cantidad += delta;
    if (carrito[idx].cantidad < 1) carrito[idx].cantidad = 1;
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarritoEditable();
  }
}
mostrarCarritoEditable();
// Eliminar producto del carrito y actualizar vista
window.eliminarDelCarrito = function(codigo) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  carrito = carrito.filter(p => p.codigo !== codigo);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarritoEditable();
};