function compartirProducto(red) {
  const producto = document.querySelector('#detalle-producto h2').textContent;
  const mensaje = '¡Mira este producto en Pastelería Mil Sabores! ' + producto;
  let url = encodeURIComponent(window.location.href);
  let shareText = encodeURIComponent(mensaje);
  let link = '';
  if (red === 'facebook') link = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${shareText}`;
  if (red === 'whatsapp') link = `https://wa.me/?text=${shareText}%20${url}`;
  if (red === 'twitter') link = `https://twitter.com/intent/tweet?text=${shareText}%20${url}`;
  if (red === 'telegram') link = `https://t.me/share/url?url=${url}&text=${shareText}`;
  window.open(link, '_blank');
}
// Productos con propiedades tipo/tamaño (igual que en catalogo.html)
const productos = [
  {codigo:'TC001',nombre:'Torta de Chocolate',precio:45000,tipo:'cuadrada',tamano:'grande',img:'elementos/img/tortachocolate.png',descripcion:'Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales.'},
  {codigo:'TC002',nombre:'Torta de Frutas',precio:50000,tipo:'cuadrada',tamano:'grande',img:'elementos/img/tortafrutas.png',descripcion:'Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones.'},
  {codigo:'TT001',nombre:'Torta Circular de Vainilla',precio:40000,tipo:'circular',tamano:'mediana',img:'elementos/img/tortaCircularVainilla.png',descripcion:'Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce, perfecto para cualquier ocasión.'},
  {codigo:'TT002',nombre:'Torta Circular de Manjar',precio:42000,tipo:'circular',tamano:'mediana',img:'elementos/img/tortaCircularDeManjar.png',descripcion:'Torta tradicional chilena con manjar y nueces, un deleite para los amantes de los sabores dulces y clásicos.'},
  {codigo:'MC001',nombre:'Mousse de Chocolate',precio:5000,tipo:'individual',tamano:'pequena',img:'elementos/img/mousseDeChocolate.png',descripcion:'Postre individual cremoso y suave, hecho con chocolate de alta calidad, ideal para los amantes del chocolate.'},
  {codigo:'TI001',nombre:'Tiramisú Clásico',precio:5500,tipo:'individual',tamano:'pequena',img:'elementos/img/tiramisuClasico.png',descripcion:'Un postre italiano individual con capas de café, mascarpone y cacao, perfecto para finalizar cualquier comida.'},
  {codigo:'TSN001',nombre:'Torta Sin Azúcar de Naranja',precio:48000,tipo:'cuadrada',tamano:'grande',img:'elementos/img/tortaSinAzucarDeNaranja.png',descripcion:'Torta ligera y deliciosa, endulzada naturalmente, ideal para quienes buscan opciones más saludables.'},
  {codigo:'CSN001',nombre:'Cheesecake Sin Azúcar',precio:47000,tipo:'circular',tamano:'mediana',img:'elementos/img/cheesecakeSinAzucar.png',descripcion:'Suave y cremoso, este cheesecake es una opción perfecta para disfrutar sin culpa.'},
  {codigo:'EM001',nombre:'Empanada de Manzana',precio:3000,tipo:'individual',tamano:'pequena',img:'elementos/img/empanadaManzana.png',descripcion:'Pastelería tradicional rellena de manzanas especiadas, perfecta para un dulce desayuno o merienda.'},
  {codigo:'TS001',nombre:'Tarta de Santiago',precio:6000,tipo:'circular',tamano:'pequena',img:'elementos/img/tartaDeSantiago.png',descripcion:'Tradicional tarta española hecha con almendras, azúcar, y huevos, una delicia para los amantes de los postres clásicos.'},
  {codigo:'BG001',nombre:'Brownie Sin Gluten',precio:4000,tipo:'individual',tamano:'pequena',img:'elementos/img/brownieSinGluten.png',descripcion:'Rico y denso, este brownie es perfecto para quienes necesitan evitar el gluten sin sacrificar el sabor.'},
  {codigo:'PG001',nombre:'Pan Sin Gluten',precio:3500,tipo:'individual',tamano:'pequena',img:'elementos/img/panSinGluten.png',descripcion:'Suave y esponjoso, ideal para sándwiches o para acompañar cualquier comida.'},
  {codigo:'TV001',nombre:'Torta Vegana de Chocolate',precio:50000,tipo:'cuadrada',tamano:'grande',img:'elementos/img/torta_vegana_de_chocolate.png',descripcion:'Torta de chocolate húmeda y deliciosa, hecha sin productos de origen animal, perfecta para veganos.'},
  {codigo:'GV001',nombre:'Galletas Veganas de Avena',precio:4500,tipo:'individual',tamano:'pequena',img:'elementos/img/galletasAvenaVegana.png',descripcion:'Crujientes y sabrosas, estas galletas son una excelente opción para un snack saludable y vegano.'},
  {codigo:'TCUM001',nombre:'Torta Especial de Cumpleaños',precio:55000,tipo:'circular',tamano:'grande',img:'elementos/img/torta_especial_de_cumpleanos.png',descripcion:'Diseñada especialmente para celebraciones, personalizable con decoraciones y mensajes únicos.'},
  {codigo:'TB001',nombre:'Torta Especial de Boda',precio:60000,tipo:'circular',tamano:'grande',img:'elementos/img/torta_especial_de_boda.png',descripcion:'Elegante y deliciosa, esta torta está diseñada para ser el centro de atención en cualquier boda.'}
];
// Obtener producto seleccionado
const codigo = localStorage.getItem('productoDetalle');
const producto = productos.find(p => p.codigo === codigo) || productos[0];
const div = document.getElementById('detalle-producto');
div.innerHTML = `
  <img src="${producto.img}" alt="${producto.nombre}" style="width:100%;">
  <h2>${producto.nombre}</h2>
  <p>Código: ${producto.codigo}</p>
  <p>${producto.descripcion}</p>
  <p>Tipo: ${producto.tipo.charAt(0).toUpperCase() + producto.tipo.slice(1)}</p>
  <p>Tamaño: ${producto.tamano.charAt(0).toUpperCase() + producto.tamano.slice(1)}</p>
  <p>Precio: $${producto.precio}</p>
  <div class="form-group">
    <label>Mensaje personalizado:<input type="text" id="mensaje-personalizado"></label>
  </div>
  <div class="form-group">
    <label>Cantidad:<input type="number" id="cantidad-producto" min="1" value="1" style="width:60px;"></label>
  </div>
  <button class="btn" id="agregar-carrito">Agregar al Carrito</button>
`;
document.getElementById('agregar-carrito').onclick = function() {
  const mensaje = document.getElementById('mensaje-personalizado').value;
  const cantidad = parseInt(document.getElementById('cantidad-producto').value) || 1;
  for (let i = 0; i < cantidad; i++) {
    agregarAlCarrito({
      ...producto,
      mensaje: mensaje
    });
  }
  alert('Producto agregado al carrito' + (cantidad > 1 ? ` (${cantidad} unidades)` : '') + ' con mensaje personalizado.');
  window.location.href = 'catalogo.html';
};