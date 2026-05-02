// ================================
// MAIN.JS — Interactividad del Design System
// ================================

// ---- 1. COPIAR COLOR AL HACER CLIC ----
// Cuando el usuario hace clic en un color, copia el valor hex al portapapeles

const coloresValores = document.querySelectorAll('.color-card');
// querySelectorAll busca TODOS los elementos con esa clase en el HTML

coloresValores.forEach(card => {
  // forEach recorre cada card una por una
  card.style.cursor = 'pointer'; // cambia el cursor a manito

  card.addEventListener('click', () => {
    // addEventListener escucha cuando el usuario hace clic
    const valor = card.querySelector('.color-valor').textContent;
    // querySelector busca el elemento hijo con clase .color-valor
    // textContent obtiene el texto que hay dentro

    navigator.clipboard.writeText(valor);
    // copia el texto al portapapeles del computador

    mostrarToast(`Color ${valor} copiado ✓`);
    card.style.transform = 'scale(0.95)';
setTimeout(() => card.style.transform = 'scale(1)', 150);
    // llama a la función que muestra el mensaje flotante
  });
});


// ---- 2. TOAST — Mensaje flotante de confirmación ----
// Un "toast" es ese mensaje que aparece y desaparece solo

function mostrarToast(mensaje) {
  // Primero borramos cualquier toast anterior que exista
  const toastAnterior = document.querySelector('.toast');
  if (toastAnterior) toastAnterior.remove();

  // Creamos el elemento del toast
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = mensaje;

  // Lo agregamos al body de la página
  document.body.appendChild(toast);

  // Después de 2 segundos lo borramos automáticamente
  setTimeout(() => {
    toast.classList.add('toast--saliendo');
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}


// ---- 3. MARCAR LINK ACTIVO EN LA NAVEGACIÓN ----
// Detecta qué sección está visible y resalta el link del nav correspondiente

const secciones = document.querySelectorAll('.seccion');
const linksNav = document.querySelectorAll('.nav__links a');

const observador = new IntersectionObserver(
  // IntersectionObserver detecta cuándo un elemento entra o sale de la pantalla
  (entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        // isIntersecting = true cuando la sección es visible en pantalla

        // Quitamos la clase activo de todos los links
        linksNav.forEach(link => link.classList.remove('activo'));

        // Agregamos la clase activo solo al link que corresponde a esta sección
        const linkActivo = document.querySelector(
          `.nav__links a[href="#${entrada.target.id}"]`
        );
        if (linkActivo) linkActivo.classList.add('activo');
      }
    });
  },
  { threshold: 0.3 }
  // threshold: 0.3 significa que la sección debe estar 30% visible para activarse
);

// Le decimos al observador que vigile cada sección
secciones.forEach(seccion => observador.observe(seccion));


// ---- 4. ANIMACIÓN DE ENTRADA ----
// Los elementos aparecen con una animación suave al hacer scroll

const elementosAnimados = document.querySelectorAll(
  '.color-card, .card, .tipo-item, .input-grupo, .btn'
);

const observadorAnimacion = new IntersectionObserver(
  (entradas) => {
    entradas.forEach(entrada => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add('visible');
        // Una vez que aparece, dejamos de observarlo (mejor rendimiento)
        observadorAnimacion.unobserve(entrada.target);
      }
    });
  },
  { threshold: 0.1 }
);

elementosAnimados.forEach(el => observadorAnimacion.observe(el));

// ---- 5. BOTONES DE CARDS — feedback temporal ----
const botonesCards = document.querySelectorAll('.card .btn');

botonesCards.forEach(boton => {
  boton.addEventListener('click', () => {
    const textoOriginal = boton.textContent;
    boton.textContent = 'Próximamente...';
    boton.disabled = true;

    setTimeout(() => {
      boton.textContent = textoOriginal;
      boton.disabled = false;
    }, 1500);
  });
});