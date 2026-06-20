// ============================================
// Actividad 8: Seguimiento de Libros - JavaScript
// ============================================

// --- State ---
let books = [];
let currentBookId = null;

// --- DOM References ---
const bookForm = document.getElementById('book-form');
const bookTitle = document.getElementById('book-title');
const bookAuthor = document.getElementById('book-author');
const bookYear = document.getElementById('book-year');
const bookStatus = document.getElementById('book-status');
const booksList = document.getElementById('books-list');
const emptyBooks = document.getElementById('empty-books');
const totalBooksEl = document.getElementById('total-books');
const totalCommentsEl = document.getElementById('total-comments');

// Modal
const modalOverlay = document.getElementById('modal-overlay');
const modalBookTitle = document.getElementById('modal-book-title');
const btnCloseModal = document.getElementById('btn-close-modal');
const commentForm = document.getElementById('comment-form');
const commentText = document.getElementById('comment-text');
const modalComments = document.getElementById('modal-comments');
const emptyComments = document.getElementById('empty-comments');

// --- Helpers ---
function escapeHTML(text) {
  const d = document.createElement('div');
  d.textContent = text;
  return d.innerHTML;
}

function formatDate(date) {
  return date.toLocaleDateString('es-MX', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true
  });
}

function getStatusInfo(status) {
  const map = {
    leido: { label: '📗 Leído', class: 'badge-leido' },
    leyendo: { label: '📖 Leyendo', class: 'badge-leyendo' },
    pendiente: { label: '📕 Pendiente', class: 'badge-pendiente' }
  };
  return map[status] || map.pendiente;
}

function updateStats() {
  totalBooksEl.textContent = books.length;
  const total = books.reduce((sum, b) => sum + b.comments.length, 0);
  totalCommentsEl.textContent = total;
}

function toggleEmptyBooks() {
  emptyBooks.style.display = books.length === 0 ? 'block' : 'none';
}

// --- Book CRUD ---
function addBook(title, author, year, status) {
  const book = {
    id: Date.now(),
    title: title.trim(),
    author: author.trim(),
    year: year ? parseInt(year) : null,
    status,
    comments: [],
    createdAt: new Date()
  };
  books.push(book);
  renderBook(book);
  toggleEmptyBooks();
  updateStats();
}

function deleteBook(id) {
  const el = document.getElementById(`book-${id}`);
  if (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateX(-20px)';
    setTimeout(() => {
      el.remove();
      books = books.filter(b => b.id !== id);
      toggleEmptyBooks();
      updateStats();
    }, 300);
  }
}

function renderBook(book) {
  const statusInfo = getStatusInfo(book.status);
  const card = document.createElement('div');
  card.className = 'book-card';
  card.id = `book-${book.id}`;

  const yearBadge = book.year
    ? `<span class="badge badge-year">📅 ${book.year}</span>`
    : '';

  const commentCount = book.comments.length;
  const countBadge = commentCount > 0
    ? `<span class="comment-count-badge">${commentCount}</span>`
    : '';

  card.innerHTML = `
    <div class="book-info">
      <div class="book-title">${escapeHTML(book.title)}</div>
      <div class="book-author">por ${escapeHTML(book.author)}</div>
      <div class="book-meta">
        <span class="badge ${statusInfo.class}">${statusInfo.label}</span>
        ${yearBadge}
      </div>
    </div>
    <div class="book-actions">
      <button class="btn-icon-action comment-btn" onclick="openComments(${book.id})" title="Comentarios">
        💬${countBadge}
      </button>
      <button class="btn-icon-action delete" onclick="deleteBook(${book.id})" title="Eliminar">
        🗑️
      </button>
    </div>
  `;
  booksList.appendChild(card);
}

// --- Comments ---
function openComments(bookId) {
  currentBookId = bookId;
  const book = books.find(b => b.id === bookId);
  if (!book) return;

  modalBookTitle.textContent = `💬 ${book.title}`;
  renderComments(book);
  modalOverlay.classList.add('active');
  commentText.focus();
}

function closeModal() {
  modalOverlay.classList.remove('active');
  currentBookId = null;
  commentText.value = '';
}

function addComment(bookId, text) {
  const book = books.find(b => b.id === bookId);
  if (!book) return;

  const comment = {
    id: Date.now(),
    text: text.trim(),
    date: new Date()
  };
  book.comments.unshift(comment);
  renderComments(book);
  updateStats();
  updateBookCard(book);
}

function deleteComment(bookId, commentId) {
  const book = books.find(b => b.id === bookId);
  if (!book) return;
  book.comments = book.comments.filter(c => c.id !== commentId);
  renderComments(book);
  updateStats();
  updateBookCard(book);
}

function renderComments(book) {
  modalComments.innerHTML = '';
  if (book.comments.length === 0) {
    modalComments.innerHTML = '<div class="empty-state small"><p>No hay comentarios aún</p></div>';
    return;
  }
  book.comments.forEach(c => {
    const el = document.createElement('div');
    el.className = 'comment-item';
    el.innerHTML = `
      <div class="comment-item-header">
        <span class="comment-date">📅 ${formatDate(c.date)}</span>
        <button class="btn-delete-comment" onclick="deleteComment(${book.id}, ${c.id})">🗑️</button>
      </div>
      <div class="comment-item-text">${escapeHTML(c.text)}</div>
    `;
    modalComments.appendChild(el);
  });
}

function updateBookCard(book) {
  const card = document.getElementById(`book-${book.id}`);
  if (!card) return;
  const btn = card.querySelector('.comment-btn');
  if (btn) {
    const count = book.comments.length;
    const badge = count > 0 ? `<span class="comment-count-badge">${count}</span>` : '';
    btn.innerHTML = `💬${badge}`;
  }
}

// --- Events ---
bookForm.addEventListener('submit', e => {
  e.preventDefault();
  const t = bookTitle.value;
  const a = bookAuthor.value;
  const y = bookYear.value;
  const s = bookStatus.value;
  if (t.trim() && a.trim()) {
    addBook(t, a, y, s);
    bookForm.reset();
    bookTitle.focus();
  }
});

commentForm.addEventListener('submit', e => {
  e.preventDefault();
  const text = commentText.value;
  if (text.trim() && currentBookId) {
    addComment(currentBookId, text);
    commentText.value = '';
    commentText.focus();
  }
});

btnCloseModal.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', e => {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// Init
toggleEmptyBooks();
updateStats();
