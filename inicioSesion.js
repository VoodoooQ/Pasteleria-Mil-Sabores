document.querySelector('form').addEventListener('submit', function(e) {
  e.preventDefault();
  const correo = this.correo.value.trim();
  const password = this.password.value;
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const usuario = usuarios.find(u => u.correo === correo && u.password === password);
  if (!usuario) {
    alert('Usuario o contraseña incorrectos.');
    return;
  }
  localStorage.setItem('usuario', JSON.stringify(usuario));
  alert('¡Inicio de sesión exitoso!');
  location.href = 'perfil.html';
});