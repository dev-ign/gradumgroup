# Performance and rendering audit

## Rendering diagnosis and repair

The missing-content report was reproducible on Home. An instant jump from the top to the bottom left seven intervening `Reveal` children at `opacity: 0`. Viewport `StaggerGroup` used `initial="hidden"`; its children inherited that state and depended on `whileInView` firing on the parent. A fast jump can skip an observed section, so those children stayed hidden until a later scroll entered it. Nested inherited groups made a missed parent trigger hide multiple descendants at once.

Viewport groups now render content visibly by default. When the intersection observer sees a group, its children run the same subtle opacity and vertical entrance keyframes with the existing stagger timing. A missed intersection leaves the content visible. Mount-triggered hero sequencing remains, and reduced-motion mode animates immediately to the visible state. The shared implementation uses no scroll handler or timer for reveals.

The layout's route effect previously called `window.scrollTo(0, 0)` under global `scroll-behavior: smooth`, allowing a route change to scroll through the previous page while its exit animation ran. New navigations now jump to the top instantly in a layout effect. Browser back and forward keep native scroll restoration; the Playwright history test checks the restored position. The persistent Navbar and Footer still mount only once.

Desktop mega-menu testing found a separate navigation race: hovering opened Platform, and the following pointer click toggled it closed. Pointer clicks now keep the menu open; keyboard activation still toggles it. The existing hover bridge remains in place.

The pasted brief mentioned a screen recording, but no recording was present with the supplied text. Diagnosis used source inspection and a reproduced fast-scroll failure in the browser.

## Image delivery

The 38 selected designer originals total **397.0 MiB**. The repeatable Pillow pipeline keeps those originals in their existing folders and generates 160, 480, 960, and 1600 px WebP variants, plus 1920 px for wide statement imagery where useful. Every photo has a quality 88 progressive JPEG fallback. The three existing Home hero portraits get quality 92 WebP versions with their PNG originals as fallback. At their largest WebP widths, all 38 designer photos total **6.4 MiB**; all responsive WebP widths and JPEG fallbacks together total **23.3 MiB**. The Home hero portraits drop from **418 KiB** of PNGs to **49 KiB** of WebPs for modern browsers.

`OptimizedImage` supplies `srcSet`, role-specific `sizes`, intrinsic dimensions, and a React-managed fallback if WebP fails. First-viewport hero photos load eagerly, with one high-priority image per route. Below-the-fold cards and bands load lazily. Existing CSS crops, object positions, overlays, aspect ratios, and image selections remain. Home's hero composition is unchanged. The production build verifies derivative coverage, then excludes designer originals and unused root raster assets from `dist`; the finished directory is **26.7 MiB**. Development keeps the original source files available for regeneration.

Desktop and mobile browser inspection covered the Consulting mosaic, Services mosaic, Accounting hero, and the tablet Services crop. Four representative 1600–1920 px WebPs measured 37.3–42.3 dB PSNR against downsampled originals; crop positions stayed aligned. The full per-file dimensions and byte counts are in [image-delivery-audit.csv](image-delivery-audit.csv).

Regenerate assets with:

```bash
python3 -m pip install -r scripts/requirements-images.txt
npm run images:build
npm run build
```

Commit the generated `public/assets/optimized/` files and `src/data/optimizedImages.json` together. `npm run build` checks that every referenced photo has derivatives and that those files exist.

## Lab measurements

Lighthouse 12.8.2 ran in headless Chrome with its default mobile throttling against the local production preview. The **Original images** column is a controlled build of the final code serving the original image URLs; fonts, motion, and layout were held constant. Each result is one cold-cache lab run, so small score differences are noise. These are not real-user 75th-percentile Web Vitals.

| Route and image delivery | Score | FCP | LCP | TBT | CLS | Total transfer |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Home, original images | 74 | 2.0 s | 7.2 s | 80 ms | 0 | 36,079 KiB |
| Home, optimized images | 88 | 2.3 s | 3.5 s | 50 ms | 0 | 501 KiB |
| Accounting detail, original images | 59 | 2.3 s | 98.7 s | 540 ms | 0 | 24,872 KiB |
| Accounting detail, optimized images | 89 | 2.3 s | 3.5 s | 0 ms | 0 | 380 KiB |

The very large original Accounting photo explains the extreme throttled LCP in its single lab run. The optimized pages still miss the aspirational 2.5 s LCP and 90+ Lighthouse targets in this environment. Their remaining delay is primarily startup/render timing rather than image transfer; Lighthouse reported zero layout shift and negligible blocking time in the final runs. INP and 75th-percentile Core Web Vitals require real-user measurement and cannot be inferred from these lab runs.

## Verification

`npm run lint`, `npm run build`, and all **36 Playwright production checks** pass. The suite loads all 16 routed pages directly on desktop and mobile, jumps past reveal groups and checks computed ancestor opacity, returns to the top, checks responsive geometry, navigates through desktop and mobile menus, follows related detail routes, refreshes, uses back and forward with scroll restoration, emulates reduced motion, and delays or fails image requests while checking text and reserved hero space. It also captures page errors. Run it with `npm run test:e2e` after regenerating assets.

This machine runs Node 22.9.0, below Vite 7's stated 22.12+ minimum for the Node 22 line; builds and tests completed, but the runtime should be upgraded for routine development and CI.
