# Interesting People Page - Quick Guide

## 📁 Structure

```
/content/people/
├── photos/              # Profile photos (square PNGs)
│   ├── carl-jung.png
│   ├── alan-turing.png
│   └── ...
├── carl-jung.md
├── alan-turing.md
└── ...
```

## 📝 Adding a New Person

### 1. Create the Markdown file in `/content/people/`

Example: `content/people/elon-musk.md`

```markdown
---
name: Elon Musk
field: Technology & Innovation
photo: content/people/photos/elon-musk.png
wikipedia: https://en.wikipedia.org/wiki/Elon_Musk
---

Brief description of the person and why they're interesting/influential to you.
```

### 2. Add their photo (optional) in `/content/people/photos/`

- Use square images (1:1 aspect ratio works best)
- PNG format recommended
- Will display as a circle (CSS handles this)
- If no photo, shows 👤 emoji placeholder

### 3. Register in `/script.js`

Find the `people` array and add the filename:

```javascript
const people = [
  'carl-jung.md',
  'alan-turing.md',
  'claude-shannon.md',
  'nietzsche.md',
  'dostoevsky.md',
  'kanye-west.md',
  'elon-musk.md'  // Add this
];
```

### 4. Refresh the page!

## 🎨 Frontmatter Fields

- **name**: Person's full name (required)
- **field**: Their area of expertise (required)
- **photo**: Path to photo (optional, defaults to 👤 emoji)
- **wikipedia**: Wikipedia URL (required, opens on click)

## 📊 Grid Layout

- **Desktop (1200px+)**: 6 columns
- **Tablet (768-1199px)**: 4-5 columns (flexible)
- **Mobile (<768px)**: 2-3 columns (flexible)

## 🎯 Current People

1. **Carl Jung** - Psychology
2. **Alan Turing** - Computer Science
3. **Claude Shannon** - Information Theory
4. **Friedrich Nietzsche** - Philosophy
5. **Fyodor Dostoevsky** - Literature
6. **Kanye West** - Music & Design

## 🎨 Features

- ✅ Circular profile photos
- ✅ Name + field displayed
- ✅ Click to open Wikipedia in new tab
- ✅ Hover effects (card lifts, border glows)
- ✅ Responsive grid layout
- ✅ Dark theme matching the blog
- ✅ Placeholder emoji if no photo

## 💡 Tips

- Keep descriptions brief (1-2 sentences)
- Use high-quality square photos
- Field names should be concise (2-3 words max)
- Wikipedia links are preferred, but you can use any URL
- Photos will be displayed as circles automatically

---

**Navigation**: Click "Interesting People" in the sidebar to view the page!
