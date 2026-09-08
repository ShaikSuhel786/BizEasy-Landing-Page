# BizEasy - Design System Foundation

## 1. Color

### Primitive colors

Brand:
- blue-500 `#4155E5`
- blue-400 `#3995FB`
- orange-500 `#F47745`

Neutrals:
- ink-950 `#111522`
- ink-800 `#252B38`
- slate-600 `#667085`
- mist-100 `#E7EAF0`
- cloud-050 `#F5F6F8`
- white `#FFFFFF`

Semantic:
- success `#16865F`
- warning `#D59620`
- error `#D84A4A`
- info `#4187E8`

### Semantic usage

- `brand.primary` = BizEasy blue
- `brand.counterpoint` = tangerine
- `surface.default` = cloud
- `surface.raised` = white
- `text.primary` = deep ink
- `text.secondary` = slate
- `action.primary` = BizEasy blue
- `action.primary.hover` = brighter blue
- `status.success` = semantic green
- `status.warning` = semantic amber
- `status.error` = semantic red

Do not use raw primitive colors directly inside components when a semantic token exists.

## 2. Typography

Use a strong modern sans-serif display direction.
Preferred first test:
- Display: Geist Sans / Geist Display if available
- Body: Geist Sans
- Mono: only for technical metadata when genuinely useful

Avoid default Inter usage unless existing project constraints require it.
Do not introduce a decorative serif merely to make the site feel premium.

Display hierarchy:
- H1: 56-72px desktop, responsive down to 40-48px mobile
- H2: 40-52px desktop
- H3: 28-36px desktop
- Body: 16-18px
- Small: 13-14px

Headlines should generally use tight tracking and tight line-height without clipping italic descenders.

## 3. Shape language

Default geometry:
- Cards: 16px radius
- Buttons: 999px only when pill treatment is intentionally part of the interaction language
- Inputs: 10-12px
- Do not mix unrelated radius systems casually.

## 4. Shadows

Prefer subtle tinted shadows or borders.
Do not use heavy black drop shadows.

## 5. Layout

- max content width: 1280-1400px
- use CSS Grid for complex page composition
- asymmetric desktop layouts are encouraged
- mobile must collapse intentionally below 768px
- hero uses `min-h-[100dvh]` rather than `h-screen`
- hero headline should generally remain within two lines on desktop

## 6. Imagery

Use real, generated, or actual product imagery.
Prioritize:
1. real product UI
2. generated contextual photography where needed
3. editorial crop and scale over decorative stock collage

Avoid:
- generic office stock
- fake device frames
- fake dashboards built from rectangles
- random texture overlays

## 7. Motion

Motion intensity target: 6.
Design variance target: 8.
Visual density target: 4.

The signature motion concept:
**floating interaction -> directional movement -> product integration -> settle**

Use Motion or GSAP only when the interaction genuinely benefits from it.
Honor reduced motion.

## 8. Accessibility

- body text: WCAG AA minimum
- target AAA where practical for primary reading text
- CTA contrast must be checked
- focus states must remain obvious
- reduced-motion behavior is mandatory

## 9. Anti-slop requirements

Do not use:
- AI purple/blue glow gradients
- endless glassmorphism
- three identical feature cards
- excessive eyebrows
- numbered section labels
- decorative metadata strips
- fake version labels
- fake product status footers
- repeated zigzag sections
- random serif emphasis
- arbitrary colored dots
- visual decoration without a communicative job
