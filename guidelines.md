# Nawa House — Project Guidelines

## Images

- All images placed under the `resources/` folder must be compressed and optimized for responsive screen sizes before being used in the site.
- Export both a **desktop** version (max width 1920px) and a **mobile** version (max width 828px).
- Use **WebP** format for all hero and section images. Target quality: ~82 for desktop, ~78 for mobile.
- Optimized images go in `public/` (e.g. `public/hero/hero-1.webp`, `public/hero/hero-1-mobile.webp`).
- Use the `<picture>` element with `srcset` to serve the correct size per screen:
  ```html
  <picture>
    <source media="(max-width: 768px)" srcSet="/hero/hero-1-mobile.webp" type="image/webp" />
    <source srcSet="/hero/hero-1.webp" type="image/webp" />
    <img src="/hero/hero-1.webp" alt="..." />
  </picture>
  ```
- Never commit raw, uncompressed originals to `public/`.

### Optimization commands (macOS)

```bash
# Resize to desktop width (1920px)
sips -Z 1920 input.jpg --out output-1920.jpg

# Resize to mobile width (828px)
sips -Z 828 input.jpg --out output-828.jpg

# Convert to WebP
cwebp -q 82 output-1920.jpg -o hero-1.webp
cwebp -q 78 output-828.jpg -o hero-1-mobile.webp
```

## Brand

- Fonts: **Parkinsans** (display/headings) + **Inter** (UI/body). No other typefaces.
- Do not use `italic` — Parkinsans has no true italic.
- Color tokens are defined in `tailwind.config.js`. Always use the token names (`cream`, `fg`, `accent`, `muted`, `border`, `palm`, `gold`) rather than raw hex values.
- Brand voice: calm, grounded, minimal. Avoid "luxury", "curated", "crafted" — favor plain, direct language.

## Component conventions

- Scroll reveal: use `useScrollReveal` hook + `.reveal` / `.visible` CSS classes.
- Navbar is hidden at scroll position 0 and slides in on scroll.
- Keep sections well-spaced (`py-28 md:py-40`) to let content breathe.
