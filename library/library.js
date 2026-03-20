// Book Library JavaScript

const BOOKS_PATH = '../content/books/';
const books = [
  'dune.md',
  'project-hail-mary.md',
  'three-body-problem.md',
  'neuromancer.md'
];

let allBooks = [];
let currentFilter = 'all';

// Parse frontmatter from markdown
function parseFrontmatter(text) {
  if (!text.startsWith('---')) {
    return { frontmatter: {}, content: text };
  }

  const endOfFrontmatter = text.indexOf('---', 3);
  if (endOfFrontmatter === -1) {
    return { frontmatter: {}, content: text };
  }

  const frontmatterText = text.substring(3, endOfFrontmatter).trim();
  const content = text.substring(endOfFrontmatter + 3).trim();

  const frontmatter = {};
  frontmatterText.split('\n').forEach(line => {
    const match = line.match(/^(\w+):\s*(.+)$/);
    if (match) {
      frontmatter[match[1]] = match[2].trim();
    }
  });

  return { frontmatter, content };
}

// Load all books
async function loadBooks() {
  const grid = document.getElementById('books-grid');
  grid.innerHTML = '<div class="loading">Loading books</div>';

  try {
    const bookPromises = books.map(async (filename) => {
      const response = await fetch(BOOKS_PATH + filename);
      const text = await response.text();
      const { frontmatter, content } = parseFrontmatter(text);
      return {
        filename,
        ...frontmatter,
        content
      };
    });

    allBooks = await Promise.all(bookPromises);
    renderGrid();
  } catch (error) {
    console.error('Error loading books:', error);
    grid.innerHTML = '<div class="loading">Error loading books</div>';
  }
}

// Render books grid
function renderGrid(filter = 'all') {
  const grid = document.getElementById('books-grid');
  
  let booksToShow = allBooks;
  if (filter !== 'all') {
    booksToShow = allBooks.filter(book => book.status === filter);
  }

  if (booksToShow.length === 0) {
    grid.innerHTML = '<div class="loading">No books found</div>';
    return;
  }

  grid.innerHTML = booksToShow.map(book => `
    <div class="book-card" onclick="showBookDetail('${book.filename}')">
      ${book.cover ? 
        `<img src="../${book.cover}" alt="${book.title}" class="book-cover" onerror="this.outerHTML='<div class=\\'book-cover placeholder\\'>📚</div>'">` :
        `<div class="book-cover placeholder">📚</div>`
      }
      <div class="book-info">
        <div class="book-title">${book.title}</div>
        <div class="book-author">${book.author}</div>
        <span class="book-status ${book.status}">${book.status.replace('-', ' ')}</span>
      </div>
    </div>
  `).join('');
}

// Show book detail
function showBookDetail(filename) {
  const book = allBooks.find(b => b.filename === filename);
  if (!book) return;

  const grid = document.getElementById('books-grid');
  const detail = document.getElementById('book-detail');
  const detailContent = document.getElementById('book-detail-content');

  // Hide grid, show detail
  grid.style.display = 'none';
  document.querySelector('.filter-tabs').style.display = 'none';
  detail.style.display = 'block';

  // Render detail view
  detailContent.innerHTML = `
    <div class="book-detail-header">
      <div class="book-detail-cover">
        ${book.cover ? 
          `<img src="../${book.cover}" alt="${book.title}" onerror="this.outerHTML='<div class=\\'book-cover placeholder\\' style=\\'width:100%;height:375px;\\'>📚</div>'">` :
          `<div class="book-cover placeholder" style="width:100%;height:375px;">📚</div>`
        }
      </div>
      <div class="book-detail-meta">
        <h1 class="book-detail-title">${book.title}</h1>
        <div class="book-detail-author">by ${book.author}</div>
        <span class="book-status ${book.status}">${book.status.replace('-', ' ')}</span>
        <div style="margin-top: 1.5rem;">
          ${book.year ? `<div class="book-meta-item"><span class="book-meta-label">Year:</span><span class="book-meta-value">${book.year}</span></div>` : ''}
          ${book.rating ? `<div class="book-meta-item"><span class="book-meta-label">Rating:</span><span class="book-meta-value">${'⭐'.repeat(parseInt(book.rating))}</span></div>` : ''}
        </div>
      </div>
    </div>
    <div class="book-detail-notes">
      ${marked.parse(book.content)}
    </div>
  `;

  // Scroll to top
  document.getElementById('library-content').scrollTo(0, 0);
}

// Back to grid
document.getElementById('back-to-grid').addEventListener('click', () => {
  document.getElementById('books-grid').style.display = 'grid';
  document.querySelector('.filter-tabs').style.display = 'flex';
  document.getElementById('book-detail').style.display = 'none';
});

// Filter tabs
document.querySelectorAll('.filter-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentFilter = tab.dataset.filter;
    renderGrid(currentFilter);
  });
});

// Sidebar toggle functionality
document.getElementById('sidebar-toggle').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('collapsed');
});

document.getElementById('sidebar-toggle-main').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('collapsed');
});

// Initialize
loadBooks();
