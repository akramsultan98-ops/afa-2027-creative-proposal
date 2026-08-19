# AFA 2027 — Creative Experience Proposal

Interactive proposal for the **AFA 33rd Annual International Fertilizer Conference & Exhibition, 2027**, by Paradigm Capital Group.

## Run locally

Open `index.html` directly, or serve the folder with any static server:

```bash
python -m http.server 8080
```

Then open <http://localhost:8080>.

## Source of truth

The approved **AFA Proposal Design deck** (`assets/visuals/page-01.jpg` … `page-29.jpg`) is the sole source of truth for creative direction, artwork, colour and copy. The site presents that deck — it does not extend it.

- Every body paragraph on the site is the deck's own approved copy.
- No statistics, deliverables, production specifications, motion systems, social templates or storyboards are asserted anywhere, because the deck contains none.

## Direction

**Agriculture for All — Together for a Sustainable Future**, the approved event language carried in the artwork itself.

The site is **English only**. Where the approved artwork itself carries bilingual lockups, the artwork is shown untouched, but no Arabic is repeated as website copy.

The narrative follows the deck's own four movements: **Fertilizer → Agriculture → Development → Building the Future**, and then walks the identity through the physical event.

## Structure

31 presentation sections. **One approved visual = one dedicated full-width section** &mdash; no cards, grids or mosaics.

| # | Section | Artwork | # | Section | Artwork |
|---|---|---|---|---|---|
| 01 | Cover | page-01 | 17 | The Stage | page-14 |
| 02 | The Opportunity | — | 18 | Stage — Front Elevation | page-15 |
| 03 | The Big Idea | — | 19 | Stage — From the Floor | page-16 |
| 04 | The Statement | — | 20 | Arrival — Gate 01 | page-18 |
| 05 | Visual World | page-03 | 21 | Arrival — Gate 02 | page-19 |
| 06 | Identity | page-02 | 22 | Registration | page-20 |
| 07 | Colour + Type | page-04 | 23 | Registration — Detail | page-21 |
| 08 | Visual Mood | page-07 | 24 | Sponsor Feature Wall | page-22 |
| 09 | Hero Key Visual | page-05 | 25 | Side Screen | page-23 |
| 10 | Key Visual — Portrait | page-06 | 26 | Exhibitor Wall | page-24 |
| 11 | Application — Brand Panel | page-08 | 27 | Meeting Room | page-25 |
| 12 | Application — Billboard | page-09 | 28 | The Exhibition | page-26 |
| 13 | Application — Posters | page-10 | 29 | Exhibition Booth — Unit | page-27 |
| 14 | Application — Street Banner | page-13 | 30 | Wayfinding | page-28 |
| 15 | Collateral — Notebook | page-11 | 31 | Closing | page-29 |
| 16 | Collateral — Tote + Badge | page-12 | | | |

`page-17.jpg` is retained in the repository but not displayed: it is the same stage render as `page-15.jpg` (mean pixel difference 2.24/255, differing only in the caption column).

## Artwork rules

Approved artwork is **never** altered. No opacity reduction, gradients, overlays, blend modes, rotation, masking, decorative cropping, or transforms that change composition. Every visual is shown whole at its native 16:9 ratio, with captions placed below the image.

`assets/visuals/1280/` holds 1280×720 delivery derivatives — a pure downscale at the identical ratio, used via `srcset`. The full-resolution originals in `assets/visuals/` remain the source.

## Colour

Taken from the approved palette page (page-04):

| Token | Hex | Role |
|---|---|---|
| Growth green | `#3AB54B` | palette |
| Deep forest | `#27492F` | palette, accent on cream |
| Natural green | `#4B8244` | palette |
| Soft green | `#74A86E` | palette |
| Accent gold | `#F7CB2C` | palette, accent on dark |
| Organic cream | `#ECF3EA` | ground, text on dark |
| Dark green anchor | `#2A4830` | ground |
| Slide dark | `#192E1F` | ground, text on cream |

## Logo assets

| File | Origin |
|---|---|
| `assets/logo/AFA-2.png` | Supplied — AFA association logo, horizontal, white only |
| `assets/logo/AFA-White.png` | Supplied — AFA association logo, stacked, white only |
| `assets/logo/paradigm-white.png` | Extracted from the approved deck (page-04) |
| `assets/logo/paradigm-dark.png` | Extracted from the approved deck (page-02) |
| `assets/logo/mark-leaf.png` | Extracted from the approved deck (page-02) |
| `assets/logo/mark-nutrient.png` | Extracted from the approved deck (page-02) |
| `assets/logo/mark-land.png` | Extracted from the approved deck (page-02) |

The Paradigm lockups and the three identity marks are lifted directly from the approved artwork — none is redrawn or reconstructed. Replace `paradigm-white.png` / `paradigm-dark.png` with the official vector when it is supplied.

There is **no AFA logo in the site header**, by design.

## Open items

- The deck's page-03 gives identical descriptions for *Development* and *Building the Future*. Reproduced faithfully; awaiting corrected copy.
- The deck's page-04 labels its fifth palette swatch `#ECF3EA` while rendering gold; the sampled value is `#F7CB2C`. Both are carried in the palette.
- Event dates and venue are not stated anywhere in the deck and are therefore not shown on the site.
- The deck specifies a "primary font" but does not name it. The site uses Archivo (display) and Poppins (text) as the closest available match.
