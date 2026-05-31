---
name: SJA Gestalt
description: Clinical gestalt training for first responders — rapid sick/not-sick decisions on real patient scenarios.
colors:
  warm-bone-bg: '#F6F5F1'
  surface: '#FCFBF8'
  surface-raised: '#FFFFFF'
  ink: '#1A1E1B'
  ink-soft: '#5A615B'
  ink-faint: '#686D67'
  line: '#E2E0D8'
  line-strong: '#CFCCC0'
  deep-pine: '#0B5E3B'
  pine-dark: '#084A2E'
  pine-soft: '#E6F0EA'
  terracotta: '#B23A2E'
  terracotta-soft: '#F6E6E3'
  saffron: '#E8B23A'
  on-brand: '#F6F5F1'
  on-sick: '#FBF1EF'
  amber-note: '#FBF1DE'
  amber-note-text: '#8A6312'
typography:
  display:
    fontFamily: 'System, -apple-system, sans-serif'
    fontSize: '30px'
    fontWeight: 700
    letterSpacing: '0.5px'
  headline:
    fontFamily: 'System, -apple-system, sans-serif'
    fontSize: '24px'
    fontWeight: 700
  subtitle:
    fontFamily: 'System, -apple-system, sans-serif'
    fontSize: '20px'
    fontWeight: 700
  title:
    fontFamily: 'System, -apple-system, sans-serif'
    fontSize: '17px'
    fontWeight: 600
  body:
    fontFamily: 'System, -apple-system, sans-serif'
    fontSize: '15px'
    fontWeight: 400
    lineHeight: 1.47
  label:
    fontFamily: 'System, -apple-system, sans-serif'
    fontSize: '13px'
    fontWeight: 600
    letterSpacing: '0.3px'
  caption:
    fontFamily: 'System, -apple-system, sans-serif'
    fontSize: '13px'
    fontWeight: 400
  mono:
    fontFamily: 'ui-monospace, Menlo, monospace'
    fontSize: '15px'
    fontWeight: 400
rounded:
  sm: '8px'
  md: '12px'
  lg: '18px'
  pill: '999px'
spacing:
  xs: '4px'
  sm: '8px'
  md: '12px'
  lg: '16px'
  xl: '24px'
  xxl: '32px'
  xxxl: '48px'
components:
  button-primary:
    backgroundColor: '{colors.deep-pine}'
    textColor: '{colors.on-brand}'
    rounded: '{rounded.md}'
    padding: '0px 24px'
    height: '52px'
  button-primary-pressed:
    backgroundColor: '{colors.pine-dark}'
    textColor: '{colors.on-brand}'
    rounded: '{rounded.md}'
    height: '52px'
  button-secondary:
    backgroundColor: '{colors.surface-raised}'
    textColor: '{colors.ink}'
    rounded: '{rounded.md}'
    padding: '0px 24px'
    height: '52px'
  button-ghost:
    backgroundColor: 'transparent'
    textColor: '{colors.ink}'
    rounded: '{rounded.md}'
    height: '52px'
  button-disabled:
    backgroundColor: '{colors.line}'
    textColor: '{colors.ink-faint}'
    rounded: '{rounded.md}'
    height: '52px'
  verdict-not-sick:
    backgroundColor: '{colors.pine-soft}'
    textColor: '{colors.deep-pine}'
    rounded: '{rounded.md}'
    height: '64px'
  verdict-sick:
    backgroundColor: '{colors.terracotta}'
    textColor: '{colors.on-sick}'
    rounded: '{rounded.md}'
    height: '64px'
  pill-brand:
    backgroundColor: '{colors.pine-soft}'
    textColor: '{colors.pine-dark}'
    rounded: '{rounded.pill}'
    padding: '4px 12px'
  pill-neutral:
    backgroundColor: '{colors.line}'
    textColor: '{colors.ink-soft}'
    rounded: '{rounded.pill}'
    padding: '4px 12px'
  pill-warn:
    backgroundColor: '{colors.amber-note}'
    textColor: '{colors.amber-note-text}'
    rounded: '{rounded.pill}'
    padding: '4px 12px'
  mcq-option-idle:
    backgroundColor: '{colors.surface-raised}'
    textColor: '{colors.ink}'
    rounded: '{rounded.md}'
    padding: '16px'
    height: '60px'
  mcq-option-correct:
    backgroundColor: '{colors.pine-soft}'
    textColor: '{colors.deep-pine}'
    rounded: '{rounded.md}'
    padding: '16px'
  mcq-option-wrong:
    backgroundColor: '{colors.terracotta-soft}'
    textColor: '{colors.terracotta}'
    rounded: '{rounded.md}'
    padding: '16px'
---

# Design System: SJA Gestalt

## 1. Overview

**Creative North Star: "The Field Medic's Notebook"**

This is a clinical training tool used under stress, outdoors, one-handed. The aesthetic reflects a well-thumbed field notebook: warm bone paper, ink that has settled into the page, purposeful structure with no decorative noise. Every design decision exists to accelerate a clinical decision, not to express brand personality.

The system explicitly rejects clinical white (sterile, generic hospital-app), emergency green (first-reflex SJA-official), and the neon-red or alarm-orange typical of emergency-services interfaces. Alarm color is earned through context. It appears only when the stakes demand it, always paired with an icon and text label so color is never the sole signal. The "Why is this not first-aid slop?" answer: surfaces are warm bone, the green is dark sophisticated pine (not emergency green), there is no cross anywhere, and the red is a muted terracotta-clay.

The experience is calibrated for sunlight legibility. An SJA volunteer at a crowded outdoor county show, glancing one-handed between patients, should be able to read a primary survey, make a verdict call, and move to the next scenario in under 30 seconds. Density is a virtue here. Touch targets are generous (52px base, 64px for verdict buttons). Motion is restrained: swipe commits in 200ms on an ease-out curve; MCQ and verdict presses give haptic feedback; nothing bounces, nothing animates decoratively.

**Key Characteristics:**

- Light-only (sunlight legibility; no dark mode at launch)
- Warm bone/cream surfaces, never clinical white or pure black
- Semantic alarm color paired with icon and label (never color alone)
- Touch targets 52px minimum (64px for the verdict decision)
- Monospace numerals for clinical vitals; system sans for all other text
- Tonal-layering depth model; patient card is the only true raised surface
- No decorative shadows, glassmorphism, gradient text, or side-stripe borders
- The `UnofficialBanner` appears wherever clinical content is visible; it is not dismissable

## 2. Colors: The Pine and Bone Palette

Restrained at the surface level; Committed at the decision moment. The base layer is warm neutrals tinted lightly toward the brand green hue so nothing reads as hospital white or pure black. At the verdict decision, the palette commits fully to two opposing semantic poles: Deep Pine for "not sick," Terracotta for "sick."

### Primary

- **Deep Pine** (`#0B5E3B`): Brand primary. Primary action buttons, active/selected states, correct-answer reveals, and the "Not Sick" verdict button. Never decorative. Earns its presence through function alone.
- **Pine Dark** (`#084A2E`): The pressed-state deepening of Deep Pine. Applied only during active interaction; not used as a standalone surface color.
- **Pine Mist** (`#E6F0EA`): Tint background for brand, correct, and "not sick" states. Also the verdant wash behind selected segmented segments.

### Secondary

- **Terracotta Alarm** (`#B23A2E`): The "sick" verdict, wrong-answer reveals. A muted terracotta-clay red; chosen to read as alarm without the clinical-emergency or emergency-services connotation of fire-engine red. Always paired with an icon and text label.
- **Terracotta Wash** (`#F6E6E3`): Tint background for sick and wrong-answer reveal states.

### Tertiary

- **Warm Saffron** (`#E8B23A`): Informational accent only. Appears on the `UnofficialBanner`, the warn pill, and status notes. Cap: under 10% of any screen. Forbidden on interactive controls.
- **Amber Parchment** (`#FBF1DE`): Warm background behind saffron-toned informational content.
- **Amber Brown** (`#8A6312`): Text on Amber Parchment. Achieved through contrast, not through heavy weight.

### Neutral

- **Warm Bone** (`#F6F5F1`): The page. All screen backgrounds. Lightly green-tinted so it reads as warm, never clinical white.
- **Cream Parchment** (`#FCFBF8`): Panel and card surfaces. One luminance step above Warm Bone, establishing a ground/figure relationship.
- **Clean Sheet** (`#FFFFFF`): Raised interactive surfaces: the patient card, MCQ option rows, segmented-control active segment. Reserved for maximum contrast where legibility is critical.
- **Forest Night** (`#1A1E1B`): Primary text. Near-black with a green tint; never pure `#000`.
- **Aged Moss** (`#5A615B`): Secondary text, table labels, disclosure row headers.
- **Dusty Sage** (`#686D67`): Disabled state text and placeholder text. Darkened from original #8C918B to meet WCAG AA (4.5:1) on the Warm Bone background.
- **Dry Grass** (`#E2E0D8`): Hairline borders, the segmented-control track background.
- **Warm Stone** (`#CFCCC0`): Stronger borders on secondary buttons.

### Named Rules

**The Non-Color-Alone Rule.** Every instance of Terracotta or Deep Pine in a semantic context (sick/not-sick, correct/wrong) must be paired with a text label and an icon. Colorblind users see the same information as everyone else. Color is reinforcement, not signal.

**The Saffron Ceiling Rule.** Warm Saffron covers under 10% of any given screen. Its rarity is what makes it readable as "note, not action." Saffron on a button, input, or segmented control is a design error.

## 3. Typography

**Display/Heading/Body Font:** System default (SF Pro on iOS, Roboto on Android, with `sans-serif` as fallback). The native font is a deliberate choice: native legibility, platform affordances, zero loading time.
**Clinical Numerals Font:** `ui-monospace` / Menlo (iOS) / `monospace` (Android). Used exclusively for vitals, clinical values, and tabular numeric data.

**Character:** Two roles, sharply divided. System sans for everything editorial and interactive; monospace for everything clinical and numeric. The division is functional: monospace numerals align tabular data (BP, SpO2, pulse) in a single glance. Using monospace outside a clinical-value context is prohibited.

### Hierarchy

- **Display** (700, 30px, letterSpacing 0.5px): Session score reveal, scenario result totals. One instance per screen maximum.
- **Headline** (700, 24px): Section headings, results summary headers.
- **Subtitle** (700, 20px): Secondary screen headings.
- **Title** (600, 17px): Card titles, button labels, verdict button labels.
- **Body** (400, 15px, lineHeight ~22px): Scenario setting text, answer option text. Line length naturally limited by mobile viewport.
- **Label** (600, 13px, letterSpacing 0.3px): Table headers, section labels, disclosure row headers, pill text.
- **Caption** (400, 13px): Supporting metadata, timestamps, unofficial disclaimer text.

### Named Rules

**The Mono-Is-Clinical Rule.** Monospace type is for clinical numerals and vital values only. Using it for decoration, branding, or copywriting is prohibited.

**The Weight-Over-Size Rule.** Hierarchy is established first through weight contrast (700/600/400), then confirmed by size. Never set two adjacent text elements at the same weight with different sizes to create hierarchy: it reads as noise.

## 4. Elevation

A tonal-layering depth model with surgical shadow use. Three surface levels create the hierarchy: Warm Bone (page/ground), Cream Parchment (panels/field), Clean Sheet (interactive foreground). Most surfaces are flat. Shadows appear only on the two components that have physical affordances.

### Shadow Vocabulary

- **Card shadow** (`shadowColor: #1A1E1B, opacity: 0.08, radius: 16px, offset: 0 6px, elevation: 4`): The patient card only. Communicates swipe affordance. Diffuse and ambient, not structural or decorative.
- **Segment lift** (`shadowColor: #1A1E1B, opacity: 0.06, radius: 6px, offset: 0 2px, elevation: 2`): The active segment of the segmented control. Communicates selection state through a subtle "float above the track" cue.

### Named Rules

**The Flat-By-Default Rule.** Every surface starts flat. A shadow must justify itself by naming the physical affordance it communicates (swipe, selection lift). New shadows added without that justification are design errors.

**The Three-Level Rule.** The depth stack is: ground (Warm Bone), field (Cream Parchment), foreground (Clean Sheet). A surface outside this hierarchy is suspect. Nested cards at the same level violate this rule.

## 5. Components

### Buttons

Gently curved (12px radius), min-height 52px, 24px horizontal padding. Press state: 0.85 opacity + 0.99 scale. Disabled: Dry Grass fill, Dusty Sage text, same shape.

- **Primary:** Deep Pine fill (`#0B5E3B`), Moonlit Bone text (`#F6F5F1`). Default CTA.
- **Secondary:** Clean Sheet fill, 1px Warm Stone border (`#CFCCC0`), Forest Night text. Non-primary actions on the same surface.
- **Ghost:** Transparent fill, Forest Night text. Inline or low-hierarchy actions where a bordered button would add visual noise.

### Verdict Buttons (Signature Component)

The core interaction surface. Two fixed-bottom, full-width-split buttons, min-height 64px. Only used on the game verdict screen. Never reused elsewhere.

- **Not Sick (left):** Pine Mist fill, 2px Deep Pine border, Deep Pine text and left-arrow icon. Reads as calm and affirmative. Haptic on press: `ImpactFeedbackStyle.Medium`.
- **Sick (right):** Terracotta Alarm fill (`#B23A2E`), no border, Pale Ash text (`#FBF1EF`) and right-arrow icon. Reads as urgent and decisive. Same haptic.

The directional arrows are a spatial-temporal mnemonic: "not sick" sends the patient back to monitoring; "sick" moves forward to action.

### MCQ Options

Row-format answer options, 60px min-height, 16px padding, 12px radius. A lettered badge (A, B, C, D) leads each row; it transforms into a checkmark or X on reveal. Press state: 0.9 opacity + 0.995 scale.

- **Idle:** Clean Sheet background, 1px Dry Grass border.
- **Selected Correct:** Pine Mist background (`#E6F0EA`), Deep Pine border. Badge fills Deep Pine with a white checkmark.
- **Selected Wrong:** Terracotta Wash background (`#F6E6E3`), Terracotta border. Badge fills Terracotta with a Pale Ash X.
- **Reveal Correct (user chose wrong, correct shown):** Same appearance as Selected Correct; no selection affordance.

### Chips and Pills

Inline metadata badges. Pill-shaped (999px radius), 12px horizontal / 4px vertical padding. Three tones:

- **Brand:** Pine Mist background, Pine Dark text (`#084A2E`). Clinical level, skill category.
- **Neutral:** Dry Grass background, Aged Moss text. Scenario count, secondary metadata.
- **Warn:** Amber Parchment background, Amber Brown text. Status notes, informational flags.

### Disclosure Rows

Expandable sections within the patient card. Single tap toggles open/close with `LayoutAnimation.easeInEaseOut`. Collapsed: 48px min-height header with Label-weight title and chevron icon. Body slides in below on open.

Cream Parchment background (`#FCFBF8`), 1px Dry Grass border, 12px radius. Header text: Label (13px, 600). Chevron rotates direction; color remains Aged Moss throughout.

### Segmented Control

Binary/ternary toggle (used for CFA/ER level selection). Track: Dry Grass background, 12px radius, 4px padding. Active segment: Clean Sheet background with Segment Lift shadow, 8px radius. Label: Aged Moss when inactive, Forest Night when active. Minimum segment height 44px.

### Patient Card

The swiping canvas. The only genuine card in the system. Clean Sheet background, 18px radius, 1px Dry Grass border, Card shadow. Content padded 16px with 16px gap between sections. When a scenario image is present: full-width, 180px height, 12px radius, cover-fit. Swipe gesture follows the finger; release commits with `withTiming` ease-out (200ms) or springs back.

### UnofficialBanner

Fixed informational strip. Amber Parchment background (`#FBF1DE`), 8px radius, 12px horizontal / 8px vertical padding. Info-circle icon (16px, Amber Brown) followed by caption text (12px, Amber Brown): "Independent practice tool. Not an official St John Ambulance product." Present on all screens where clinical content is visible. Not dismissable.

## 6. Do's and Don'ts

### Do:

- **Do** use Deep Pine (`#0B5E3B`) for primary actions, active states, correct-answer reveals, and the "not sick" verdict. It is the only green allowed in the system.
- **Do** pair every semantic color instance (terracotta for sick/wrong, pine for not-sick/correct) with a text label and an icon. Non-color cues are mandatory, not supplementary.
- **Do** use monospace type (`ui-monospace` / Menlo / `monospace`) exclusively for clinical numerals and vital values. It is earned through context, not decorative.
- **Do** reserve Clean Sheet (`#FFFFFF`) for foregrounded interactive surfaces: the patient card and MCQ option rows. Background panels use Cream Parchment; page backgrounds use Warm Bone.
- **Do** keep verdict buttons at 64px min-height, fixed below the scroll view, always reachable without scrolling. A patient may be deteriorating; the decision must be instantly accessible.
- **Do** add haptic feedback to verdict commits (`ImpactFeedbackStyle.Medium`) and MCQ selections. The product is tactile and one-handed.
- **Do** include the `UnofficialBanner` on every screen where clinical content is visible. The disclaimer is a product requirement.
- **Do** cap Warm Saffron (`#E8B23A`) at under 10% of any screen surface. It signals "note," not "action."

### Don't:

- **Don't** use clinical white, pure `#000`, or emergency green (`#00C853`-family) for surface or text. The warm bone tinting is a deliberate design choice for sunlight legibility, not a styling preference.
- **Don't** use red cross iconography, generic medical clip-art, or bright emergency-service color palettes. This is a training tool for a specific context; the first-aid-app visual reflex is explicitly rejected.
- **Don't** nest cards within the patient card. The patient card is the only true raised card. Disclosure rows, MCQ options, and data panels are flat surfaces within that card.
- **Don't** use color as the sole signal for sick/not-sick or correct/wrong. The Non-Color-Alone Rule is absolute.
- **Don't** place Warm Saffron on buttons, inputs, segmented controls, or any interactive surface. Its role is informational-only.
- **Don't** add decorative shadows, glassmorphism, gradient overlays, gradient text (`background-clip: text`), or side-stripe border accents (colored `border-left` / `border-right` greater than 1px on cards or list items).
- **Don't** reference St John Ambulance's official brand identity: no SJA cross, no official logo, no "SJA" wordmark on any branding surface. The `UnofficialBanner` copy is the brand boundary.
- **Don't** introduce dark-mode UI patterns. The product scene is outdoor daylight. Light-only at launch.
- **Don't** add bounce or elastic motion curves, decorative entrance animations, or scroll-driven choreography. Motion is state-feedback only: swipe commits (200ms ease-out), presses (0.85 opacity + scale), haptics.
