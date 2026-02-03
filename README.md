# Dark Cyber-Minimalist Portfolio

A high-conversion portfolio built with **Nuxt 3**, featuring Anti-Gravity effects, Sanity CMS, and a stunning dark cyber aesthetic.

## ✨ Features

- 🌌 **Zero Gravity Tech** - Weightless, floating project cards with magnetic mouse interactions
- 🎨 **Glassmorphism Design** - Backdrop blur, thin borders, and glowing accents
- 📝 **Headless CMS** - Sanity.io integration for easy content management
- ⚡ **GSAP Animations** - Smooth, professional entrance and hover animations
- 🎯 **Anti-Gravity Effects** - Interactive cards that respond to mouse movement
- 📱 **Responsive** - Mobile-first design with Tailwind CSS

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- A Sanity.io account (free tier available)

### Installation

1. **Clone and Install**
   ```bash
   npm install
   ```

2. **Set up Sanity**
   
   Create a new Sanity project at [sanity.io](https://www.sanity.io/manage)
   
   Copy `.env.example` to `.env` and add your credentials:
   ```env
   NUXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NUXT_PUBLIC_SANITY_DATASET=production
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

## 📊 Sanity CMS Setup

### Schema Fields

The `project` schema includes:

- **title** - Project name
- **slug** - URL-friendly identifier
- **mainImage** - Hero image with alt text
- **description** - Project overview
- **techStack** - Array of technology tags
- **projectUrl** - Live project link
- **featured** - Boolean for highlighting projects
- **gallery** - Additional project images
- **orderRank** - Custom ordering

### Setting Up Sanity Studio

1. Update `sanity.config.ts` with your project ID
2. Install Sanity Studio dependencies:
   ```bash
   npm install sanity @sanity/vision
   ```
3. Run Sanity Studio locally:
   ```bash
   npx sanity dev
   ```
4. Access admin panel at `http://localhost:3333`

### Adding Projects

1. Navigate to Sanity Studio
2. Click "Project" → "Create new"
3. Fill in all fields:
   - Upload main image (recommended: 1600x1200px)
   - Add tech stack tags
   - Set project URL
   - Toggle "Featured" if desired
4. Publish!

## 🎨 Design System

### Color Palette
```css
--cyber-dark: #050505     /* Background */
--cyber-grid: #1a1a1a     /* Grid lines */
--cyber-accent: #00ffff   /* Neon cyan */
--cyber-glow: rgba(0, 255, 255, 0.5)  /* Glow effects */
```

### Typography
- **Headers**: Exo 2 (futuristic, bold)
- **Body/Data**: Space Mono (monospace, tech)

### Animations
- Entrance: GSAP with stagger effects
- Hover: Anti-Gravity magnetic pull + tilt
- Transitions: 300-700ms cubic-bezier easing

## 🧩 Components

### Anti-Gravity System
Located in `composables/useAntiGravity.ts`

```typescript
const { activate, deactivate } = useAntiGravity(elements, {
  strength: 0.4,          // Magnetic pull intensity
  tiltIntensity: 8,       // 3D tilt angle
  elevationScale: 15,     // Z-axis lift
  smoothness: 0.12        // Animation duration
})
```

### Projects Composable
Located in `composables/useProjects.ts`

```typescript
const { 
  projects,           // Reactive project list
  loading,            // Loading state
  fetchProjects,      // Fetch all projects
  fetchProjectBySlug, // Get single project
  getImageUrl         // Sanity image URL builder
} = useProjects()
```

## 📁 Project Structure

```
.
├── app/
│   ├── pages/
│   │   ├── index.vue           # Landing page with Three.js
│   │   ├── work.vue            # Project grid
│   │   └── work/[slug].vue     # Project details
│   └── assets/css/
│       └── main.css            # Cyber design system
├── composables/
│   ├── useAntiGravity.ts       # Magnetic effects
│   └── useProjects.ts          # CMS data fetching
├── lib/
│   └── sanity.ts               # Sanity client config
├── schemas/
│   ├── project.ts              # Project schema
│   └── index.ts                # Schema registry
└── sanity.config.ts            # Sanity Studio config
```

## 🚢 Deployment

### Netlify

1. Build command: `npm run generate`
2. Publish directory: `.output/public`
3. Add environment variables in Netlify dashboard

### Sanity Production

1. Deploy Sanity Studio:
   ```bash
   npx sanity deploy
   ```
2. Your studio will be at `your-project.sanity.studio`

## 🎯 Performance Tips

- Images are lazy-loaded
- Sanity CDN is used for fast image delivery
- Anti-Gravity uses requestAnimationFrame for 60fps
- CSS Grid for efficient layouts
- Minimal JavaScript bundle size

## 📝 License

MIT - Feel free to use for your own portfolio!

---

Built with ❤️ using Nuxt 3, GSAP, and Sanity.io
