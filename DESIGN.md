# SJA Gestalt — Design System

> Register: **product** (UI serves the task). Companion to SPEC.md.

## Scene & theme

One sentence that forces the theme:

> An SJA volunteer in bright midday sun at a crowded outdoor county show, glancing one-handed at their phone between patients for a 30-second training rep.

This forces a **light theme** (sunlight legibility), **high contrast**, **large one-handed touch targets**, and **dense, glanceable clinical data**. No dark mode at launch; the scene never happens in the dark.

## Color strategy: Restrained + Committed verdict moments

Base is Restrained (warm-tinted neutrals + one accent). The sick/not-sick decision earns Committed semantic color because it is the emotional and functional core.

Neutrals are tinted toward the brand green hue (very low chroma) so nothing is pure `#fff`/`#000`. Values are authored as hex because React Native StyleSheet does not reliably parse OKLCH at runtime; each was chosen against an OKLCH target.

| Role          | Hex                  | Notes                                                         |
| ------------- | -------------------- | ------------------------------------------------------------- |
| `bg`          | `#F6F5F1`            | Warm bone, not clinical white                                 |
| `surface`     | `#FFFFFFF`→`#FCFBF8` | Card surface, faintly warm                                    |
| `ink`         | `#1A1E1B`            | Near-black, green-tinted                                      |
| `inkSoft`     | `#5A615B`            | Secondary text                                                |
| `line`        | `#E2E0D8`            | Hairline borders                                              |
| `brand`       | `#0B5E3B`            | Deep pine green — primary actions, selection, wordmark        |
| `brandSoft`   | `#E6F0EA`            | Selected/active tint                                          |
| `sick`        | `#B23A2E`            | Terracotta-clay red (alarm), not fire-engine                  |
| `sickSoft`    | `#F6E6E3`            |                                                               |
| `notSick`     | `#0B5E3B`            | Brand green doubles as the calm verdict                       |
| `notSickSoft` | `#E6F0EA`            |                                                               |
| `correct`     | `#0B5E3B`            | Debrief                                                       |
| `wrong`       | `#B23A2E`            | Debrief                                                       |
| `accent`      | `#E8B23A`            | SJA-adjacent yellow, used only as a thin status accent (≤10%) |

Verdict colors never carry meaning alone: each pairs with an icon, a text label, and a fixed screen position (NOT SICK left, SICK right).

## Why this is not first-aid slop

First-order reflex for "first aid app" is clinical white + emergency green + red cross. Avoided: the surface is warm bone, the green is a dark sophisticated pine (not emergency green), there is no cross anywhere, and the red is a muted terracotta. Triage red/green is retained only where instant recognition under stress matters, always backed by non-color cues.

## Typography

System font stack (legitimate for product; native feel on both platforms). Two roles only:

- **Sans** (system default): headings, labels, body, buttons.
- **Mono** (`ui-monospace`/platform mono): clinical numerals and vitals, for tabular scanning. Purposeful, not decorative.

Scale (fixed, ratio ~1.2): 30 / 24 / 20 / 17 / 15 / 13. Weight contrast carries hierarchy (700 headings, 600 labels, 400 body).

## Spacing & layout

Spacing scale: 4 / 8 / 12 / 16 / 24 / 32 / 48. Rhythm varies by section; padding is not uniform everywhere.

- The patient **card** is a genuine card (it is the swipe affordance). No other nested cards.
- Expandable detail uses **disclosure rows**, not stacked cards.
- Verdict buttons are fixed at the bottom, full-width, outside the scroll area, min height 64.

## Motion

- Swipe: card follows the finger; release commits with `withTiming` on an ease-out curve (200ms) or springs back.
- Transitions 150–250ms. No bounce, no elastic, no decorative motion.
- Haptic feedback on verdict commit and on MCQ select (expo-haptics).

## Component states

Every interactive element defines default / pressed / disabled, and selected where applicable. MCQ options additionally have correct / wrong reveal states in the debrief.
