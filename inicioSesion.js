// Evento de envío del formulario de inicio de sesión
document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  const correo = this.correo.value.trim();
  const password = this.password.value;
  // Obtener usuarios registrados desde localStorage
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  // Buscar usuario por correo y contraseña
  const usuario = usuarios.find(u => u.correo === correo && u.password === password);
  if (!usuario) {
    alert('Usuario o contraseña incorrectos.');
    return;
  }
  localStorage.setItem('usuario', JSON.stringify(usuario));
  alert('¡Inicio de sesión exitoso!');
  location.href = 'perfil.html';
});