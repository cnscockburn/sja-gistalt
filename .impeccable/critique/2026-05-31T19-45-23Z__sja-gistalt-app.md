---
target: sja-gistalt full app
total_score: 31
p0_count: 1
p1_count: 1
p2_count: 1
timestamp: 2026-05-31T19-45-23Z
slug: sja-gistalt-app
---

## Design Health Score

| #         | Heuristic                           | Score     | Key Issue                                                                 |
| --------- | ----------------------------------- | --------- | ------------------------------------------------------------------------- |
| 1         | Visibility of System Status         | 3         | Progress bar shows marks; no running earned-score mid-session             |
| 2         | Match Between System and Real World | 4         | SJA vocabulary throughout; fully domain-correct                           |
| 3         | User Control and Freedom            | 3         | ConfirmModal is excellent; no swipe-verdict undo                          |
| 4         | Consistency and Standards           | 3         | Token-coherent; Segmented accessibilityRole should be "radio"             |
| 5         | Error Prevention                    | 3         | ConfirmModal guards exit; discard-resume has no confirmation              |
| 6         | Recognition Rather Than Recall      | 3         | Hint copy is clear; "Case recall" label abstract without reading it       |
| 7         | Flexibility and Efficiency of Use   | 3         | recallMode adds domain-native flexibility                                 |
| 8         | Aesthetic and Minimalist Design     | 3         | 4 Segmented sections on home in normal mode increases setup weight        |
| 9         | Help Users Recover from Errors      | 3         | MCQ reveal + result tinting excellent; partial-correct cards have no tint |
| 10        | Help and Documentation              | 3         | Disclosure correctly resets; Review case Disclosure is contextual help    |
| **Total** |                                     | **31/40** | **Good**                                                                  |

## Anti-Patterns Verdict

No violations. ScoreHeader large-number layout is false positive (no gradient accent). One hardcoded rgba overlay in ConfirmModal (semantically correct, not through token).

## Priority Issues

**[P0] ConfirmModal inner Pressable is unlabelled focusable element in a11y tree.** Fix: replace inner Pressable with View + pointerEvents="box-none" on overlay Pressable. Command: /impeccable craft.

**[P1] recallMode 'hidden' doesn't enforce recall — Disclosure still tappable.** Fix: conditionally omit Disclosure when recallMode === 'hidden'. Command: /impeccable craft.

**[P2] Partial-correct result cards have no visual tint.** Fix: add cardPartial style using amber-note/saffron palette. Command: /impeccable colorize.

**[P3] MCQ explanation not shown after correct answers.** Keep explanation always-on after answering. Command: /impeccable craft.

**[P3] ConfirmModal overlay rgba is hardcoded, not token-derived.**

## Persona Red Flags

**Casey:** ConfirmModal Stay on left (thumb-natural). Persisted settings mean repeat sessions are 1-tap. Narrow-screen modal button fit is borderline at 320px.
**Jordan:** "Case recall" label abstract. Default recallMode 'hidden' means first MCQ has patient card gone and Jordan may not discover "Review case" Disclosure.
**Sam:** ConfirmModal inner Pressable is P0 a11y defect. Segmented accessibilityRole="button" should be "radio".
