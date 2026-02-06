// Obsidian-inspired Markdown blog system

// Available posts
const posts = [
  { name: 'Home', path: 'content/home.md' },
  { name: 'Building in Public', path: 'content/post1.md' },
  { name: 'Minimalist Design', path: 'content/post2.md' },
  { name: 'BERSERK manga', path: 'content/berserk.md' },
  { name: 'Gargantua: The Black Hole', path: 'content/gargantua.md' }
];

// Open tabs
let openTabs = [];
let activeTab = null;

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
  fetch('/' + path.replace(/^\/?content\//, 'content/'))
    .then(response => response.text())
    .then(text => {
      document.getElementById('md-root').innerHTML = marked.parse(text);
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

