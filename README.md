<div align="center">

# JW Photography

**Professional Photography & Equipment Rental**

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-0055FF?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion)

A modern, cinematic portfolio and equipment rental platform built with React, featuring immersive Framer Motion animations, 3D interactive elements, and a refined dark theme with golden accents.

</div>

---

## Overview

JW Photography is a single-page application designed for a professional photography business. It showcases services, rental equipment, portfolio work, and client testimonials — all wrapped in a visually rich, animation-driven experience.

## Key Features

| Feature | Description |
|---------|-------------|
| **Cinematic Hero** | Mouse-tracking parallax, floating particles, geometric shapes, shimmer text |
| **3D Gear Cards** | Interactive tilt-on-hover with spring physics, floating price tags, shine effects |
| **Filterable Portfolio** | Category-based filtering with smooth AnimatePresence transitions |
| **Spotlight Services** | Cursor-following spotlight, blur-based entrance animations |
| **3D Testimonials** | Tilt cards with spring physics, animated star ratings, floating quote icons |
| **Interactive About** | 3D image tilt, animated counters with eased number roll-up |
| **Validated Contact Form** | React Hook Form + Zod validation, glowing focus states, animated submit |
| **Scroll-Aware Navbar** | Dynamic background blur, animated underlines, glow dot logo |
| **Scroll Progress** | Spring-animated progress indicator |
| **Code Splitting** | React.lazy + Suspense for optimized bundle loading |

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | React 18 with TypeScript (strict mode) |
| **Build** | Vite 5 |
| **Styling** | Tailwind CSS 3.4, CSS custom properties |
| **Animation** | Framer Motion 12 |
| **Components** | shadcn/ui, Radix UI |
| **Forms** | React Hook Form, Zod, @hookform/resolvers |
| **Routing** | React Router 6 |
| **Notifications** | Sonner |
| **Icons** | Lucide React |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 18+
- npm or your preferred package manager

### Installation

```sh
# Clone the repository
git clone https://github.com/Udai-Senevirathne/JW-photo.git
cd JW-photo

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:8080`.

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
| `npm run test` | Run tests |

## Project Structure

```
src/
├── components/
│   ├── Navbar.tsx              # Scroll-aware navigation
│   ├── HeroSection.tsx         # Parallax hero with particles
│   ├── GearSection.tsx         # 3D tilt rental cards
│   ├── PortfolioSection.tsx    # Filterable photo gallery
│   ├── ServicesSection.tsx     # Spotlight service cards
│   ├── TestimonialsSection.tsx # 3D testimonial cards
│   ├── AboutSection.tsx        # Parallax about with counters
│   ├── ContactSection.tsx      # Validated contact form
│   ├── Footer.tsx              # Animated footer
│   └── ui/                     # shadcn/ui primitives
├── pages/
│   ├── Index.tsx               # Main landing page
│   └── NotFound.tsx            # 404 page
├── hooks/                      # Custom React hooks
├── lib/                        # Utility functions
└── assets/                     # Images & static assets
```

## Performance

- **Code splitting** via React.lazy reduces initial bundle size
- **Lazy-loaded images** with native `loading="lazy"`
- **Reduced motion** support via `prefers-reduced-motion` media query
- **Optimized fonts** with `<link>` preconnect for Google Fonts

## License

This project is proprietary. All rights reserved.

---

<div align="center">
  <sub>Built with precision by <strong>JW Photography</strong></sub>
</div>
