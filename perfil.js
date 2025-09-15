document.getElementById('cerrar-sesion').onclick = function() {
  if (!localStorage.getItem('usuario')) {
    alert('No hay sesión activa.');
    return;
  }
  localStorage.removeItem('usuario');
  alert('Sesión cerrada correctamente.');
  location.href = 'inicio.html';
};
// Cargar datos del usuario
function mostrarPerfil() {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  if (!usuario) {
    alert('No hay sesión activa. Por favor inicia sesión.');
    window.location.href = 'inicioSesion.html';
    return;
  }
  const form = document.getElementById('perfil-form');
  form.nombre.value = usuario.nombre || '';
  form.correo.value = usuario.correo || '';
  form.direccion.value = usuario.direccion || '';
  form.fecha.value = usuario.fecha || '';
  form.codigo.value = usuario.codigo || '';
  form.password.value = usuario.password || '';
  document.getElementById('beneficios').textContent = 'Beneficios activos: ' + (usuario.beneficios && usuario.beneficios.length ? usuario.beneficios.join(', ') : 'Ninguno');
}
mostrarPerfil();
document.getElementById('perfil-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const nombre = this.nombre.value.trim();
  const correo = this.correo.value.trim();
  const direccion = this.direccion.value.trim();
  const fecha = this.fecha.value;
  const codigo = this.codigo.value.trim();
  const password = this.password.value;
  // Calcular edad
  const nacimiento = new Date(fecha);
  const hoy = new Date();
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  if (hoy.getMonth() < nacimiento.getMonth() || (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  // Beneficios
  let descuento50 = false;
  let descuento10 = false;
  let tortaGratis = false;
  let beneficios = [];
  if (edad >= 50) {
    descuento50 = true;
    beneficios.push('50% de descuento por edad');
  }
  if (codigo.toUpperCase() === 'FELICES50') {
    descuento10 = true;
    beneficios.push('10% de descuento por código FELICES50');
  }
  if (correo.endsWith('@duocuc.cl')) {
    tortaGratis = true;
    beneficios.push('Torta gratis el día de tu cumpleaños');
  }
  // Guardar usuario actualizado y sincronizar con array de usuarios
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  let usuarioAnt = JSON.parse(localStorage.getItem('usuario'));
  const usuario = {
    nombre, correo, direccion, fecha, codigo, password, edad,
    descuento50, descuento10, tortaGratis,
    beneficios, pedidos: usuarioAnt && usuarioAnt.pedidos ? usuarioAnt.pedidos : []
  };
  // Actualizar usuario en array de usuarios
  const idx = usuarios.findIndex(u => u.correo === usuarioAnt.correo);
  if (idx !== -1) {
    usuarios[idx] = usuario;
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }
  localStorage.setItem('usuario', JSON.stringify(usuario));
  document.getElementById('beneficios').textContent = 'Beneficios activos: ' + (beneficios.length ? beneficios.join(', ') : 'Ninguno');
  alert('¡Perfil actualizado! Beneficios: ' + (beneficios.length ? beneficios.join(', ') : 'Ninguno'));
});