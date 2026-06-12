# Fiona Paul — The Gallery at Night

An immersive single-page portfolio for **Fiona Paul**, a painter from Dar es Salaam, Tanzania, whose work centers on one devotion: how light lands on Black and brown skin.

**Live site:** https://aldo140.github.io/fiona-portfolio/

The site is not a template with her images dropped in. Every section, interaction and color was derived from her actual body of work — her A-level thesis, her gouache portraits, her oil-pastel violinists, her brown-paper parcels. The full mapping from artwork to design decision is documented in [FIONA-ART.md](FIONA-ART.md).

## What's on the page

| Section | What it does |
| --- | --- |
| **Hero** | Her headshot floats over a gouache halo in her palette; her signature writes itself; butterflies drift; layers parallax toward the cursor on desktop |
| **The Light** | Her charcoal portrait sits in near-total darkness — your pointer is the spotlight (tap to place it on touch). The frame leans away from the light in 3D |
| **The Works** | A pinned horizontal gallery wall: scroll down, the wall slides sideways. On mobile it becomes a swipeable salon wall with frames hung at uneven heights |
| **She Paints Sound** | A live canvas flow field swirls Van Gogh eddies behind her oil-pastel violinist |
| **Every Painting Is Two Paintings** | A drag slider wipes between the real underpainting and the finished mother-and-child canvas |
| **The Studio** | Her desk, parcels and time-lapse video as taped kraft polaroids (an overlapping collage on mobile) |
| **Write to Her** | A kraft letter with a perforated butterfly stamp |

## Stack

Zero build, zero dependencies. Plain HTML, CSS and vanilla JavaScript.

```
index.html          structure and content
css/styles.css      theme, layout, all CSS animation
js/main.js          spotlight, parallax, flow field, gallery pan, comparison slider
images/             Fiona's artwork (Instagram archive)
videos/             process time-lapses
fiona-headshot.png  transparent headshot used in the hero
```

- **Type:** Clash Display + Satoshi (Fontshare), Homemade Apple (Google Fonts) for her gel-pen voice
- **Color:** OKLCH custom properties; one locked accent (amber, the light itself)
- **Motion:** transform/opacity only, exponential ease-out curves, IntersectionObserver reveals, `@supports (animation-timeline: view())` progressive enhancement on mobile
- **Accessibility:** full `prefers-reduced-motion` fallbacks, keyboard-operable comparison slider (a real `<input type="range">`), skip link, semantic landmarks, alt text written from the actual artworks

## Run locally

Any static server works:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy

Hosted on GitHub Pages from the `main` branch root. Push to `main` and Pages redeploys automatically.

## Updating content

- **Swap the contact email:** search for `hello@fionapaul.art` in `index.html`.
- **Add a work to the gallery:** duplicate a `<figure class="piece">` block in the Works section, point it at a file in `images/`, give it a `data-tilt` between −2.4 and 2.2 and a one-line gel-pen note.
- **Swap the headshot:** replace `fiona-headshot.png` (transparent PNG, square, shoulders-up).

All artwork © Fiona Paul.
