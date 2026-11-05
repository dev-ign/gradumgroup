# Intake discovery — 2026-11-04

Inspected the Interactive form page, individual desktop and mobile frames, foundations, states, motion, branch map, and responsive/accessibility annotations through Figma MCP. Source: file `dChZ0b0OUoOUCt8gKUctoJ`, page `337:1216`.

- Actual application: React 19, Vite 7, TypeScript 5.9, Tailwind 4, React Router 7, Framer Motion 12. Existing Playwright infrastructure supersedes the stale “no tests” AGENTS note.
- Canonical CSS already matches Figma: Red Hat Display/Text/Mono, brand/lime/mint/brand-soft/muted. No new font or animation dependency is needed. Existing Button and brand assets can be composed.
- No Sanity dependency, provider, schema, environment configuration, or prior documented CMS selection was found. Existing documents mention future CMS boundaries only. The supplied brief establishes Sanity as the future choice.
- No analytics vendor or consent manager found. Analytics will default to a no-op adapter with a fixed metadata allowlist.
- `/api/contact` sends real mail through Resend. It lacks versioned flow/routing support; the intake will use a labeled mock adapter instead.
- Existing Vercel SPA rewrite includes `/start`; no deployment change is needed.

## Decisions before implementation

Use a lazy route with the existing providers and a dedicated focused layout (no marketing navigation/footer), as explicitly shown in Figma. Content provider → validated versioned definition → pure engine → React presentation. CMS owns questions/options/declarative conditions/copy/routing; application owns behavior and validation semantics.

Figma fully specifies Engineering → specialty → experience → coverage → interests → availability → contact → review. The map names Architecture, Construction (trade + crew size), PM scope/certifications, Services and Other without defining options. Use minimal text qualification for those named branches rather than inventing option catalogs. Their wording and Spanish translations need editorial approval. Client is explicitly “next phase”; implement only approved need choices (Consulting, Construction, Services, Not sure yet), shared contact and review. Defer detailed client consultation.

Preserve local drafts for seven days, excluding the contact group and consent. Explain that contact details must be re-entered after resuming. Keep inactive answers in session memory; persist only active non-contact answers. Mock confirmation must say nothing was delivered, correcting the otherwise misleading Figma production confirmation. Native radio behavior and an explicit Continue escape hatch take precedence over an inaccessible custom keyboard model.
