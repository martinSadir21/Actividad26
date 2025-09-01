// Aquí realizamos un la consulta de la promesa, esperando su respuesta asíncrona
function pedirUsuario() {
  return fetch('https://randomuser.me/api/')
    .then(response => response.json())
    .then(data => {
      //manipulamos la respuesta
      console.log(data);
      const usuario = data.results && data.results[0] ? data.results[0] : null;
      if (usuario) renderizarDatosUsuario(usuario);
    })
    .catch(err => {
      console.error('Error al pedir el usuario:', err);
      // Mensaje simple de error en pantalla
      const tarjeta = document.querySelector('.tarjeta');
      if (tarjeta) {
        tarjeta.innerHTML = `<p>No se pudo cargar el usuario. Intente nuevamente.</p>`;
      }
    });
}

// Llamado inicial para traer un usuario al cargar la página
pedirUsuario();

function renderizarDatosUsuario(datos) {
  /* -------------------------------- CONSIGNA 1 -------------------------------- */
  // Aquí deben desarrollar una función que muestre en pantalla:
  // la foto, el nombre completo del usuario y su email.
  // Esto debe estar basado en la info que nos llega desde la API e insertarse en el HTML.

  const tarjeta = document.querySelector('.tarjeta');
  if (!tarjeta) return;

  // Toma de datos básicos desde la respuesta
  const foto = datos?.picture?.large || '';
  const nombreCompleto = `${datos?.name?.title ?? ''} ${datos?.name?.first ?? ''} ${datos?.name?.last ?? ''}`.trim();
  const email = datos?.email ?? '';

  // Inserción en el HTML (reemplaza el contenido de la tarjeta)
  tarjeta.innerHTML = `
    <img src="${foto}" alt="Foto de ${nombreCompleto}" />
    <h2>${nombreCompleto}</h2>
    <p>${email}</p>
  `;
}

/* --------------------------- CONSIGNA 2 (extra) --------------------------- */
// Aqui pueden ir por el punto extra de utilizar el boton que se encuentra comentado en el HTML
// Pueden descomentar el código del index.html y usar ese boton para ejecutar un nuevo pedido a la API, sin necesidad de recargar la página.
// Es criterio del equipo QUÉ bloque del código debe contenerse dentro de una función para poder ser ejecutada cada vez que se escuche un click.

// Si el botón existe (descomentado en el HTML), se asocia al pedido de un nuevo usuario
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('#random');
  if (btn) {
    btn.addEventListener('click', () => {
      // Limpieza visual opcional antes de pedir otro usuario
      const tarjeta = document.querySelector('.tarjeta');
      if (tarjeta) tarjeta.innerHTML = '<p>Cargando...</p>';
      pedirUsuario();
    });
  }
});
