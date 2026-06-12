# Fiona Art — How Her Paintings Designed This Website

This document is the design rationale for the portfolio site. It exists because the site was not designed *for* Fiona's art; it was designed *from* it. Before a single line of code was written, all 38 posts and 13 process videos in her archive were studied piece by piece. What follows is what her work says, and how each thing it says became a layout, a color, an interaction, or an animation.

---

## 1. Who she is on the page

Fiona Paul is a painter from Dar es Salaam, Tanzania. Her Cambridge A-level portfolio (Haven of Peace Academy) opens with a hand-lettered board in gold ink on black paper: *"Exploring effects of LIGHT in portraiture"* — citing Vermeer's *Girl with a Pearl Earring*, Caravaggio, Rembrandt, chiaroscuro, and a phrase that became the design's north star: **"the African palette."**

Across every medium she touches — graphite, charcoal, ballpoint, watercolour, gouache, oil pastel, acrylic, oil — the same convictions repeat:

1. **Light is the subject.** Faces emerge from darkness; the drama is where the light lands.
2. **Brown skin is never one colour.** She builds it from orange, violet, olive, gold, brick and cream.
3. **Feeling over pose.** Her subjects laugh with closed eyes, press lips to a baby's temple, disappear into a violin.
4. **Music is painted as turbulence.** When instruments appear, the air starts to swirl.
5. **The process is part of the work.** She films the painting surfacing, signs in white gel pen, and ships canvases wrapped in kraft paper and twine with a butterfly under the knot.

Each of those five convictions owns part of the interface.

---

## 2. The theme: a gallery at night

**Derived from:** her thesis board; the charcoal portrait clipped to a classroom easel; the dark oil of a mother kissing her baby's temple where the figures barely rise out of shadow.

Her strongest images are chiaroscuro — a lit face against a dark field. So the site is a dark room: walls of deep umber-black (`oklch(0.16 0.012 55)`), a faint canvas-weave noise texture, and her paintings as the only saturated colour on the page. This was a deliberate inversion of the obvious choice. A "warm cream art portfolio" would have described her materials; the dark gallery describes her *idea*. The paintings carry the light, exactly as they do in her work.

The single accent colour is **amber** — not decoration, but a stand-in for the light itself: it appears where light would fall (the CTA, the spotlight's warm core, the medium labels, the progress bar). Cobalt, terracotta and olive — sampled from her gouache portraits — are allowed only as *paint*: in the blurred halo behind her headshot and in the flow field. They never become UI chrome, because in her work colour belongs to the subject, not the frame.

## 3. Typography: three voices she already uses

**Derived from:** the gold hand-lettering on her thesis board; her handwritten margin notes on the ballpoint studies (*"using her sharp angular features… using abstract shapes to construct face"*); her looping white gel-pen signature, filmed in three separate videos.

Her portfolio pages have three registers of text — formal display lettering, plain working notes, and the cursive signature. The site mirrors them exactly:

- **Clash Display** for headlines: confident, slightly sharp, the voice of the thesis board.
- **Satoshi** for body text: the plain, working voice of her notes.
- **Homemade Apple** (a gel-pen cursive) reserved for her voice only: the "Fiona" wordmark, the margin annotations on each painting ("the sun hit her cheek first"), the hints ("move your light across the charcoal"), and the sign-off "with light, Fiona." It is used the way she uses the gel pen — sparingly, at an angle, always last.

The captions in the gallery are written as *her* margin notes, tilted 2 degrees, because that is how annotation appears in her actual sketchbooks: not straight, not formal, thinking out loud.

## 4. The Light section: her thesis as an interaction

**Derived from:** the thesis board ("drama, intensity… chiaroscuro — Caravaggio & Rembrandt"); the charcoal woman in a headwrap, finished in the face and storm-scribbled everywhere else.

This is the one section where the site stops describing her idea and makes the visitor perform it. Her charcoal portrait sits under near-total darkness, and the visitor's pointer becomes the light source — a warm-cored beam (radial mask plus an amber overlay at low opacity) that reveals the drawing only where it lands. On touch screens a tap places the lantern, and when no one is steering, the beam wanders on its own so the section is never static.

The frame also leans away from the pointer in subtle 3D, the way a canvas on a wall catches raking light, and it carries two shadows — a tight contact shadow and a long thrown one — because elevation in a gallery is physical: things hang *off* the wall. A small plaque underneath ("Charcoal on paper · the thesis series") is set exactly like a museum label, and the word *chiaroscuro* sits ghosted on the wall behind the headline in her cursive, barely darker than the dark.

## 5. The Works: a wall you walk along

**Derived from:** the charcoal clipped to an easel with a binder clip; the gouache portrait mounted on black board with handwritten evaluation cards; the way her A-level work is physically *hung*.

Her work lives on walls and easels, so the gallery is a **wall, not a grid**. On desktop the section pins and the wall slides horizontally as you scroll — you walk past twelve real pieces, each hung at a slightly different tilt (between −2.4° and +2.2°, straightening when you approach with the cursor, the way you'd square a frame you stopped in front of). Each piece carries its medium in amber small caps — because her portfolio always names the medium; it's how she thinks — and a gel-pen note that only appears when you linger.

On mobile this becomes a **salon hang**: a swipeable wall where frames sit at uneven heights (odd pieces dropped, every third raised), fading into darkness at both edges of the screen, with frames swinging straight as they enter view (scroll-driven `view()` timeline). The uneven hang is not decoration; it is how her actual studio wall looks in the archive photos.

## 6. She Paints Sound: the flow field

**Derived from:** the oil-pastel violinist in blue, mid-bow, surrounded by spirals of yellow, orange and cobalt; the cellists in concert black; sheet music torn into her collages; the watercolour violinist on the white chair.

She painted the same violinist at least three times in three media, and in the most electric version the music is rendered as *Starry Night* turbulence — sound as visible eddies in the air. The site's flow field is a literal translation: a canvas of ~200 particles riding layered sine eddies, leaving short pastel strokes in her five pigments (cobalt, amber, terracotta, gel-white, green) that linger and slowly fade, exactly like oil pastel dragged in spirals. The trails fade at 4.5% per frame because pastel doesn't vanish — it sits.

It runs only while the section is on screen, and under reduced motion it stills to a faint wash, because the swirls are her *subject* there, not the page's furniture.

## 7. Every Painting Is Two Paintings: the comparison slider

**Derived from:** two photographs of the same canvas, months apart — the mother-and-child first as a maroon underpainting ringed in white impasto roses, then fully bloomed in colour with painted flowers filling the border.

Her archive accidentally documented the most honest thing about painting: the picture underneath the picture. The slider puts the visitor's hand on that exact pair of photographs — drag right and the colour blooms over the underpainting, the same direction her months of work moved. The control is a real `<input type="range">` (keyboard- and screen-reader-operable) with the thumb styled as a round white handle, and the labels "before"/"after" are written in her gel pen, in the corners, where she signs.

This section is also why the site's tenderness theme exists at all: the mother-and-child is her most developed image (it recurs in the dark oil kiss and the kanga-sling baby), so it gets the slowest, most deliberate interaction on the page — a thing you do with your hand, not your scroll wheel.

## 8. The Studio: kraft paper as an object, never as a background

**Derived from:** the photographs of finished work wrapped in kraft parcels tied with twine, sealed with vintage stamps; the black paper butterfly knotted under the string; her chaotic desk with the DOMS paint tin and the jar of muddy brush water; the collage portfolio cover with sheet music and paper butterflies.

The analog-romantic side of her practice appears as **objects on the dark wall**: kraft-paper polaroids with visible tape, each rotated a few degrees, holding her desk, her parcels, the twine butterfly, the portfolio cover, and a looping time-lapse of a face surfacing out of blank paper. The paper tint exists only on these objects and the closing letter — the page itself never turns beige, because in her world kraft paper is a material you *hold*, wrapped around something finished.

On mobile the polaroids overlap into a true collage (negative margins, stacked z-indexes, stronger tilts) — modeled directly on her portfolio cover, which is itself an overlapping collage.

The closing section is a letter on that same kraft paper with a perforated stamp bearing a butterfly — because that is literally how her art leaves her house: wrapped, stamped, tied, sent. "Write to her" is not a contact-form metaphor; it's a description of her shipping practice.

## 9. The butterflies

**Derived from:** the monarchs on her portfolio cover; the printed butterfly cards in her parcel photos; the black paper butterfly under the twine knot.

Butterflies are her recurring punctuation — they appear at the openings and closings of things (the cover of the portfolio, the seal on a parcel). The site uses them the same way: drifting through the hero (four of them, in amber, lilac, terracotta and gel-white, wings flapping on independent timers, riding long slow drift paths), and once more as the stamp on the final letter. They deliberately do not appear in the middle sections — punctuation loses meaning if it's everywhere.

## 10. Motion principles, in her terms

Every animation on the page maps to something she does with a brush:

| Her habit | The site's motion |
| --- | --- |
| Faces surface gradually out of blank paper (the time-lapses) | Content reveals upward with staggered delays as you reach it |
| She signs last, in gel pen, with a flourish | The signature underline draws itself, last, after the hero settles |
| Paintings physically hang and lean | Frames tilt at rest, straighten when approached, cast layered shadows |
| Light moves across a subject | The spotlight beam, the parallax layers leaning toward the cursor |
| Pastel strokes linger and accumulate | Flow-field trails fade slowly instead of clearing each frame |
| The underpainting becomes the painting | The drag slider wipes one real state into the other |

And one principle from her work governs restraint: **stillness is part of chiaroscuro.** Informational sections don't loop or shimmer. Under `prefers-reduced-motion`, every reveal becomes instant, the butterflies and painted strokes retire, and the flow field becomes a quiet wash — the gallery stays a gallery.

## 11. The pieces that decided things

For the record, the specific works that drove the biggest decisions:

- **The thesis board** (gold ink on black) → the dark theme, the amber accent, the Light section's existence
- **Charcoal woman in a headwrap, on the easel** → the spotlight interaction's canvas
- **Oil-pastel violinist with Van Gogh swirls** → the flow field, the "She paints sound" section
- **Mother-and-child underpainting + finished canvas** → the comparison slider
- **Girl in the straw hat with mosaic skin patches** → permission for the gouache halo's hard colour patches behind her headshot
- **Beanie portrait with orange light on her cheek** → the warm core inside the spotlight beam
- **Ballpoint study sheet with margin notes** → the gel-pen annotation system
- **Kraft parcels, twine butterfly, desk photo** → the entire Studio and Letter sections
- **The portfolio cover collage** → the mobile overlapping-collage layout
- **Her white gel-pen signature (filmed three times)** → the self-writing signature and every script-font moment on the page

The site's job was never to look like art. It was to make the visitor handle, for ninety seconds, the things Fiona handles every day: darkness, a moving light, a wall of work, swirling colour, a painting hiding under a painting, brown paper, and a signature.
