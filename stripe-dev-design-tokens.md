# Stripe.dev Design Tokens - Complete Design System

**Extracted:** January 19, 2026  
**Source:** https://stripe.dev  
**Purpose:** Pixel-perfect replication reference

---

## 🎨 COLORS

### Base Colors
```css
--background: #F6F4F9;           /* Main background - light purple-gray */
--text-primary: #1E1E1E;         /* Primary text - near black */
--text-secondary: #6B6B6B;       /* Secondary text - medium gray */
--text-muted: #999999;           /* Muted text - light gray */
```

### Accent Colors
```css
--accent-teal: #00D4AA;          /* Selection/active state - turquoise/teal */
--accent-blue: #635BFF;          /* Stripe brand blue (if used) */
```

### Badge Colors
```css
--badge-blog-bg: #FFFFFF;        /* Blog badge background */
--badge-blog-text: #1E1E1E;      /* Blog badge text */
--badge-blog-border: #E0E0E0;    /* Blog badge border */

--badge-video-bg: #1E1E1E;       /* Video badge background */
--badge-video-text: #FFFFFF;     /* Video badge text */
```

### UI Elements
```css
--border-default: #E0E0E0;       /* Default borders */
--border-active: #00D4AA;        /* Active/selected border */
--button-border: #1E1E1E;        /* Button borders */
```

### Navigation (with transparency)
```css
--nav-bg: rgba(246, 244, 249, 0.8);  /* Nav background with alpha */
--nav-backdrop: blur(10px);           /* Backdrop filter for frosted glass */
```

---

## 📝 TYPOGRAPHY

### Font Families
```css
/* Primary font - body, headings, UI */
--font-sans: 'sohne-var', 'Helvetica Neue', Arial, sans-serif;

/* Monospace font - navigation, code, console */
--font-mono: 'sohne-mono', 'Courier New', monospace;

/* Fallback stack (if Sohne not available, use Inter) */
--font-sans-fallback: 'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif;
```

### Font Sizes
```css
/* Hero/Display */
--font-size-hero: 96px;          /* "Welcome to Stripe Dot" */
--font-size-display: 72px;       /* Article page titles */

/* Headings */
--font-size-h1: 48px;            /* Main section headings like "Feed" */
--font-size-h2: 32px;            /* Article subheadings */
--font-size-h3: 24px;            /* Feed item titles */
--font-size-h4: 20px;            /* Subsection titles */

/* Body */
--font-size-base: 18px;          /* Body text, descriptions */
--font-size-medium: 16px;        /* Smaller body text */
--font-size-small: 14px;         /* Metadata, dates, labels */
--font-size-tiny: 12px;          /* Badges, tags, fine print */

/* Monospace (navigation) */
--font-size-nav: 14px;           /* Navigation items */
```

### Font Weights
```css
--font-weight-normal: 400;       /* Regular body text */
--font-weight-medium: 500;       /* Slightly emphasized */
--font-weight-semibold: 600;     /* Headings, buttons */
--font-weight-bold: 700;         /* Strong emphasis */
```

### Line Heights
```css
--line-height-tight: 1.1;        /* Hero, large headings */
--line-height-snug: 1.25;        /* Headings */
--line-height-normal: 1.5;       /* Body text */
--line-height-relaxed: 1.75;     /* Comfortable reading */
```

### Letter Spacing
```css
--letter-spacing-tight: -0.02em; /* Large headings */
--letter-spacing-normal: 0;      /* Body text */
--letter-spacing-wide: 0.05em;   /* Navigation, labels */
```

---

## 📏 SPACING

### Base Scale (8px system)
```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
--space-32: 128px;
```

### Component Spacing
```css
/* Navigation */
--nav-height: 64px;
--nav-padding-x: 32px;
--nav-padding-y: 16px;

/* Feed Items */
--feed-item-padding: 24px;
--feed-item-gap: 16px;
--feed-expanded-padding: 32px;

/* Article Layout */
--article-sidebar-width: 280px;
--article-content-gap: 64px;
--article-content-padding: 48px;

/* Buttons */
--button-padding-x: 24px;
--button-padding-y: 12px;

/* Badges */
--badge-padding-x: 12px;
--badge-padding-y: 4px;
```

### Layout Widths
```css
--container-max: 1440px;         /* Maximum content width */
--content-max: 1200px;           /* Article content max width */
--feed-max: 1000px;              /* Feed section max width */
```

---

## 🔲 BORDERS & RADIUS

### Border Widths
```css
--border-thin: 1px;
--border-medium: 2px;
--border-thick: 3px;
```

### Border Radius
```css
--radius-none: 0;
--radius-sm: 4px;                /* Badges */
--radius-md: 8px;                /* Buttons, inputs */
--radius-lg: 12px;               /* Cards, panels */
--radius-xl: 16px;               /* Large cards */
--radius-full: 9999px;           /* Pills, circular */
```

---

## 🎭 SHADOWS & EFFECTS

### Box Shadows
```css
/* None visible on stripe.dev - very flat design */
--shadow-none: none;
```

### Backdrop Effects
```css
--backdrop-blur: blur(10px);     /* Navigation bar */
```

---

## 🎬 ANIMATIONS & TRANSITIONS

### Transition Durations
```css
--transition-fast: 150ms;
--transition-base: 200ms;
--transition-slow: 300ms;
--transition-slower: 500ms;
```

### Transition Timings
```css
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
```

### Common Transitions
```css
--transition-colors: color 200ms ease-in-out, background-color 200ms ease-in-out, border-color 200ms ease-in-out;
--transition-transform: transform 200ms ease-in-out;
--transition-all: all 200ms ease-in-out;
```

---

## 🎯 COMPONENT STYLES

### Navigation Bar
```css
.navigation {
  height: var(--nav-height);
  background: var(--nav-bg);
  backdrop-filter: var(--nav-backdrop);
  -webkit-backdrop-filter: var(--nav-backdrop);
  padding: var(--nav-padding-y) var(--nav-padding-x);
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
}

.nav-link {
  font-family: var(--font-mono);
  font-size: var(--font-size-nav);
  letter-spacing: var(--letter-spacing-wide);
  text-transform: uppercase;
  color: var(--text-primary);
  transition: var(--transition-colors);
}
```

### Hero Section
```css
.hero-title {
  font-family: var(--font-sans);
  font-size: var(--font-size-hero);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-tight);
  color: var(--text-primary);
}

.hero-subtitle {
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  color: var(--text-primary);
  max-width: 600px;
}
```

### Feed Section
```css
.feed-title {
  font-size: var(--font-size-h1);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--space-8);
}

.feed-item {
  border-bottom: var(--border-thin) solid var(--border-default);
  padding: var(--feed-item-padding) 0;
  transition: var(--transition-colors);
}

.feed-item.active {
  border: var(--border-medium) solid var(--accent-teal);
  border-radius: var(--radius-lg);
  padding: var(--feed-item-padding);
  margin: 0 calc(var(--feed-item-padding) * -1);
}

.feed-item-date {
  font-size: var(--font-size-small);
  color: var(--text-secondary);
  font-family: var(--font-mono);
}

.feed-item-title {
  font-size: var(--font-size-h3);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  line-height: var(--line-height-snug);
}
```

### Badges
```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: var(--badge-padding-y) var(--badge-padding-x);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-tiny);
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--letter-spacing-wide);
  text-transform: uppercase;
}

.badge-blog {
  background: var(--badge-blog-bg);
  color: var(--badge-blog-text);
  border: var(--border-thin) solid var(--badge-blog-border);
}

.badge-video {
  background: var(--badge-video-bg);
  color: var(--badge-video-text);
}
```

### Buttons
```css
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--button-padding-y) var(--button-padding-x);
  border-radius: var(--radius-full);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  transition: var(--transition-all);
  cursor: pointer;
  border: var(--border-medium) solid var(--button-border);
  background: transparent;
  color: var(--text-primary);
}

.button:hover {
  background: var(--text-primary);
  color: var(--background);
}
```

### Article Layout
```css
.article-container {
  display: grid;
  grid-template-columns: var(--article-sidebar-width) 1fr;
  gap: var(--article-content-gap);
  max-width: var(--content-max);
  margin: 0 auto;
  padding: var(--article-content-padding);
}

.article-sidebar {
  position: sticky;
  top: calc(var(--nav-height) + var(--space-8));
}

.article-content {
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
  color: var(--text-primary);
}

.article-title {
  font-size: var(--font-size-display);
  font-weight: var(--font-weight-semibold);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-tight);
  margin-bottom: var(--space-12);
}
```

---

## 📱 RESPONSIVE BREAKPOINTS

```css
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;
```

### Media Query Usage
```css
/* Mobile first approach */
@media (max-width: 768px) {
  .article-container {
    grid-template-columns: 1fr;
  }
  
  .hero-title {
    font-size: 48px;
  }
  
  .nav-padding-x {
    padding-left: 16px;
    padding-right: 16px;
  }
}
```

---

## 🎨 COMPLETE CSS CUSTOM PROPERTIES

```css
:root {
  /* Colors */
  --background: #F6F4F9;
  --text-primary: #1E1E1E;
  --text-secondary: #6B6B6B;
  --text-muted: #999999;
  --accent-teal: #00D4AA;
  --accent-blue: #635BFF;
  --border-default: #E0E0E0;
  --border-active: #00D4AA;
  --button-border: #1E1E1E;
  
  /* Badge colors */
  --badge-blog-bg: #FFFFFF;
  --badge-blog-text: #1E1E1E;
  --badge-blog-border: #E0E0E0;
  --badge-video-bg: #1E1E1E;
  --badge-video-text: #FFFFFF;
  
  /* Navigation */
  --nav-bg: rgba(246, 244, 249, 0.8);
  --nav-height: 64px;
  --nav-padding-x: 32px;
  --nav-padding-y: 16px;
  
  /* Typography */
  --font-sans: 'sohne-var', 'Helvetica Neue', Arial, sans-serif;
  --font-mono: 'sohne-mono', 'Courier New', monospace;
  
  --font-size-hero: 96px;
  --font-size-display: 72px;
  --font-size-h1: 48px;
  --font-size-h2: 32px;
  --font-size-h3: 24px;
  --font-size-h4: 20px;
  --font-size-base: 18px;
  --font-size-medium: 16px;
  --font-size-small: 14px;
  --font-size-tiny: 12px;
  --font-size-nav: 14px;
  
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  
  --line-height-tight: 1.1;
  --line-height-snug: 1.25;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.75;
  
  --letter-spacing-tight: -0.02em;
  --letter-spacing-normal: 0;
  --letter-spacing-wide: 0.05em;
  
  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  --space-32: 128px;
  
  /* Layout */
  --container-max: 1440px;
  --content-max: 1200px;
  --feed-max: 1000px;
  --article-sidebar-width: 280px;
  --article-content-gap: 64px;
  --article-content-padding: 48px;
  
  /* Components */
  --feed-item-padding: 24px;
  --feed-item-gap: 16px;
  --feed-expanded-padding: 32px;
  --button-padding-x: 24px;
  --button-padding-y: 12px;
  --badge-padding-x: 12px;
  --badge-padding-y: 4px;
  
  /* Borders */
  --border-thin: 1px;
  --border-medium: 2px;
  --border-thick: 3px;
  --radius-none: 0;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
  
  /* Effects */
  --backdrop-blur: blur(10px);
  
  /* Transitions */
  --transition-fast: 150ms;
  --transition-base: 200ms;
  --transition-slow: 300ms;
  --transition-slower: 500ms;
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
}
```

---

## 📦 FONT SETUP

### Loading Sohne Fonts
```css
@font-face {
  font-family: 'sohne-var';
  src: url('/fonts/sohne-var.woff2') format('woff2'),
       url('/fonts/sohne-var.woff') format('woff');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'sohne-mono';
  src: url('/fonts/sohne-mono.woff2') format('woff2'),
       url('/fonts/sohne-mono.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

### Fallback with Inter (if Sohne unavailable)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
```

---

## 🎯 USAGE EXAMPLES

### HTML Structure Example
```html
<nav class="navigation">
  <div class="nav-logo">[B] BLOG</div>
  <div class="nav-links">
    <a class="nav-link">[D] DOCS</a>
    <a class="nav-link">[Y] YOUTUBE</a>
    <a class="nav-link">[G] GITHUB</a>
    <a class="nav-link">[M] MEETUPS</a>
  </div>
  <div class="nav-link">[C] CONSOLE</div>
</nav>

<main>
  <section class="hero">
    <h1 class="hero-title">Welcome to<br>Stripe Dot Dev</h1>
    <p class="hero-subtitle">Learn how to build web and mobile applications...</p>
  </section>
  
  <section class="feed">
    <h2 class="feed-title">Feed<span>(96)</span></h2>
    
    <div class="feed-item">
      <span class="feed-item-date">2025.12.10</span>
      <h3 class="feed-item-title">Versioning in Stripe Workflows...</h3>
      <span class="badge badge-blog">BLOG</span>
    </div>
    
    <div class="feed-item active">
      <span class="feed-item-date">2025.12.07</span>
      <h3 class="feed-item-title">Teach AI agents to pay...</h3>
      <span class="badge badge-video">VIDEO</span>
      
      <div class="feed-item-expanded">
        <p class="feed-item-summary">Summary: ...</p>
        <button class="button">Read</button>
      </div>
    </div>
  </section>
</main>
```

---

## 🔍 SPECIAL NOTES

### The "+" Decorative Elements
- Scattered across the hero section
- Simple text characters "+"
- Positioned absolutely
- Possibly animated/rotating

### The "Dev" Pixelated Logo
- Custom SVG or icon font
- Retro pixelated style
- Located top-right corner with globe icon

### The Teal Selection Border
- Key interaction element
- 2px solid border
- Appears on active feed items
- Smooth transition

### List vs Card Layout
- Feed items are NOT cards
- List format with borders
- Inline expansion
- Cleaner, more minimal

---

## ✅ IMPLEMENTATION CHECKLIST

- [ ] Set up CSS custom properties
- [ ] Load Sohne fonts (or fallback to Inter)
- [ ] Create base typography styles
- [ ] Build navigation with backdrop blur
- [ ] Create hero section with large typography
- [ ] Implement feed list with expandable rows
- [ ] Add teal border selection state
- [ ] Create badge components
- [ ] Build ghost button style
- [ ] Set up article two-column layout
- [ ] Add responsive breakpoints
- [ ] Implement transitions
- [ ] Add decorative "+" elements
- [ ] Test across browsers for backdrop-filter support

---

**READY TO BUILD! 🚀**
