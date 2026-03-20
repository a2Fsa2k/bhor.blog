// Obsidian-inspired Markdown blog system

// Available posts
const posts = [
  { name: 'Home', path: 'content/home.md' },
  { name: 'The 11 Lines of Code That Almost Broke the Internet', path: 'content/11-lines-of-code-that-almost-broke-the-internet.md' },
  { name: 'Library', path: 'content/library.md' },
  { name: 'Interesting People', path: 'content/people.md' }
  // Removed demo posts
];

// Open tabs
let openTabs = [];
let activeTab = null;

// Observer flags to prevent infinite loops
let libraryObserverActive = false;
let peopleObserverActive = false;

// Initialize sidebar
function initSidebar() {
  const nav = document.getElementById('sidebar-nav');
  posts.forEach(post => {
    const item = document.createElement('div');
    item.className = 'sidebar-item';
    item.textContent = post.name;
    item.onclick = () => openPost(post.path, post.name);
    item.dataset.path = post.path;
    nav.appendChild(item);
  });
}

// Sidebar toggle
document.getElementById('sidebar-toggle').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('collapsed');
});

// Sidebar toggle from main area (when collapsed)
document.getElementById('sidebar-toggle-main').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('collapsed');
});

// Open a post (add to tabs and load content)
function openPost(path, name) {
  // Add to tabs if not already open
  if (!openTabs.find(tab => tab.path === path)) {
    openTabs.push({ path, name });
    renderTabs();
  }
  
  // Set as active and load
  activeTab = path;
  loadMarkdown(path);
  updateSidebarActive(path);
  updateTabActive(path);
}

// Render tabs
function renderTabs() {
  const tabBar = document.getElementById('tab-bar');
  const toggleBtn = document.getElementById('sidebar-toggle-main');
  
  // Clear only tabs, keep the toggle button
  const tabs = tabBar.querySelectorAll('.tab');
  tabs.forEach(tab => tab.remove());
  
  openTabs.forEach(tab => {
    const tabEl = document.createElement('button');
    tabEl.className = 'tab';
    if (tab.path === activeTab) tabEl.classList.add('active');
    
    const tabName = document.createElement('span');
    tabName.textContent = tab.name;
    
    // Only show close button if it's not the home tab or if there are other tabs open
    const isHomeTab = tab.path === 'content/home.md';
    const canClose = !isHomeTab || openTabs.length > 1;
    
    if (canClose) {
      const closeBtn = document.createElement('span');
      closeBtn.className = 'tab-close';
      closeBtn.innerHTML = '×';
      closeBtn.onclick = (e) => {
        e.stopPropagation();
        closeTab(tab.path);
      };
      tabEl.appendChild(tabName);
      tabEl.appendChild(closeBtn);
    } else {
      tabEl.appendChild(tabName);
    }
    
    tabEl.onclick = () => {
      activeTab = tab.path;
      loadMarkdown(tab.path);
      updateTabActive(tab.path);
      updateSidebarActive(tab.path);
    };
    
    tabBar.appendChild(tabEl);
  });
}

// Close a tab
function closeTab(path) {
  // Prevent closing home tab if it's the only tab
  if (path === 'content/home.md' && openTabs.length === 1) {
    return;
  }
  
  openTabs = openTabs.filter(tab => tab.path !== path);
  
  if (activeTab === path) {
    // Switch to another tab if available
    if (openTabs.length > 0) {
      const newTab = openTabs[openTabs.length - 1];
      activeTab = newTab.path;
      loadMarkdown(newTab.path);
      updateSidebarActive(newTab.path);
    } else {
      // If somehow no tabs left, open home
      openPost('content/home.md', 'Home');
      return;
    }
  }
  
  renderTabs();
}

// Update active tab styling
function updateTabActive(path) {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.classList.remove('active');
  });
  const activeTabEl = Array.from(document.querySelectorAll('.tab')).find((el, i) => {
    return openTabs[i]?.path === path;
  });
  if (activeTabEl) activeTabEl.classList.add('active');
}

// Update active sidebar item
function updateSidebarActive(path) {
  document.querySelectorAll('.sidebar-item').forEach(item => {
    item.classList.remove('active');
    if (item.dataset.path === path) {
      item.classList.add('active');
    }
  });
}

// Load Markdown content
function loadMarkdown(path, pushState = true) {
  // Reset observer flags when loading new content
  // This allows grids to reload when revisiting the page
  if (path !== 'content/library.md') {
    libraryObserverActive = false;
  }
  if (path !== 'content/people.md') {
    peopleObserverActive = false;
  }
  
  fetch('/' + path.replace(/^\/?content\//, 'content/'))
    .then(response => response.text())
    .then(text => {
      // Parse frontmatter
      let banner = null;
      let content = text;
      
      if (text.startsWith('---')) {
        const endOfFrontmatter = text.indexOf('---', 3);
        if (endOfFrontmatter !== -1) {
          const frontmatter = text.substring(3, endOfFrontmatter).trim();
          content = text.substring(endOfFrontmatter + 3).trim();
          
          // Extract banner URL
          const bannerMatch = frontmatter.match(/banner:\s*(.+)/);
          if (bannerMatch) {
            banner = bannerMatch[1].trim();
          }
        }
      }
      
      // Render markdown
      let html = marked.parse(content);
      
      // Add banner if it exists
      if (banner) {
        html = `<img src="${banner}" alt="Banner" class="banner-image">` + html;
      }
      
      document.getElementById('md-root').innerHTML = html;
      updateBreadcrumb(path);
      updateLinks();
      if (pushState) {
        window.history.pushState({ mdPath: path }, '', '#' + path.replace(/^content\//, ''));
      }
    });
}

// Update breadcrumb
function updateBreadcrumb(path) {
  const breadcrumb = document.getElementById('breadcrumb');
  const pathParts = path.replace('content/', '').replace('.md', '').split('/');
  breadcrumb.innerHTML = pathParts.map((part, i) => {
    const isLast = i === pathParts.length - 1;
    return `<span style="color: ${isLast ? '#dcddde' : '#999'}">${part}</span>`;
  }).join('<span style="color: #666"> / </span>');
}

// Update markdown links to open in-app
function updateLinks() {
  document.querySelectorAll('#md-root a[href$=".md"]').forEach(link => {
    link.onclick = function(e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      const postName = posts.find(p => p.path === href)?.name || href.replace('content/', '').replace('.md', '');
      openPost(href, postName);
    };
  });
}

// Browser back/forward
window.addEventListener('popstate', function(e) {
  if (e.state && e.state.mdPath) {
    const post = posts.find(p => p.path === e.state.mdPath);
    if (post) {
      openPost(post.path, post.name);
    }
  }
});

// Keyboard shortcuts
window.addEventListener('keydown', function(e) {
  // Ctrl+W to close active tab (except home if it's the only tab)
  if (e.ctrlKey && e.key === 'w') {
    e.preventDefault();
    if (activeTab && !(activeTab === 'content/home.md' && openTabs.length === 1)) {
      closeTab(activeTab);
    }
  }
});

// Initialize
initSidebar();
const initialPath = window.location.hash ? 'content/' + window.location.hash.slice(1) : 'content/home.md';
const initialPost = posts.find(p => p.path === initialPath) || posts[0];
openPost(initialPost.path, initialPost.name);
window.history.replaceState({ mdPath: initialPost.path }, '', '#' + initialPost.path.replace('content/', ''));


// ===== LIBRARY FUNCTIONALITY =====

const BOOKS_PATH = 'content/books/';
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
  if (!grid) return; // Not on library page
  
  grid.innerHTML = '<div class="loading">Loading books...</div>';

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
    initializeLibraryFilters();
  } catch (error) {
    console.error('Error loading books:', error);
    grid.innerHTML = '<div class="loading">Error loading books</div>';
  }
}

// Render books grid
function renderGrid(filter = 'all') {
  const grid = document.getElementById('books-grid');
  if (!grid) return;
  
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
        `<img src="${book.cover}" alt="${book.title}" class="book-cover" onerror="this.outerHTML='<div class=\\'book-cover placeholder\\'>📚</div>'">` :
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
  const filters = document.getElementById('library-filters');

  // Hide grid and filters, show detail
  grid.style.display = 'none';
  if (filters) filters.style.display = 'none';
  detail.style.display = 'block';

  // Render detail view
  detailContent.innerHTML = `
    <div class="book-detail-header">
      <div class="book-detail-cover">
        ${book.cover ? 
          `<img src="${book.cover}" alt="${book.title}" onerror="this.outerHTML='<div class=\\'book-cover placeholder\\' style=\\'width:100%;height:375px;\\'>📚</div>'">` :
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
  document.getElementById('md-root').scrollTo(0, 0);
}

// Initialize library filter buttons
function initializeLibraryFilters() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const backButton = document.getElementById('back-to-grid');
  
  // Filter tabs
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentFilter = tab.dataset.filter;
      renderGrid(currentFilter);
    });
  });
  
  // Back button
  if (backButton) {
    backButton.addEventListener('click', () => {
      const grid = document.getElementById('books-grid');
      const detail = document.getElementById('book-detail');
      const filters = document.getElementById('library-filters');
      
      grid.style.display = 'grid';
      if (filters) filters.style.display = 'flex';
      detail.style.display = 'none';
    });
  }
}

// Check if we're on the library page and load books
const observer = new MutationObserver(() => {
  if (!libraryObserverActive && document.getElementById('books-grid')) {
    libraryObserverActive = true;
    loadBooks();
  }
});

observer.observe(document.getElementById('md-root'), { childList: true, subtree: true });


// ===== PEOPLE FUNCTIONALITY =====

const PEOPLE_PATH = 'content/people/';
const people = [
  'carl-jung.md',
  'alan-turing.md',
  'claude-shannon.md',
  'nietzsche.md',
  'dostoevsky.md',
  'kanye-west.md'
];

let allPeople = [];

// Parse frontmatter from markdown (reuse from library)
function parsePeopleFrontmatter(text) {
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

// Load all people
async function loadPeople() {
  const container = document.getElementById('people-grid-container');
  if (!container) return;
  
  container.innerHTML = '<div class="loading">Loading people</div>';

  try {
    const peoplePromises = people.map(async (filename) => {
      const response = await fetch(PEOPLE_PATH + filename);
      const text = await response.text();
      const { frontmatter, content } = parsePeopleFrontmatter(text);
      return {
        filename,
        ...frontmatter,
        content
      };
    });

    allPeople = await Promise.all(peoplePromises);
    renderPeopleGrid();
  } catch (error) {
    console.error('Error loading people:', error);
    container.innerHTML = '<div class="loading">Error loading people</div>';
  }
}

// Render people grid
function renderPeopleGrid() {
  const container = document.getElementById('people-grid-container');
  if (!container) return;

  if (allPeople.length === 0) {
    container.innerHTML = '<div class="loading">No people found</div>';
    return;
  }

  container.innerHTML = `
    <div class="people-grid">
      ${allPeople.map(person => `
        <a href="${person.wikipedia}" target="_blank" class="person-card">
          ${person.photo ? 
            `<img src="${person.photo}" alt="${person.name}" class="person-photo" onerror="this.outerHTML='<div class=\\'person-photo placeholder\\'>👤</div>'">` :
            `<div class="person-photo placeholder">👤</div>`
          }
          <div class="person-name">${person.name}</div>
          <div class="person-field">${person.field}</div>
        </a>
      `).join('')}
    </div>
  `;
}

// Check if we're on the people page and load people
const peopleObserver = new MutationObserver(() => {
  if (!peopleObserverActive && document.getElementById('people-grid-container')) {
    peopleObserverActive = true;
    loadPeople();
  }
});

peopleObserver.observe(document.getElementById('md-root'), { childList: true, subtree: true });

