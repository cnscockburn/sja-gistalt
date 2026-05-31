---
target: sja-gistalt full app
total_score: 26
p0_count: 0
p1_count: 2
p2_count: 2
timestamp: 2026-05-31T14-18-35Z
slug: sja-gistalt-app
---

## Design Health Score

| #         | Heuristic                           | Score     | Key Issue                                                                                                 |
| --------- | ----------------------------------- | --------- | --------------------------------------------------------------------------------------------------------- |
| 1         | Visibility of System Status         | 3         | Good phase labels and progress bar; no indication when session auto-saves or marks are being earned       |
| 2         | Match Between System and Real World | 3         | "Sick/not-sick" and "Debrief" are excellent choices; CFA/ER require tapping to read their expansion       |
| 3         | User Control and Freedom            | 2         | Leave session protected, but no undo on a committed verdict or MCQ answer                                 |
| 4         | Consistency and Standards           | 4         | Coherent token-driven system; every component behaves predictably                                         |
| 5         | Error Prevention                    | 3         | Deck-empty guard, session persistence, destruction confirmation; discard-X targets close to resume button |
| 6         | Recognition Rather Than Recall      | 3         | Phase labels and mode hints help; no in-game scoring rubric, clinical abbreviations not explained inline  |
| 7         | Flexibility and Efficiency of Use   | 2         | Swipe-only mode and stack size are good; no topic filtering, no way to skip setup entirely                |
| 8         | Aesthetic and Minimalist Design     | 3         | Game screen is exemplary; home screen surfaces a "How it works" block on every visit                      |
| 9         | Error Recovery                      | 2         | "No scenarios" alert gives no recovery path; no other user-visible error states                           |
| 10        | Help and Documentation              | 1         | One static reminder block; no contextual help, no glossary for FAST/AVPU/ACVPU                            |
| **Total** |                                     | **26/40** | **Acceptable**                                                                                            |

## Anti-Patterns Verdict

Not AI-generated. Warm bone / deep pine / terracotta palette resists first-aid-app reflex. Swipe stamps are distinctive. inkFaint (#8C918B) at 13px on Warm Bone (#F6F5F1) is ~2.88:1 — hard WCAG AA failure.

## Priority Issues

**[P1] inkFaint fails WCAG AA at small text sizes.** Fix: darken to ~#6E736C. Command: /impeccable audit.

**[P1] Follow-up MCQ is a memory bridge.** Patient card disappears after swipe. Fix: collapsible "Review case" Disclosure in QuestionPanel. Command: /impeccable craft.

**[P2] "How it works" reminder shows on every home screen visit.** Fix: wrap in Disclosure, default closed after first session. Command: /impeccable distill.

**[P2] No scoring transparency during gameplay.** Fix: caption-weight marks indicator in game header. Command: /impeccable craft.

**[P3] Results debrief cards have no visual triage.** Fix: background tint per outcome. Command: /impeccable colorize.

## Persona Red Flags

**Casey:** inkFaint contrast fails in outdoor sunlight. Resume-discard X target close to resume Pressable.
**Jordan:** No case context at MCQ. FAST/AVPU unexplained. High abandonment risk.
**Sam:** Swipe stamps lack accessibilityLabel. inkFaint contrast failure. VerdictButtons not surfaced as primary path to screen readers.
