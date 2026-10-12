# Imagery integration audit

The final asset pass uses 38 of the 70 supplied images. The supplied files remain in their original folders and formats. `Construcción` has a decomposed accent in its directory name; code uses `\u0301` to match that filesystem path. Production pages now request responsive derivatives from `public/assets/optimized/`; the selected originals are retained only as sources for regeneration.

## Page coverage

| Route | Designer asset categories |
| --- | --- |
| Home, below the hero | Tech, Construcción, Finanzas, Personas |
| Consulting and its detail pages | Tech, Personas, Construcción, Finanzas |
| Construction and its detail pages | Construcción |
| Services and its detail pages | Finanzas, Creatividad, Personas |
| Ventures | Personas, Construcción |
| Insights | Personas, Tech, Construcción, Finanzas |

About has no placeholder photography; its existing brand arrow remains. The Home hero imagery was not changed. The existing country flags and brand graphics remain because they are functional or decorative identity elements.

## Image delivery

The 38 referenced designer originals total 397.0 MiB across all routes. Their largest WebP derivatives total 6.4 MiB, and the complete derivative set, including smaller widths and JPEG fallbacks, is 23.3 MiB. No selected original designer photo is copied into the production build. The existing Home hero composition is preserved; its three PNG portraits now have WebP delivery with PNG fallback, reducing their combined modern-browser transfer from 418 KiB to 49 KiB.

See [performance-audit.md](performance-audit.md) for the rendering diagnosis, lab measurements, verification, and regeneration commands. The per-image source dimensions and byte counts are in [image-delivery-audit.csv](image-delivery-audit.csv).

## Supplied assets not used

Unused images were omitted because a stronger semantic or crop match was available, or because a near-duplicate would make a page repetitive.

### Personas (17)

- `authentic-small-youthful-marketing-agency (1).jpg`
- `authentic-small-youthful-marketing-agency (4).jpg`
- `authentic-small-youthful-marketing-agency (5).jpg`
- `authentic-small-youthful-marketing-agency.jpg`
- `low-angle-latin-friends-hanging-out.jpg`
- `medium-shot-latin-friends-hanging-out (2).jpg`
- `medium-shot-latin-man-holding-tablet.jpg`
- `medium-shot-smiley-woman-with-coffee-cup.jpg`
- `medium-shot-smiley-women-high-five (1).jpg`
- `medium-shot-smiley-women-high-five.jpg`
- `medium-shot-woman-sitting-table.jpg`
- `middle-aged-hispanic-business-people (1).jpg`
- `middle-aged-hispanic-business-person (2).jpg`
- `middle-aged-hispanic-business-person.jpg`
- `pretty-young-business-woman-working-laptop-modern-office.jpg`
- `side-view-latin-friends-hanging-out.jpg`
- `woman-with-curly-hair-holds-modern-mobile-phone-stands-hi-tech-building-big-city-surrounding-dressed-casual-jumper-strolls-street.jpg`

### Tech (1)

- `people-office-work-day.jpg`

### Finanzas (4)

- `ChatGPT Image 29 jun 2026, 01_28_55 p.m..png`
- `high-angle-woman-working-laptop (1).jpg`
- `woman-working-laptop-high-angle (1).jpg`
- `woman-working-laptop-high-angle.jpg`

### Creatividad (1)

- `portfolio-website-teachers-with-modern-high-school-theme-education-web-layout-idea-design.jpg`

### Construcción (9)

- `back-view-hispanic-female-project-manager-caucasian-male-civil-engineer-walking-discussi.jpg`
- `high-angle-man-choosing-colors.jpg`
- `medium-shot-smiley-people-working-together (1).jpg`
- `medium-shot-smiley-people-working-together.jpg`
- `medium-shot-smiley-women-work.jpg`
- `medium-shot-woman-working-with-laptop.jpg`
- `side-view-colleagues-choosing-color.jpg`
- `side-view-employee-working-project.jpg`
- `side-view-woman-working-desk.jpg`
