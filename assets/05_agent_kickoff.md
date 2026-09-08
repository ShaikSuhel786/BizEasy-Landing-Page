# BizEasy Agent Kickoff

You are starting the BizEasy landing-page visual foundation implementation.

Read and follow these artifacts in order:

1. `00_design_direction.md`
2. `01_color_exploration_direction.md`
3. `02_design_system_foundation.md`
4. `03_tokens.json`
5. `04_brand_guidelines.md`

Also load and obey the existing project skills:
- `bizeasy-web-task-runner` as master execution/orchestration authority
- `bizeasy-landing-spec` as canonical landing-page/product/design authority
- `design-taste-frontend` as anti-slop and frontend quality gate

## Immediate task

Create the first production-grade landing-page foundation using the approved/provisional visual direction:

**Signal + Tangerine**

Do not redesign the logo.

Do not start by making a generic full landing page.

First implement the visual foundation and one representative hero composition that proves:
- color hierarchy
- typography hierarchy
- CTA treatment
- product visual treatment
- shape language
- spacing
- responsive behavior
- the directional/motion thesis

## Color rules

Use:
- brand primary `#4155E5`
- primary hover `#3995FB`
- counterpoint `#F47745`
- deep ink `#111522`
- surface `#F5F6F8`
- raised surface `#FFFFFF`
- border `#E7EAF0`
- text secondary `#667085`

Semantic:
- success `#16865F`
- warning `#D59620`
- error `#D84A4A`
- info `#4187E8`

Do not improvise additional brand colors.

Do not make the whole page blue.
Do not introduce purple, generic SaaS gradients, WhatsApp green as the brand accent, beige/brass premium styling, or decorative color noise.

## Implementation requirements

- use semantic design tokens, not scattered hex literals
- verify dependencies before importing
- use the existing project architecture rather than creating parallel systems
- use real/generated product imagery where needed
- do not build fake screenshots out of arbitrary div rectangles
- implement reduced-motion behavior
- use transform/opacity for animation
- avoid window scroll listeners
- preserve mobile stability
- test light and dark behavior if the project requires dual-mode, but do not invent a second visual identity

## Completion gate

Before declaring this task complete, verify:
1. color consistency
2. contrast
3. typography hierarchy
4. mobile layout
5. hero first-viewport fit
6. motion behavior
7. reduced motion
8. no forbidden AI-slop patterns
9. no duplicated token definitions
10. no arbitrary new colors

Do not proceed into the full page until the foundation and representative hero pass review.
