# WildPixel — Content Guide

This document governs all copy, metadata, and content decisions for the WildPixel platform.
It is the single source of truth for tone, voice, naming, and editorial standards.

---

## Brand Identity

WildPixel is an independent creative studio.

It is **not** a stock-photo website, clip-art library, or template marketplace.

WildPixel publishes:
- Illustration
- Editorial Portraits
- Botanical Studies
- Nature
- Mythology
- History
- Mathematics
- Concept Art
- Cultural Stories

### Tone

| ✓ Use | ✗ Avoid |
|---|---|
| Thoughtful | Hype |
| Calm | Clickbait |
| Research-driven | "Best" |
| Artistic | "Ultimate" |
| Intelligent | "Amazing" |
| Timeless | Excessive marketing language |
| Precise | Vague superlatives |
| Curious | Generic adjectives |

---

## Homepage Copy

### Hero
**Headline:** Art That Invites You to Look Longer

**Subtitle:** Discover original illustrations, botanical studies, editorial portraits, cultural artworks, and visual stories created through research, observation, and thoughtful design.

**Primary CTA:** Explore Free Library

**Secondary CTA:** Read the Journal

---

### Featured Collections Section
**Heading:** Curated Collections

**Body:** Explore artwork organised by subject, creative direction, and visual language — from botanical studies to contemporary illustration.

---

### Free Library Section
**Heading:** Free Creative Assets

**Body:** Download carefully crafted illustrations and wallpapers for learning, inspiration, and personal creative projects.

---

### Journal Section
**Heading:** Stories Behind the Art

**Body:** Research, observations, and visual essays exploring history, science, culture, mathematics, and nature.

---

### About Preview Section
**Heading:** Meet the Creator

**Body:** WildPixel is an independent creative studio where research, illustration, and storytelling come together.

---

### Final CTA Section
**Heading:** More Collections Coming Soon

**Body:** Personal and Commercial licensing collections are currently being prepared.

**Button:** Browse Free Assets

---

## Page Copy

### Creative Library
**Title:** Creative Library
**Description:** Browse artwork by category, collection, colour, style, orientation, and theme.

### Collections Index
**Intro:** Carefully curated groups of illustrations connected through a shared visual language.

### Journal Index
**Title:** Journal
**Description:** Research, observations, and visual essays that inspired every collection and illustration.

### About
**Heading:** About WildPixel
**Intro:** WildPixel began as an exploration of how illustration can preserve stories, cultures, science, mathematics, history, and nature.

Every artwork begins with research before becoming a visual composition.

### Contact
**Heading:** Let's Talk
**Body:** Questions about licensing, collaborations, commissions, or future collections are always welcome.

### Pricing
**Heading:** Coming Soon
**Body:** Personal and Commercial licensing collections are currently being prepared.

### Search Empty State
**Heading:** Nothing Found Yet
**Body:** Try searching by subject, collection, colour, style, or theme.

### Footer Statement
> Original illustrations, visual research, and creative storytelling by WildPixel.

---

## Metadata Standards

### Title Pattern
`{Page/Asset title} — WildPixel`

Keep under 60 characters. Descriptive, not keyword-stuffed.

### Meta Description
- 120–155 characters
- One clear, honest sentence about what the page contains
- No keyword stuffing
- Written for a human reader first

### Alt Text Rules
- Describe what is in the image, not what it is used for
- Include subject, medium, and mood where relevant
- Example: `"Watercolour cherry blossom branch with gold ink detailing on pale cream ground"`
- Empty `alt=""` only for purely decorative elements

### Keywords
- 5–10 per asset
- Match the actual visual content
- Mix specific (cherry blossom, archival ink, half-drop repeat) with broader (botanical illustration, editorial portrait)
- No generic SEO padding

---

## OG Image Map

| Page | OG Image Source |
|---|---|
| Homepage | `/assets/free/modern-kimono-editorial-portrait.jpeg` |
| Creative Library | `/assets/free/cherry-blossom-watercolor-gold.jpeg` |
| Collection | Collection banner image |
| Asset | Asset image |
| Journal index | `/assets/free/shompen-heritage-conservation-art.jpeg` |
| Journal post | Post cover image |
| About | `/images/about/sudipta-ganguly-creator.jpeg` |
| Contact | `/assets/free/modern-kimono-editorial-portrait.jpeg` |
| Pricing | `/assets/free/modern-kimono-editorial-portrait.jpeg` |
| Search | Site default |

---

## Related Content Rules

- Every asset links to 1–3 related stories
- Every story links back to 1–3 related assets
- "You may also like" displays on both asset pages and journal pages
- Relationships are reciprocal and defined in data files, not hardcoded in components

---

## Image File Rules

- All image files use `.jpeg` extension (never `.jpg`)
- Paths never renamed — filenames remain exactly as uploaded
- Focal points (focusX, focusY) defined per asset for responsive cropping
- Hero images always use `priority` prop
- Below-fold images always use `loading="lazy"` (next/image default)

---

## Research Areas (About Page)
- Botanical Illustration
- Nature
- History
- Indigenous Cultures
- Mythology
- Mathematics
- Science
- Editorial Illustration
- Visual Storytelling

## Creative Philosophy
> Research first. Illustration second. Story always.
