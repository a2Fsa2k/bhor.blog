# Book Library System - Complete Documentation

## Overview
Your blog now has a fully functional book library page with a responsive CSS Grid layout, Markdown-based data, and an Obsidian-inspired dark design.

## 📁 Folder Structure

```
/home/omkarb/ws/blog/
├── content/
│   └── books/              # Book Markdown files
│       ├── covers/         # PNG cover images
│       │   ├── dune.png
│       │   ├── neuromancer.png
│       │   ├── project-hail-mary.png
│       │   └── three-body-problem.png
│       ├── dune.md
│       ├── neuromancer.md
│       ├── project-hail-mary.md
│       └── three-body-problem.md
├── library/
│   ├── index.html          # Library page
│   ├── library.css         # Library-specific styles
│   └── library.js          # Library JavaScript
└── index.html              # Main blog (with library link in sidebar)
```

## 📖 Example Book Markdown File

```markdown
---
title: Dune
author: Frank Herbert
status: completed
cover: content/books/covers/dune.png
rating: 5
year: 1965
---

# Notes on Dune

## Key Themes
- Politics and power structures
- Ecology and environmental adaptation
- Religion as a tool of control

## Favorite Quotes
> "I must not fear. Fear is the mind-killer."

## Rating: 5/5
Must-read for anyone interested in science fiction.
```

### YAML Frontmatter Fields
- `title`: Book title (required)
- `author`: Author name (required)
- `status`: One of: `completed`, `reading`, or `want-to-read` (required)
- `cover`: Path to cover image (optional, shows 📚 emoji if missing)
- `rating`: Number 1-5 (optional, displays as stars)
- `year`: Publication year (optional)

## 🎨 Features

### Grid View
- **Responsive Layout**: 4-5 columns on desktop, auto-adjusts for tablets/mobile
- **Book Cards**: Each card shows:
  - Cover image (2:3 aspect ratio)
  - Book title
  - Author name
  - Status badge (color-coded)
- **Hover Effects**: Cards lift and glow on hover
- **Filter Tabs**: Filter by All, Completed, Reading, Want to Read

### Detail View
- Click any book card to see:
  - Large cover image
  - Full metadata (title, author, year, rating)
  - Complete Markdown notes rendered beautifully
  - Back button to return to grid

### Status Badges
- **Completed**: Green badge
- **Reading**: Purple badge
- **Want to Read**: Orange badge

## 🔗 Navigation

The library is accessible from:
1. **Main blog sidebar**: "📚 Book Library" link at the top
2. **Direct URL**: `/library/index.html`
3. **Back button**: Returns to main blog from library

## 🎨 Design Philosophy

- **Dark Theme**: Matches Obsidian-inspired aesthetic
- **Minimal**: Clean borders, subtle shadows, focused typography
- **Responsive**: Works seamlessly on all screen sizes
- **Fast**: Loads all books in parallel, instant filtering
- **Accessible**: Proper ARIA labels, keyboard navigation

## 🛠️ Technology Stack

- **Plain HTML5**: No frameworks
- **CSS Grid**: Responsive 4-5 column layout
- **Vanilla JavaScript**: No dependencies (except marked.js for Markdown)
- **Marked.js**: Markdown parsing library
- **YAML Frontmatter**: Manual parsing in JavaScript

## 📝 Adding New Books

To add a new book:

1. **Create the Markdown file** in `/content/books/`:
   ```bash
   touch content/books/your-book.md
   ```

2. **Add the cover image** (optional) in `/content/books/covers/`:
   ```bash
   # Add your-book.png to covers/
   ```

3. **Write the frontmatter and notes**:
   ```markdown
   ---
   title: Your Book Title
   author: Author Name
   status: reading
   cover: content/books/covers/your-book.png
   rating: 4
   year: 2024
   ---

   # Your Notes Here
   
   Add your thoughts, quotes, and analysis...
   ```

4. **Register the book** in `/library/library.js`:
   ```javascript
   const books = [
     'dune.md',
     'project-hail-mary.md',
     'three-body-problem.md',
     'neuromancer.md',
     'your-book.md'  // Add this line
   ];
   ```

5. **Refresh the page** - your book will appear automatically!

## 🎯 CSS Grid Configuration

The grid is responsive with these breakpoints:

```css
/* Mobile: Auto-fill with minimum 180px */
.books-grid {
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
}

/* Tablet (768px+): Minimum 200px */
@media (min-width: 768px) {
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

/* Desktop (1200px+): Exactly 5 columns */
@media (min-width: 1200px) {
  grid-template-columns: repeat(5, 1fr);
}
```

## 🎨 Color Palette

```css
/* Backgrounds */
--bg-primary: #1e1e1e;
--bg-secondary: #2d2d2d;
--bg-hover: #333;

/* Borders */
--border-default: #3d3d3d;
--border-accent: #A68AF9;

/* Status Colors */
--status-completed: #2ed573;
--status-reading: #A68AF9;
--status-want-to-read: #ffa502;

/* Text */
--text-primary: #dcddde;
--text-secondary: #999;
```

## 🔑 Key JavaScript Functions

### `parseFrontmatter(text)`
Extracts YAML frontmatter from Markdown files.

### `loadBooks()`
Fetches all book files in parallel and parses them.

### `renderGrid(filter)`
Renders the book grid with optional status filtering.

### `showBookDetail(filename)`
Shows detailed view for a specific book.

## 📱 Responsive Behavior

- **Desktop (1200px+)**: 5-column grid, full sidebar
- **Tablet (768-1199px)**: 3-4 column flexible grid
- **Mobile (<768px)**: 2 column grid, collapsible sidebar

## 🚀 Performance

- **Parallel Loading**: All books load simultaneously
- **No External API**: Pure static files
- **Instant Filtering**: Client-side filtering with no network requests
- **Optimized Images**: CSS aspect-ratio prevents layout shift

## 🎉 Live Preview

Your library is accessible at: http://localhost:8000/library/index.html

## 📦 What's Already Done

✅ Full folder structure with 4 example books
✅ Responsive 4-5 column CSS Grid
✅ Book cards with covers, titles, authors, status badges
✅ Filter tabs (All, Completed, Reading, Want to Read)
✅ Detail view with full notes and metadata
✅ Frontmatter parsing (title, author, status, cover, rating, year)
✅ Loading states and error handling
✅ Obsidian-inspired dark design
✅ Integration with main blog (sidebar link)
✅ Responsive layout for all devices
✅ Smooth animations and hover effects

## 🎨 Customization Ideas

Want to extend the library? Here are some ideas:

1. **Search**: Add a search bar to filter by title/author
2. **Sorting**: Sort by title, author, rating, or date
3. **Tags**: Add genre/category tags to frontmatter
4. **Progress**: Add page number tracking for "reading" books
5. **Covers**: Auto-fetch covers from Open Library API
6. **Export**: Export your reading list to JSON/CSV
7. **Stats**: Show reading statistics (books read per year, etc.)

## 🐛 Troubleshooting

### Books not showing?
- Check that filenames in `library.js` match actual files
- Verify frontmatter format (must start with `---`)
- Check browser console for errors

### Cover images not loading?
- Verify image paths in frontmatter
- Check that PNG files exist in `/content/books/covers/`
- Use browser DevTools to inspect image URLs

### Layout issues?
- Clear browser cache
- Check CSS file is loading (`library.css`)
- Verify viewport meta tag in HTML

---

**Built with ❤️ using plain HTML, CSS Grid, and vanilla JavaScript**
**No frameworks, no build tools, just simple and elegant code**
