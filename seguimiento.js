function mostrarPedidos() {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const pedidos = usuario && usuario.pedidos ? usuario.pedidos : [];
  const lista = document.getElementById('pedidos-lista');
  lista.innerHTML = '';
  if (!pedidos.length) {
    lista.innerHTML = '<p>No tienes pedidos realizados.</p>';
    return;
  }
  pedidos.forEach((pedido, i) => {
    // Formatear fecha de entrega y fecha de pedido a dd/mm/yyyy si no lo están
    let fechaEntrega = pedido.fechaEntrega || '-';
    if (fechaEntrega && fechaEntrega.includes('-')) {
      const f = new Date(fechaEntrega);
      const dia = String(f.getDate()).padStart(2, '0');
      const mes = String(f.getMonth() + 1).padStart(2, '0');
      const anio = String(f.getFullYear());
      fechaEntrega = `${dia}/${mes}/${anio}`;
    }
    let fechaPedido = pedido.fecha;
    if (fechaPedido && fechaPedido.includes('-')) {
      const f = new Date(fechaPedido);
      const dia = String(f.getDate()).padStart(2, '0');
      const mes = String(f.getMonth() + 1).padStart(2, '0');
      const anio = String(f.getFullYear());
      fechaPedido = `${dia}/${mes}/${anio}`;
    }
    lista.innerHTML += `
      <div class="producto" style="border:2px solid #FFC0CB;background:#FFF5E1;margin-bottom:2em;">
        <h3 style="font-family:Pacifico;color:#8B4513;">Pedido #${i+1}</h3>
        <p style="font-family:Lato;color:#5D4037;">Fecha: ${fechaPedido}</p>
        <p style="font-family:Lato;color:#8B4513;">Estado: <span style="color:${pedido.estado==='entregado'?'#8B4513':pedido.estado==='enviado'?'#FFC0CB':'#B0BEC5'};font-weight:bold;">${pedido.estado.charAt(0).toUpperCase()+pedido.estado.slice(1)}</span></p>
        <p style="font-family:Lato;color:#5D4037;">Fecha de entrega: ${fechaEntrega}</p>
        <ul>
          ${pedido.productos.map(p => `<li style='font-family:Lato;color:#5D4037;'>${p.nombre} x${p.cantidad} ${p.mensaje?`(${p.mensaje})`:''}</li>`).join('')}
        </ul>
        <button class="btn" onclick="cambiarEstado(${i})" style="background:#FFC0CB;color:#8B4513;">Avanzar Estado</button>
      </div>
    `;
    // Visual tracking para el pedido actual
    if (i === pedidos.length-1) {
      mostrarTrackingVisual(pedido.estado);
    }
  });
}
function cambiarEstado(index) {
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const pedidos = usuario.pedidos;
  const estados = ['preparación','enviado','entregado'];
  let actual = estados.indexOf(pedidos[index].estado);
  if (actual < estados.length-1) {
    pedidos[index].estado = estados[actual+1];
    localStorage.setItem('usuario', JSON.stringify(usuario));
    mostrarPedidos();
    // Animación visual
    setTimeout(()=>{
      mostrarTrackingVisual(pedidos[index].estado);
    },300);
  }
}
function mostrarTrackingVisual(estadoActual) {
  const visual = document.getElementById('tracking-visual');
  visual.innerHTML = '';
  const estadosVisual = [
    {nombre:'preparación', color:'#B0BEC5', letra:'P'},
    {nombre:'enviado', color:'#FFC0CB', letra:'E'},
    {nombre:'entregado', color:'#8B4513', letra:'T'}
  ];
  estadosVisual.forEach((e, idx) => {
    const circle = document.createElement('div');
    circle.style.width = '48px';
    circle.style.height = '48px';
    circle.style.borderRadius = '50%';
    circle.style.background = e.color;
    circle.style.display = 'flex';
    circle.style.justifyContent = 'center';
    circle.style.alignItems = 'center';
    circle.style.fontFamily = 'Pacifico';
    circle.style.fontSize = '2em';
    circle.style.color = '#FFF5E1';
    circle.textContent = e.letra;
    if (e.nombre === estadoActual) {
      circle.style.border = '4px solid #8B4513';
    }
    visual.appendChild(circle);
  });
}
mostrarPedidos();