// Minimal Markdown blog system

function renderBerserkFont() {
  // Find all strong tags with BERSERK (case-insensitive)
  document.querySelectorAll('#md-root strong').forEach(el => {
    if (/berserk/i.test(el.textContent)) {
      el.classList.add('berserk-font');
    }
  });
}

// History stack for in-page navigation
let mdHistory = [];
let mdHistoryIndex = -1;

function loadMarkdown(path, pushState = true) {
  fetch('/' + path.replace(/^\/?content\//, 'content/'))
    .then(response => response.text())
    .then(text => {
      document.getElementById('md-root').innerHTML = marked.parse(text);
      updateLinks();
      renderBerserkFont();
      if (pushState) {
        window.history.pushState({ mdPath: path }, '', '#' + path.replace(/^content\//, ''));
      }
    });
}

window.addEventListener('popstate', function(e) {
  if (e.state && e.state.mdPath) {
    loadMarkdown(e.state.mdPath, false);
  }
});

function updateLinks() {
  document.querySelectorAll('#md-root a[href$=".md"]').forEach(link => {
    link.onclick = function(e) {
      e.preventDefault();
      loadMarkdown(this.getAttribute('href'));
    };
  });
}

// Keyboard navigation: Alt+Left for back
window.addEventListener('keydown', function(e) {
  if (e.altKey && e.key === 'ArrowLeft') {
    if (mdHistoryIndex > 0) {
      mdHistoryIndex--;
      loadMarkdown(mdHistory[mdHistoryIndex], false);
    }
  }
});

// Initial load
const initialPath = window.location.hash ? 'content/' + window.location.hash.slice(1) : 'content/home.md';
loadMarkdown(initialPath);
window.history.replaceState({ mdPath: initialPath }, '', window.location.hash || '#home.md');
mdHistory.push('content/home.md');
mdHistoryIndex = 0;
