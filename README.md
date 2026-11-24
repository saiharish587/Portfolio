# Sai Harish Puchala — Personal Portfolio

> A modern, high-performance personal portfolio website built with a premium **black, white & gold** aesthetic. Features interactive 3D animations, smooth scroll, glassmorphism UI, and a fully responsive layout — all rendered entirely on the frontend.

---

## 🌐 Live Preview

**GitHub:** [github.com/saiharish587/Portfolio](https://github.com/saiharish587/Portfolio)

---

## ✨ Features at a Glance

| Feature | Description |
|---|---|
| 🌌 3D Star Field | Animated WebGL star field in the Hero section using Three.js |
| 🃏 Tilted Project Cards | Physics-based 3D tilt + parallax cards on hover |
| 🖱️ Custom Cursor | Gold accent cursor with hover state morphing |
| 🎞️ Smooth Scroll | Silky inertia-based scrolling powered by Lenis |
| 🧊 Glassmorphism UI | Frosted-glass cards with gold borders throughout |
| 📱 Fully Responsive | Mobile-first layout with animated slide-in mobile menu |
| 🏠 macOS-style Dock | Magnification dock with spring physics for navigation |
| 🎬 Scroll Animations | Elements animate into view on scroll via Framer Motion |
| 🔒 Security Hardened | URL validation, CSP headers, no source maps in production |
| ⚡ Code-Split Build | Three.js, vendor, and animation bundles split for fast load |

---

## 🛠️ Tech Stack

### Core Languages

| Language | Usage |
|---|---|
| **JavaScript (ES2024+)** | All component logic, event handling, animation control |
| **JSX** | Declarative UI templates inside React components |
| **CSS3** | Design system, glassmorphism, custom properties, keyframe animations |
| **HTML5** | Semantic markup via `index.html` and React's virtual DOM |

---

### Frontend Framework & Libraries

#### ⚛️ React 19
The entire UI is built as a **single-page application (SPA)** using React 19 with functional components and hooks (`useState`, `useEffect`, `useRef`).

```
react ^19.2.5
react-dom ^19.2.5
```

- Component-based architecture — each page section is an isolated, reusable component
- Custom `CustomCursor` component with real-time `mousemove` tracking
- Scroll-aware `Navigation` with active section detection

---

#### 🎞️ Framer Motion `^12.38.0` + Motion `^12.40.0`
Handles **all scroll-triggered and entrance animations** across the site.

- `motion.div`, `motion.h1`, `motion.nav` wrappers for declarative animation
- `useMotionValue` + `useSpring` for physics-based spring animations (Dock, TiltedCard)
- `AnimatePresence` for smooth mount/unmount transitions (mobile menu)
- `variants` with `staggerChildren` for cascading hero text reveal
- `whileInView` with `viewport: { once: true }` for scroll-triggered section entrances

---

#### 🌐 Three.js `^0.184.0` + React Three Fiber `^9.6.1` + Drei `^10.7.7`
Powers the **interactive 3D star field background** in the Hero section.

```jsx
<Canvas camera={{ position: [0, 0, 1] }}>
  <StarField />
</Canvas>
```

- `5,000 gold particles` distributed in a sphere using `maath/random`
- Continuous rotation driven by `useFrame` render loop
- `PointMaterial` with gold (`#d4af37`) color, depth-write disabled for performance
- Bundled into its own `three` chunk to avoid blocking initial page load

---

#### 📜 Lenis `^1.3.23`
Provides **buttery smooth inertia scrolling** with a custom easing function:

```js
easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
```

- Integrates with the browser's `requestAnimationFrame` loop
- Configured for vertical scroll only, with touch multiplier for mobile feel

---

#### 🎨 GSAP `^3.15.0`
Installed as an animation utility for high-performance timeline animations and scroll-based effects.

---

#### 🃏 React Parallax Tilt `^1.7.327`
Provides native parallax tilt support; the custom `TiltedCard` component extends this further with:

- `useMotionValue` + `useSpring` for smooth rotateX / rotateY
- Per-card `scaleOnHover` and `rotateAmplitude` props
- Overlay content (project title, stack tags) revealed on hover

---

#### 🔣 Lucide React `^1.14.0`
Icon library used throughout the UI:

- Section labels: `ExternalLink`, `Trophy`, `Star`, `Award`, `User`, `MessageSquare`, `Mail`
- Navigation: `Menu`, `X`
- About facts: `Code2`, `Cpu`, `Globe`

---

#### ⚙️ Maath `^0.10.8`
Math utility used for generating random 3D particle positions:

```js
random.inSphere(new Float32Array(5000), { radius: 1.5 })
```

---

## 🏗️ Build Tooling

### ⚡ Vite 8 `^8.0.10` (with Rolldown)

The project uses **Vite 8** as the build tool, powered by the **Rolldown** bundler (Rust-based, significantly faster than esbuild/Webpack).

```js
// vite.config.js — Manual chunk splitting
manualChunks(id) {
  if (id.includes('react'))          return 'vendor';
  if (id.includes('three'))          return 'three';
  if (id.includes('framer-motion'))  return 'animation';
}
```

Output chunks:
- `vendor.js` — React + React DOM
- `three.js` — Three.js + React Three Fiber/Drei
- `animation.js` — Framer Motion + GSAP + Lenis
- `index.js` — Application code

**Dev commands:**

```bash
npm run dev       # Start Vite dev server (HMR)
npm run build     # Production build → /dist
npm run preview   # Serve production build locally
npm run lint      # ESLint check
```

---

### 🔌 @vitejs/plugin-react `^6.0.1`
Enables React Fast Refresh (HMR) in development and Babel/SWC transforms for JSX compilation.

---

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/                        # Images, resume PDF
│   │   ├── Sai_Harish.jpeg
│   │   ├── Chaff.jpeg
│   │   ├── Contact-Tracing.jpg
│   │   ├── HAWK.jpg
│   │   ├── Orbius-AI.jpg
│   │   ├── AI-Article-Processor.png
│   │   └── 23211a6794-Puchala_Sai_Harish.pdf
│   ├── components/
│   │   ├── Navigation.jsx             # Sticky nav, scroll-spy, mobile menu
│   │   ├── Hero.jsx                   # 3D star field + animated intro
│   │   ├── Projects.jsx               # Tilted card project grid
│   │   ├── SkillsExperienceEducation.jsx  # Skills tags, timeline, cert cards
│   │   ├── AchievementsAboutContactFooter.jsx  # Bento grid sections
│   │   ├── TiltedCard.jsx             # Physics-based 3D tilt card
│   │   ├── TiltedCard.css
│   │   ├── ChromaGrid.jsx             # Colour-shifting background grid
│   │   ├── ChromaGrid.css
│   │   ├── Dock.jsx                   # macOS magnification dock
│   │   └── Dock.css
│   ├── data/
│   │   └── portfolioData.js           # All content (projects, skills, certs…)
│   ├── utils/
│   │   └── securityUtils.js           # URL validation helpers
│   ├── App.jsx                        # Root component, Lenis init, section order
│   ├── App.css
│   ├── styles.css                     # Global design system (1 259 lines)
│   └── index.css                      # CSS variables, light/dark overrides
├── index.html
├── vite.config.js
├── netlify.toml                       # Deployment + security headers
├── eslint.config.js
└── package.json
```

---

## 🎨 Design System

### Color Palette

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#0a0a0a` | Page background |
| `--accent` | `#d4af37` | Gold — buttons, borders, glows, highlights |
| `--accent-glow` | `#f0c040` | Bright gold for icon glow effects |
| `--text-primary` | `#ffffff` | Headings, primary content |
| `--text-secondary` | `rgba(255,255,255,0.6)` | Subtext, descriptions |
| `--glass-bg` | `rgba(255,255,255,0.03)` | Frosted glass card background |
| `--glass-border` | `rgba(212,175,55,0.2)` | Gold-tinted glass borders |

### Typography

| Variable | Font | Usage |
|---|---|---|
| `--font-display` | Clash Display / system-ui | Hero heading, section titles |
| `--font-body` | Inter / system-ui | Body text, descriptions |
| `--font-mono` | JetBrains Mono / monospace | Code labels, section badges |

### UI Patterns

- **Glassmorphism** — `backdrop-filter: blur(20px)` + semi-transparent gold border
- **Gold glow** — `box-shadow: 0 0 30px rgba(212,175,55,0.3)` on interactive elements
- **Scroll animations** — `whileInView` with `once: true`, `margin: "-100px"` offset
- **Spring physics** — `stiffness: 100, damping: 30, mass: 2` for natural motion

---

## 🧩 Page Sections

| # | Section | Component | Key Feature |
|---|---|---|---|
| 1 | **Hero** | `Hero.jsx` | 3D WebGL star field, staggered text reveal, parallax profile image |
| 2 | **About** | `AchievementsAboutContactFooter.jsx` | Bento grid layout with animated fact tiles |
| 3 | **Skills** | `SkillsExperienceEducation.jsx` | Categorized gold skill tags |
| 4 | **Projects** | `Projects.jsx` | 3D tilted image cards with tech stack overlay |
| 5 | **Experience** | `SkillsExperienceEducation.jsx` | Timeline layout with bullet points |
| 6 | **Education** | `SkillsExperienceEducation.jsx` | Institution timeline + certification card grid |
| 7 | **Achievements** | `AchievementsAboutContactFooter.jsx` | Trophy icon bento cards |
| 8 | **Contact** | `AchievementsAboutContactFooter.jsx` | Glass CTA card with social icon links |
| 9 | **Footer** | `AchievementsAboutContactFooter.jsx` | Minimal gold-border footer |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18 (Node 22 recommended — matches Netlify build config)
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/saiharish587/Portfolio.git
cd Portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The dev server starts at **http://localhost:5173** with Hot Module Replacement enabled.

### Production Build

```bash
npm run build      # Outputs to /dist
npm run preview    # Preview the production build locally
```

---

## ☁️ Deployment

The site is configured for **Netlify** deployment with security hardening:

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

Security headers configured in `netlify.toml`:
- `Content-Security-Policy` — strict origin whitelist
- `Strict-Transport-Security` — HTTPS enforced (1 year + preload)
- `X-Frame-Options: DENY` — clickjacking prevention
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` — disables geolocation, mic, camera, payment

---

## 🔐 Security Practices

- All external URLs validated through `securityUtils.js` before navigation
- Production build runs without source maps (`sourcemap: false`)
- `rel="noopener noreferrer"` on all `target="_blank"` links
- `safeWindowOpen` utility prevents JavaScript injection via URL schemes
- Environment variable file paths redirect to 404 in Netlify config

---

## 📦 Full Dependency Reference

### Dependencies (Runtime)

| Package | Version | Purpose |
|---|---|---|
| `react` | ^19.2.5 | UI framework |
| `react-dom` | ^19.2.5 | DOM renderer |
| `framer-motion` | ^12.38.0 | Scroll & entrance animations |
| `motion` | ^12.40.0 | Spring physics (TiltedCard, Dock) |
| `three` | ^0.184.0 | 3D WebGL rendering |
| `@react-three/fiber` | ^9.6.1 | React renderer for Three.js |
| `@react-three/drei` | ^10.7.7 | Three.js helpers (Points, PointMaterial) |
| `@react-three/rapier` | ^2.2.0 | Physics engine (Rapier WASM) |
| `lenis` | ^1.3.23 | Smooth inertia scroll |
| `gsap` | ^3.15.0 | Animation timeline utility |
| `lucide-react` | ^1.14.0 | Icon library |
| `maath` | ^0.10.8 | 3D math helpers (sphere distribution) |
| `meshline` | ^3.3.1 | Three.js mesh-based line rendering |
| `react-parallax-tilt` | ^1.7.327 | Parallax tilt base |

### Dev Dependencies

| Package | Version | Purpose |
|---|---|---|
| `vite` | ^8.0.10 | Build tool (Rolldown bundler) |
| `@vitejs/plugin-react` | ^6.0.1 | React HMR + JSX transform |
| `eslint` | ^10.2.1 | Linting |
| `eslint-plugin-react-hooks` | ^7.1.1 | Hooks rules |
| `eslint-plugin-react-refresh` | ^0.5.2 | HMR linting |
| `@types/react` | ^19.2.14 | TypeScript definitions |
| `@types/react-dom` | ^19.2.3 | TypeScript definitions |

---

## 👨‍💻 Author

**Sai Harish Puchala**  
B.Tech Data Science — B V Raju Institute of Technology, Hyderabad, India

- 📧 [saiharish0088@gmail.com](mailto:saiharish0088@gmail.com)
- 💼 [linkedin.com/in/saiharishpuchala](https://www.linkedin.com/in/saiharishpuchala/)
- 🐙 [github.com/saiharish587](https://github.com/saiharish587)

---

*Built with React, Three.js, and Framer Motion — © 2026 Sai Harish Puchala*
