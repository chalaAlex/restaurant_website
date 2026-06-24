# Bella Vista Restaurant Website

A modern, production-ready restaurant website built with Next.js 14+, TypeScript, and Tailwind CSS.

## Features

- 🎨 Beautiful, responsive design optimized for all devices
- ⚡ Fast performance with Next.js App Router and Server Components
- 🍕 Complete menu showcase
- 📅 Online reservation system (UI ready)
- 📱 Mobile-first approach
- ♿ Accessibility compliant
- 🎯 SEO optimized

## Tech Stack

- **Framework:** Next.js 16.2.9
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** Custom components with class-variance-authority
- **Icons:** Lucide React
- **Fonts:** Inter (body) & Playfair Display (headings)
- **Animation:** Framer Motion

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── menu/              # Menu page
│   ├── reservations/      # Reservations page
│   ├── about/             # About page
│   └── contact/           # Contact page
├── components/
│   ├── layout/            # Header, Footer
│   ├── home/              # Home page sections
│   └── ui/                # Reusable UI components
└── lib/                   # Utilities

```

## Pages

- **Home (/)** - Hero section, featured menu, about teaser, testimonials, CTA
- **Menu (/menu)** - Complete menu with categories
- **Reservations (/reservations)** - Table booking form
- **About (/about)** - Restaurant story and stats
- **Contact (/contact)** - Contact form and information

## Customization

### Colors
Edit `src/app/globals.css` to customize the color scheme:
- `--primary`: Main brand color (orange)
- `--secondary`: Dark brown for text/headings
- `--accent`: Yellow/gold accent color

### Fonts
Change fonts in `src/app/layout.tsx` by importing different Google Fonts.

### Content
Update text content directly in each page component.

## Next Steps

1. ✅ Basic website structure
2. ⏳ Add database integration (Prisma + PostgreSQL)
3. ⏳ Implement backend API routes for reservations
4. ⏳ Add payment integration for online ordering
5. ⏳ Connect contact form to email service
6. ⏳ Add admin dashboard for managing reservations
7. ⏳ Deploy to Vercel

## Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## License

© 2024 Bella Vista Restaurant. All rights reserved.
