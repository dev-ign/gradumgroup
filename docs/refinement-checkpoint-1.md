# Refinement checkpoint 1 — shared visual system

Scope: global refinement only. The existing React routes, typed bilingual content, section components, and future CMS boundaries are preserved. Page-specific composition fixes are deliberately queued for the requested checkpoints.

## Audit evidence

Compared all 16 supplied Figma nodes with rendered desktop routes before editing. Retrieved design context for every supplied frame, plus the Home header, footer, headline stack, and primary image. Captured all routes before and after at 1440px. Figma uses a 1440px reference canvas; no mobile-specific frames were supplied.

Source file: [Gradum in Figma](https://www.figma.com/design/dChZ0b0OUoOUCt8gKUctoJ/Gradum?node-id=204-2).

## Global discrepancies and changes

| Area | Audit finding | Checkpoint 1 change |
| --- | --- | --- |
| P1 Typography | At 1440px, H1s rendered at 60.48px/62.9px, weight 700, with negative tracking. Most Figma landing headlines are 52px/60px, weight 900; detail headlines are 48px/56px. Card copy was commonly 13–14px rather than 16px. | Added hero and section type tokens; corrected landing/detail scale and weight, shared card text, body leading, and Red Hat Mono labels. Individual editorial overrides remain for later checkpoints. |
| P1 Container/max width | The 1240px cap was already correct at 1440px, but the fixed 24px side margin gave inconsistent proportions at narrower desktop widths. Footer and header maintained separate formulas. | One 1240px container token and responsive gutter rule shared by header, content shells, and footer. At 1440px: 100px gutters. At 1600px: 180px gutters. Mobile: 16–24px. |
| P1 Navigation | Header was 119px including its border instead of 136px. Logo parts, 14px navigation type, 48px CTA, and spacing were undersized. | Restored 136px desktop height, 124 × 47.76px logo composition, 16px navigation, 48px item gaps, exact exported chevron, and 56px CTA. Mobile header stays 88px. |
| P1 Footer | Height was approximately 369px against Figma's 451px. Text, column gaps, top padding, and divider spacing were compressed. | Restored 96px top / 48px bottom padding, 64px divider spacing, 22px brand, 16px summary, 15px links, 13px labels, and 72px desktop column gaps. Rendered height is approximately 453px. Kept the existing language selector and added its pressed state. |
| P2 Section spacing | Shared templates mixed near-duplicate values such as 74/80 and 90/98px. | Added 60/80/100/140px section tokens with mobile equivalents; applied them to shared landing, detail, tools, and CTA primitives. Section headings use a 20px text gap and 64px grid separation. Per-page boundaries remain under their checkpoints. |
| P2 Buttons | Primary buttons were 52px tall with roughly 15px text; header CTAs were 48px tall with roughly 13px text. The dialog used a separate hardcoded button treatment. | Unified the existing Button component and marketing classes around the same pill/outline rules. Standard primary: 56px minimum height, 20px text, 32px horizontal padding. Header: 56px/16px/20px. Mobile wraps long labels instead of shrinking type. |
| P2 Radii | Images/cards mixed 18/20/22px; Figma distinguishes thumbnails, cards, panels, and large photos. | Named 8px control, 14px thumbnail, 18px list image, 20px card, 24px panel, and 28px hero-image tokens. Pill shapes retain a full radius. |
| P2 Colors | Construction and Services colors were approximations; consulting's soft background differed from the reference. | Figma tokens: construction #B7672A / #331D12 / #EBE6D7; services #4FAEC0 / #01333A / #E6FBFF; consulting soft #ECF8F1. Existing dialog surface/text tokens were missing and now alias the new palette. |
| P2 Mega-menu | 680px panel, oversized shadow, and a hover/focus interaction that could close on the first keyboard activation. Horizontal CSS translation also competed with Framer's transform. | 560px panel with 220px family column, lighter shadow, 20px radius, continuous hover bridge, family-tinted selected state, and 150ms transition. Added roving vertical tabs, ArrowRight to links, outside/blur dismissal, Escape focus return, and breakpoint cleanup. |
| P3 Motion/accessibility | Entire cards moved 5px; page transitions moved 16px. CSS reduced-motion rules did not govern Framer transforms. | Restrained card movement to 1px, page entry to 4px/220ms, explicit reduced-motion behavior for page/navigation, and a shared MotionConfig. Mobile navigation keeps focus within the header/menu and marks background content inert. |

These changes propagate to all 16 routes. The shared landing rules benefit Consulting, Construction, and Services together; the detail rules benefit all nine subpages. No page component or content schema was rewritten.

The final dialog inspection also exposed an unlayered universal margin/padding reset overriding Tailwind's spacing utilities. Removed that duplicate reset and retained Tailwind Preflight, restoring the existing dialog's intended padding without changing its markup.

## Remaining global review items

- The supplied frames use Avenir/Avenir Next for navigation and some page copy. Navigation uses the installed font where available with Red Hat Text as fallback; no licensed Avenir webfont exists in the repository. Cross-platform exact font matching remains dependent on that asset.
- The supplied frames do not contain an expanded mega-menu or mobile designs. Those treatments follow the existing navigation architecture and the handoff's visual/interaction guidance; they are not claimed as exact Figma matches.
- Figma's small accent text colors fail 4.5:1 on white (Consulting 3.02:1, Construction 4.21:1, Services 2.58:1). Shared small labels/links use darker semantic foreground variants at 4.77:1, 4.76:1, and 5.03:1; decorative accent colors retain Figma values. This is an intentional accessibility adjustment. Page-owned metadata colors remain for their later checkpoints.
- Client Portal still points to the existing `#client-portal` placeholder. A real destination has not been supplied.

## Page audit — queued work, not included in checkpoint 1

| Route / Figma node | Priority | Remaining composition differences |
| --- | --- | --- |
| Home / 204:2 | P1 | Mixed headline weights/accent, right collage crops (source images are composite sheets), circular flags, primary 80px hero CTA, section heights, discipline card content/proportions, and lower CTA overlay. |
| About / 204:3 | P1 | Intro column balance, image strip proportions, team widths/crops, generous section separation, and lower panel padding. |
| Consulting / 285:3488 | P1 | Collage crop and placement, focus cards should be image-backed rather than icon rows, technical illustration, statement layout, tools/CTA spacing. |
| Capabilities / 285:3574 | P1 | Heading/copy widths, wide photo crop, capability grid alignment, and dark lower CTA composition. |
| Industries / 285:3614 | P2 | Row/thumb dimensions, separator and label alignment, and final two-action CTA. |
| How We Work / 285:3659 | P1 | Current feature grid must become the structured six-step vertical process beside the image; dark CTA treatment differs. |
| Construction / 285:3701 | P1 | Building collage proportions/crop, service thumbnail dimensions, architectural line illustration, statement and Explore spacing. |
| Architecture / 285:3766 | P2 | Hero split widths, photo proportions, and 2×2 capability spacing. |
| Engineering / 285:3803 | P1 | Wide image composition, grid spacing, and vertical boundaries. |
| Build / 285:3837 | P1 | Image crop and horizontal four-stage process with top accent rules. |
| Services / 285:3870 | P1 | Hero collage proportions, service rows, statement text/chart composition, and CTA spacing. |
| Accounting & Finance / 285:3921 | P2 | Hero proportions, capability spacing, lower split photo/heading balance. |
| Marketing & Media / 285:3957 | P1 | Hero split, dark feature card and adjacent rows, and image-backed lower CTA (currently rendered as a split section). |
| Admin & Legal / 285:3988 | P1 | Vertical service list with numbered rows should replace the current grid; image crop and CTA proportions need adjustment. |
| Ventures / 291:5936 | P2 | Hero image width, staggered editorial card proportions, and dark closing section. |
| Insights / 291:5980 | P1 | Hero uses the smaller 48px variant in Figma; index spacing, filter/metadata type, article proportions, and filtering behavior remain. Current buttons are inert and articles/links are placeholders despite the handoff describing functional filtering. |

This table covers hero variants, cards, section headers, CTA sections, image treatments, content grids, process lists, and the page/family-specific categories requested in the handoff. The global table covers typography, containers, gutters, navigation, buttons, footer, and section spacing.

## Validation

- `npm run lint`: passed.
- `npm run build`: passed using the bundled Node 24 runtime; the shell's Node 22.9 is below Vite 7's supported minimum.
- All 16 routes rendered at 1440px before and after; no console errors or failed images.
- All 16 routes checked at 320, 375, 390, 430, 768, 820, 1024, 1280, 1440, and 1600px after waiting for resize layout to settle. No document, shared-control, or text-box horizontal overflow. This is a checkpoint regression check, not completion of the final per-page responsive pass.
- Visually reviewed desktop header/footer/menu, 320px footer, 390px mobile navigation, and 820px header; captured representative full-page responsive screenshots.
- Verified keyboard Enter/Tab, family ArrowUp/Down/Home/End, ArrowRight into links, Escape/focus return, and Tab dismissal. Verified pointer path Platform → Consulting → Capabilities.
- Verified nested mobile navigation to Accounting & Finance, Escape, background inert state, and releasing the scroll lock when resizing to desktop.
- Verified Spanish shared layouts at 320, 390, 820, 1280, and 1440px.
- Verified restored contact dialog surface colors and Escape without submitting the form. Sending email was not part of this checkpoint.

Stop here for user review. Checkpoint 2 is Home and About only.
