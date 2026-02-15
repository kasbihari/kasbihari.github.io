# Krishna Bihari – Creative Developer Portfolio

[![Astro](https://img.shields.io/badge/Astro-5.17.2-ff5d01?logo=astro)](https://astro.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-06b6d4?logo=tailwindcss)](https://tailwindcss.com)
[![Three.js](https://img.shields.io/badge/Three.js-r159-000000?logo=threedotjs)](https://threejs.org)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-latest-000000)](https://ui.shadcn.com)

> A minimalist, cinematic portfolio blending code, art & culture.  
> Built with performance, accessibility, and a dark liquid glass aesthetic.

![Portfolio Preview](public/images/preview.png)

---

## ✨ Features

- **Fluid Aurora Background** – Custom WebGL shader with mouse-repel effect  
- **Dark Liquid Glass UI** – Consistent glass-morphism design with bordeaux accents  
- **Interactive Skill Galaxy** – Pan & zoom through an animated skill constellation (desktop + touch)  
- **Smooth Page Transitions** – Seamless fades without page reloads  
- **Fully Responsive** – Optimised for mobile, tablet, and desktop  
- **Fast & Accessible** – Lazy-loaded Three.js, semantic HTML, high Lighthouse scores  
- **GitHub Pages Ready** – Preconfigured GitHub Action deployment  

---

## 🛠 Tech Stack

| Category   | Technologies |
|------------|-------------|
| Framework  | Astro (static site generator) |
| Language   | TypeScript (strict mode) |
| Styling    | Tailwind CSS + shadcn/ui |
| 3D / WebGL | Three.js + custom GLSL shaders |
| Animations | Framer Motion |
| Icons      | Lucide React |
| Deployment | GitHub Pages (via GitHub Actions) |

---

## 📁 Project Structure
├── public/ # Static assets (images, fonts, cv.pdf)
├── src/
│ ├── components/
│ │ ├── 3d/ # Three.js backgrounds
│ │ ├── sections/ # Page sections
│ │ ├── skills/ # Skill Galaxy component
│ │ └── ui/ # shadcn/ui components
│ ├── content/ # Skills data
│ ├── layouts/ # Layout wrapper
│ ├── pages/ # Routes (index.astro)
│ ├── styles/ # Global CSS
│ └── lib/ # Utilities
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
---

## 🚀 Getting Started
--
### Prerequisites

- Node.js 20+
- npm

--

🌐 Deployment

This project deploys automatically to GitHub Pages via GitHub Actions.
Every push to the signature-version branch triggers:
Build
Static export
Deployment
Workflow location: .github/workflows/deploy.yml

--
🎨 Customisation

Colors & Fonts → tailwind.config.mjs, src/styles/global.css
Skills Data → src/content/skills/index.ts
Projects → Projects.tsx
Contact Content → Contact.tsx
Aurora Background → FluidAuroraBackground.tsx

--
🙏 Acknowledgements
Built with:
Astro
shadcn/ui
Three.js
Framer Motion
Made with ☕ and code by Krishna Bihari

📄 License
MIT License

### Installation

```bash
git clone https://github.com/kasbihari/kasbihari.github.io.git
cd kasbihari.github.io
npm install
npm run dev
