// ============================================
// Actividad 6: Caja de Comentarios - JavaScript
// ============================================

// Referencias al DOM
const commentForm = document.getElementById('comment-form');
const commentAuthor = document.getElementById('comment-author');
const commentText = document.getElementById('comment-text');
const commentsList = document.getElementById('comments-list');
const commentsCount = document.getElementById('comments-count');
const emptyState = document.getElementById('empty-state');

// Array para almacenar los comentarios
let comments = [];

/**
 * Formatea una fecha a un string legible.
 * @param {Date} date - La fecha a formatear
 * @returns {string} Fecha formateada
 */
function formatDate(date) {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  return date.toLocaleDateString('es-MX', options);
}

/**
 * Obtiene las iniciales del nombre del autor.
 * @param {string} name - Nombre del autor
 * @returns {string} Iniciales (máximo 2 caracteres)
 */
function getInitials(name) {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');
}

/**
 * Actualiza el contador de comentarios.
 */
function updateCount() {
  const count = comments.length;
  commentsCount.textContent = `${count} comentario${count !== 1 ? 's' : ''}`;
}

/**
 * Muestra u oculta el estado vacío.
 */
function toggleEmptyState() {
  if (comments.length === 0) {
    emptyState.style.display = 'block';
  } else {
    emptyState.style.display = 'none';
  }
}

/**
 * Crea el elemento HTML para un comentario.
 * @param {object} comment - El objeto del comentario
 * @returns {HTMLElement} El elemento del comentario
 */
function createCommentElement(comment) {
  const card = document.createElement('div');
  card.classList.add('comment-card');
  card.setAttribute('id', `comment-${comment.id}`);

  card.innerHTML = `
    <div class="comment-header">
      <div class="comment-author-info">
        <div class="comment-avatar">${getInitials(comment.author)}</div>
        <div>
          <div class="comment-author">${escapeHTML(comment.author)}</div>
          <div class="comment-date">📅 ${formatDate(comment.date)}</div>
        </div>
      </div>
      <button class="btn-delete" onclick="deleteComment(${comment.id})" title="Eliminar comentario">
        🗑️ Eliminar
      </button>
    </div>
    <div class="comment-body">
      ${escapeHTML(comment.text)}
    </div>
  `;

  return card;
}

/**
 * Escapa caracteres HTML para prevenir XSS.
 * @param {string} text - Texto a escapar
 * @returns {string} Texto escapado
 */
function escapeHTML(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Agrega un nuevo comentario.
 * @param {string} author - Nombre del autor
 * @param {string} text - Texto del comentario
 */
function addComment(author, text) {
  const comment = {
    id: Date.now(),
    author: author.trim(),
    text: text.trim(),
    date: new Date()
  };

  comments.unshift(comment); // Agregar al inicio

  const commentElement = createCommentElement(comment);
  
  // Si es el primer comentario, ocultar el estado vacío
  toggleEmptyState();

  // Insertar el comentario al inicio de la lista
  if (commentsList.firstChild && commentsList.firstChild !== emptyState) {
    commentsList.insertBefore(commentElement, commentsList.firstChild);
  } else {
    commentsList.appendChild(commentElement);
  }

  updateCount();
}

/**
 * Elimina un comentario por su ID.
 * @param {number} id - El ID del comentario a eliminar
 */
function deleteComment(id) {
  // Encontrar y animar la eliminación
  const element = document.getElementById(`comment-${id}`);
  if (element) {
    element.style.transition = 'all 0.3s ease';
    element.style.opacity = '0';
    element.style.transform = 'translateX(-20px)';

    setTimeout(() => {
      element.remove();
      comments = comments.filter(c => c.id !== id);
      updateCount();
      toggleEmptyState();
    }, 300);
  }
}

// --- Event Listeners ---

// Envío del formulario
commentForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const author = commentAuthor.value;
  const text = commentText.value;

  if (author.trim() && text.trim()) {
    addComment(author, text);
    commentText.value = '';
    commentText.focus();
  }
});

// Inicializar
toggleEmptyState();
updateCount();
