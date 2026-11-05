# Intake visual asset provenance

All new icons are downloaded SVGs returned by Figma design context, stored under `public/assets/intake/`. No temporary Figma asset URL is referenced at runtime. Existing exact brand assets are composed through `BrandLogo` (`public/assets/figma/gradum-mark.svg` and `gradum-wordmark.svg`). No design screenshot is used as a UI asset.

| Local SVG | Figma source frame | Native dimensions | UI slot |
| --- | --- | --- | --- |
| briefcase, people | `345:1147` | 26 × 26 | Relationship card icon tiles |
| close | `345:1147` | 20 × 20 | Exit control |
| dot-active, dot-inactive | `345:1147` | 7 × 7 | Header stages |
| arrow-left | `345:1316` | 20 × 20 | Back |
| architecture, engineering, construction, project-management, business-services, other | `345:1316` | 22 × 22 | Work category choices |
| arrow-right | `346:902` | 20 × 20 | Continue, submit, return |
| lock | `347:911` | 18 × 18 | Contact privacy message |
| check-success | `347:1242` | 32 × 32 | Confirmation circle |
| check-stage | `347:1242` | 14 × 14 | Completed header stages |
| check-selected | `342:53` | 16 × 16 | Selected radio/checkbox indicators |
| check-context | `346:527` | 12 × 12 | Branch context pill |

All 18 SVG files were checked for non-empty content and native width/height. `.intake-icon` preserves native dimensions with no broad width/height override. Browser tests verify loading of visible images; rendered entry, specialty, review and confirmation screenshots were inspected against individual Figma frames. Desktop/mobile brand geometry follows the existing exact logo composition and Figma's 124px/97px logo widths.
