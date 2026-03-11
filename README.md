# JW Photography

A professional photography portfolio and equipment rental website featuring cinematic Framer Motion animations, 3D interactive elements, and a modern dark theme with golden accents.

## Features

- **Cinematic Hero Section** — Mouse-tracking parallax, floating particles, geometric shapes, shimmer text effects
- **3D Gear Rental Cards** — Interactive tilt-on-hover with spring physics, floating price tags, shine sweep effects
- **Filterable Portfolio Gallery** — Category-based filtering with AnimatePresence transitions, corner accent borders, overlay reveals
- **Spotlight Service Cards** — Cursor-following spotlight effect, blur-based entrance animations
- **3D Testimonial Cards** — Tilt cards with spring physics, animated star ratings, floating quote icons
- **Interactive About Section** — 3D image tilt, animated counters with eased number roll-up, decorative corner frames
- **Validated Contact Form** — React Hook Form + Zod validation, glowing focus states, 3D card tilt, animated Send button
- **Scroll-Aware Navbar** — Dynamic background blur on scroll, animated underlines, glow dot logo
- **Scroll Progress Bar** — Spring-animated progress indicator at the top of the page
- **Code Splitting** — React.lazy + Suspense for optimized loading
- **Fully Responsive** — Mobile-first design with animated hamburger menu
- **Accessibility** — Reduced motion support, semantic HTML, ARIA labels
- **SEO Optimized** — Open Graph meta tags, proper document structure

## Tech Stack

- **React 18** with TypeScript (strict mode)
- **Vite** for fast development and builds
- **Tailwind CSS** for styling
- **Framer Motion** for animations and interactions
- **shadcn/ui** + Radix UI for accessible components
- **React Hook Form** + **Zod** for form validation
- **Sonner** for toast notifications
- **Lucide React** for icons

## Getting Started

```sh
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

## Project Structure

```
src/
├── components/          # Page sections & UI
│   ├── Navbar.tsx       # Scroll-aware navigation
│   ├── HeroSection.tsx  # Parallax hero with particles
│   ├── GearSection.tsx  # 3D tilt rental cards
│   ├── PortfolioSection.tsx  # Filterable gallery
│   ├── ServicesSection.tsx   # Spotlight service cards
│   ├── TestimonialsSection.tsx  # 3D testimonial cards
│   ├── AboutSection.tsx # Parallax about with counters
│   ├── ContactSection.tsx  # Validated contact form
│   ├── Footer.tsx       # Animated footer
│   └── ui/              # shadcn/ui primitives
├── pages/               # Route pages
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── assets/              # Images and static assets
```
