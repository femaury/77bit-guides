# Design System Guidelines

## Colors

### Primary Colors
```css
/* Gold/Yellow Theme */
--primary: #FCD549;  /* Main accent color */
--primary-hover: #fce179;  /* Lighter version for hover states */
--primary-transparent: rgba(252, 213, 73, 0.1);  /* For subtle backgrounds */
```

### Secondary Colors
```css
/* Quest Type Colors */
--quest-main: #fb66ff;  /* Main quest pink/purple */
--quest-side: #f3af00;  /* Side quest orange */
--quest-daily: #68ffe3;  /* Daily/Weekly quest cyan */
```

### Background Colors
```css
/* Dark Theme */
--bg-primary: #111111;  /* Main background */
--bg-secondary: #0a0a0a;  /* Secondary background */
--bg-elevated: #222222;  /* Elevated elements like inputs */
--bg-overlay: rgba(0, 0, 0, 0.5);  /* Modal overlays */
--bg-hover: rgba(255, 255, 255, 0.1);  /* Hover states */
```

### Border Colors
```css
--border-primary: rgba(252, 213, 73, 0.1);  /* Primary borders */
--border-secondary: rgba(255, 255, 255, 0.1);  /* Secondary borders */
--border-hover: rgba(252, 213, 73, 0.4);  /* Border hover states */
```

## Typography

### Font Styles
```css
/* Use system font stack */
font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
```

### Text Colors
```css
--text-primary: rgb(229, 231, 235);  /* Primary text */
--text-secondary: rgb(156, 163, 175);  /* Secondary text */
--text-accent: #FCD549;  /* Accent text */
```

## Component Examples

### Buttons

```html
<!-- Primary Button -->
<button class="px-4 py-2 bg-[#FCD549] hover:bg-[#FCD549]/90 text-black rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
  Primary Button
</button>

<!-- Secondary Button -->
<button class="px-4 py-2 bg-[#FCD549]/10 text-[#FCD549] rounded hover:bg-[#FCD549]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200">
  Secondary Button
</button>

<!-- Tertiary Button -->
<button class="px-4 py-2 bg-[#222222] text-gray-200/90 rounded hover:bg-[#333333] border border-[#FCD549]/10">
  Tertiary Button
</button>
```

### Input Fields

```html
<input
  class="w-full px-3 py-2 bg-black/30 border border-[#FCD549]/20 rounded-lg
    text-gray-200 placeholder-gray-400
    focus:outline-none focus:border-[#FCD549]/40
    transition-colors duration-200"
  placeholder="Input field..."
/>

<select
  class="w-full p-2 bg-[#222222] text-gray-200/90 rounded border border-[#FCD549]/10 focus:border-[#FCD549]/30 outline-none"
>
  <option>Select option...</option>
</select>
```

### Cards/Containers

```html
<!-- Basic Card -->
<div class="p-4 min-w-[320px] bg-gradient-to-t from-[#111111] to-[#0a0a0a] border border-[#FCD549] shadow-[0_8px_32px_rgba(0,0,0,0.4)] rounded-lg backdrop-blur-sm">
  <!-- Content -->
</div>

<!-- Secondary Card -->
<div class="bg-black/20 rounded-lg p-4 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]">
  <!-- Content -->
</div>
```

### Headers

```html
<!-- Primary Header -->
<h2 class="text-xl font-bold mb-4 text-yellow-500/90 drop-shadow">Header Text</h2>

<!-- Gradient Header -->
<h3 class="font-bold text-2xl mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#FCD549] to-[#fce179] drop-shadow-[0_2px_4px_rgba(252,213,73,0.2)]">
  Gradient Header
</h3>
```

### Modals/Dialogs

```html
<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-[1001]">
  <div class="marker-popup-menu bg-[#111111] p-6 rounded-lg w-96 border border-[#FCD549]/10">
    <!-- Modal content -->
  </div>
</div>
```

### Common Utilities

```css
/* Shadows */
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
--shadow-md: 0 8px 32px rgba(0, 0, 0, 0.4);
--shadow-inner: inset 0 2px 4px rgba(0, 0, 0, 0.1);

/* Z-index layers */
--z-dropdown: 1000;
--z-modal: 1001;

/* Transitions */
--transition-base: all 200ms;
```

### Status/Type Indicators

```html
<!-- Status Badge -->
<div class="text-xs px-2 py-1 rounded bg-[#FCD549]/10 border border-[#FCD549]/20 text-[#FCD549]">
  Status
</div>

<!-- Level Indicator -->
<div class="text-xs text-gray-400 bg-black/30 px-2 py-0.5 rounded">
  Level 10
</div>
```

This style guide maintains the dark theme with gold accents and provides a consistent, modern gaming UI appearance. The color scheme and component styles can be easily extended while maintaining visual consistency across your new application.