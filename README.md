# For Ghazal

A private, content-driven interactive letter built with React, Vite, TypeScript, and Framer Motion.

This project is intentionally minimal: black, white, soft motion, one thought at a time. It is designed to feel less like a website and more like a late-night handwritten letter translated into software.

## Features

- Mobile-first full-screen experience
- Progression by `Enter`, `Space`, click, tap, or memory swipe
- Editable content in `src/content/content.ts`
- Typewriter text, emphasis slides, quote slides, cursor-only pauses, and photo memories
- Framer Motion transitions and gesture support
- Responsive typography with `clamp()`
- Safe-area support for modern mobile devices
- Production build via Vite

## Setup

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Build

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Edit The Letter

All content lives in:

```text
src/content/content.ts
```

Each section is an array of slides or memories. You can edit words, pacing, reveal styles, and image paths without changing the application components.

Photos should be placed in:

```text
public/photos/
```

Then reference them from `content.ts` like:

```ts
image: '/photos/your-photo.jpg'
```

The starter project includes elegant SVG placeholders so the experience works immediately. Replace them with real photos when ready.

## Deploy To Vercel

1. Push this project to GitHub.
2. Import the repository in Vercel.
3. Use the default Vite settings:
   - Build command: `npm run build`
   - Output directory: `dist`
4. Deploy.

## Deploy To GitHub Pages

Install the Pages deploy helper:

```bash
npm install --save-dev gh-pages
```

Add these scripts to `package.json`:

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

If deploying to a repository page, set the Vite base path in `vite.config.ts`:

```ts
export default defineConfig({
  base: '/your-repo-name/',
  plugins: [react()],
});
```

Then run:

```bash
npm run deploy
```

For a custom domain or user page, you can usually leave `base` as `/`.
