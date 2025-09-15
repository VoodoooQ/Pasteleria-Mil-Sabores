// Evento de envío del formulario de registro
document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  const nombre = this.nombre.value.trim();
  const correo = this.correo.value.trim();
  const password = this.password.value;
  const direccion = this.direccion.value.trim();
  const fecha = this.fecha.value;
  const codigo = this.codigo.value.trim();
  // Calcular edad del usuario a partir de la fecha de nacimiento
  const nacimiento = new Date(fecha);
  const hoy = new Date();
  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  if (hoy.getMonth() < nacimiento.getMonth() || (hoy.getMonth() === nacimiento.getMonth() && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  // Determinar beneficios según edad, código y correo institucional
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
  // Guardar usuario en array de usuarios en localStorage
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  if (usuarios.some(u => u.correo === correo)) {
    alert('Ya existe un usuario registrado con ese correo.');
    return;
  }
  const usuario = {
    nombre, correo, password, direccion, fecha, edad,
    descuento50, descuento10, tortaGratis,
    beneficios, pedidos: []
  };
  usuarios.push(usuario);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  document.getElementById('beneficios').textContent = 'Beneficios activos: ' + (beneficios.length ? beneficios.join(', ') : 'Ninguno');
  alert('¡Registro exitoso! Beneficios: ' + (beneficios.length ? beneficios.join(', ') : 'Ninguno'));
  location.href = 'inicioSesion.html';
});