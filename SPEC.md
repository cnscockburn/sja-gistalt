# SJA Gestalt — Product Specification
> Version 0.2 — Living document. Update this as decisions are made.

---

## 0. What This App Is

An **independent, unofficial education and practice tool** for St John Ambulance volunteers. It trains clinical gestalt — the ability to make rapid sick/not-sick decisions from limited information — through a swipeable deck of patient scenarios followed by structured management questions.

This app is **not affiliated with, endorsed by, or officially released by St John Ambulance.**

---

## 1. Target Users

| Level | Description | Scope |
|---|---|---|
| **Community First Aider (CFA)** | Basic first aid training, community events | DR**C**ABC, AVPU, basic vitals, call for help |
| **Emergency Responder (ER)** | Higher clinical training (IREC qualified) | DR**C**ABCDE, ACVPU, full vitals inc. SpO₂/BGL/BP, wider interventions |

Both levels use the same scenario library. The app filters and adapts content based on the selected level.

---

## 2. Core Gameplay Loop

```
[Setup]
  → Choose level (CFA / ER)
  → Choose stack size (10 / 20 / 30 scenarios)
  → Choose mode (Normal: swipe + MCQ | Swipe-only)

[For each scenario card]
  1. View compact patient card (scene, image, headline vitals)
  2. Tap to expand sections if more detail needed
  3. Swipe LEFT (not sick) or RIGHT (sick) — or tap buttons
  4. [Normal mode] Answer follow-up MCQ: first-line management
  5. [If evolving stage exists] View updated presentation → answer 2nd MCQ
  6. Advance to next card

[End of deck]
  → Debrief screen: per-scenario breakdown + overall score
```

---

## 3. Scoring

Scores are expressed as **percentage of available marks** — never raw points — because scenarios have different maximum marks depending on whether they include follow-up questions and an evolving stage.

### Marks per scenario

| Element | Marks | Present in |
|---|---|---|
| Correct sick/not-sick verdict | 1 | All scenarios |
| Correct follow-up MCQ | 1 | Normal mode, scenarios with followUp |
| Correct evolving stage MCQ | 1 | Scenarios with evolvingStage |

### Display

- **Per scenario in debrief**: `100%` / `67%` / `33%` / `0%` (of available marks for that scenario)
- **Session total**: `e.g. 74% (14/19 available marks)` — denominator varies by deck composition
- Never show raw points to the user. Always percentage.

### Scoring utility signature

```typescript
// utils/scoring.ts
interface ScenarioScore {
  scenarioId: string
  earned: number       // 0–3
  available: number    // 1–3 (depends on scenario structure)
  percent: number      // Math.round((earned / available) * 100)
}

interface SessionScore {
  totalEarned: number
  totalAvailable: number
  percent: number
  breakdown: ScenarioScore[]
}

function scoreSession(answers: AnswerRecord[], deck: Scenario[]): SessionScore
function scoreScenario(answer: AnswerRecord, scenario: Scenario): ScenarioScore
```

---

## 4. Card UI — Compact First, Expand on Tap

The card must be readable without scrolling in its default state. The goal is a glanceable gestalt impression, not a comprehensive notes review.

### Always visible (default, no scroll)

```
┌─────────────────────────────────────────┐
│  [Scene image — max 40% of screen height]│
├─────────────────────────────────────────┤
│  Scene-setter (2–3 lines MAX)            │
│  e.g. "Sports event. 23M. Ankle injury   │
│  after tackle. Sitting on ground."       │
├─────────────────────────────────────────┤
│  HEADLINE VITALS                        │
│  ACVPU: Alert    RR: 13   PR: 93 bpm   │
│  Pain: 7/10      Temp: 37.4°C          │
│  [ER only] SpO₂: 88%   BP: 125/85      │
├─────────────────────────────────────────┤
│  PRIMARY SURVEY (one-line each)         │
│  D: Football pitch  R: Alert            │
│  C: N/A   A: Clear  B: Shallow  C: OK  │
│  [ER only] D: Alert  E: Outside         │
└─────────────────────────────────────────┘
│  [▼ History & background]  [▼ Full obs] │  ← tap to expand
└─────────────────────────────────────────┘
```

### Expandable sections (tap to reveal, accordion)

**History & background** — expands inline below the button:
- Complaint / History / PMH / Drugs & allergies / Injuries / Additional

**Full observations** — expands inline:
- Complete 2-column table (1st set / 2nd set after correct treatment)
- Note: 2nd set is only revealed in the debrief, not during gameplay

### Rules for scene-setter text

- Maximum 3 lines on a standard phone screen
- Format: `[Setting]. [Patient demographics]. [Presenting complaint]. [One key finding if needed].`
- No full paragraphs. Write like a handover, not a story.
- Scenario authors must adhere to this constraint. The content validator will warn if `setting` exceeds 200 characters.

---

## 5. Data Model (TypeScript Types)

```typescript
// types/level.ts
export type Level = 'cfa' | 'er'

// types/scenario.ts
export type Verdict = 'sick' | 'not-sick'

export interface ObservationsShared {
  fastTest: string
  respirationRate: string
  pulseRate: string
  painScore: string
  temperature: string
}

export interface ObservationsCFA {
  avpu: string
}

export interface ObservationsER {
  acvpu: string
  pupilSize: string
  pulseOximetry: string
  bloodGlucose: string
  bloodPressure: string
}

export interface PrimarySurveyShared {
  danger: string
  response: string
  catHaem: string
  airway: string
  breathing: string
  circulation: string
}

export interface PrimarySurveyER {
  disability: string
  exposure: string
}

export interface MCQOption {
  text: string
  correct: boolean
}

export interface FollowUpQuestion {
  question: string
  options: [MCQOption, MCQOption, MCQOption, MCQOption]  // always exactly 4
  explanation: string          // shown in debrief regardless of answer
  levelExplanation?: {         // optional level-specific additions to debrief
    cfa?: string
    er?: string
  }
}

// Some scenarios need entirely different questions per level
export type LevelAwareFollowUp =
  | FollowUpQuestion                          // same question for both levels
  | { cfa: FollowUpQuestion; er: FollowUpQuestion }  // different per level

export interface EvolvingStage {
  narrative: string            // "The patient's condition changes..."
  updatedObservations: Partial<ObservationsShared & ObservationsCFA & ObservationsER>
  followUp: LevelAwareFollowUp
}

export interface History {
  complaint: string
  history: string
  pmh: string
  drugs: string
  injuries: string
  additional: string
}

export interface Scenario {
  id: string                   // e.g. "sja-001"
  version: string              // e.g. "1.0" — bump when content changes
  guidelineReference: string   // e.g. "Resus Council UK BLS 2021"
  title: string                // shown in results debrief only
  setting: string              // MAX 200 chars — scene-setter
  image: string                // filename in assets/scenarios/

  correctVerdict: Verdict
  verdictExplanation: string   // why sick/not-sick — shown in debrief

  observations: {
    shared: ObservationsShared
    cfa: ObservationsCFA
    er: ObservationsER
  }

  primarySurvey: {
    shared: PrimarySurveyShared
    er: PrimarySurveyER
  }

  history: History

  followUp?: LevelAwareFollowUp      // absent = swipe-only compatible
  evolvingStage?: EvolvingStage      // absent on most scenarios

  levelFlags: {
    availableTo: Level[]             // ['cfa','er'] or ['er'] only
    cfaNotes?: string                // extra debrief context for CFA
    erNotes?: string                 // extra debrief context for ER
  }
}
```

```typescript
// types/game.ts
export interface AnswerRecord {
  scenarioId: string
  verdictGiven: Verdict
  verdictCorrect: boolean
  followupAnswerIndex?: number
  followupCorrect?: boolean
  evolvingAnswerIndex?: number
  evolvingCorrect?: boolean
}

export type GameStatus =
  | 'idle'
  | 'viewing-card'
  | 'verdict-recorded'
  | 'followup-mcq'
  | 'evolving-presentation'
  | 'card-complete'
  | 'session-complete'

export interface GameSession {
  id: string                   // uuid — used as AsyncStorage key
  startedAt: string            // ISO timestamp
  level: Level
  mode: 'normal' | 'swipe-only'
  deck: Scenario[]
  currentIndex: number
  answers: AnswerRecord[]
  status: GameStatus
}
```

---

## 6. Folder Structure

```
sja-gistalt/
├── app/                            # expo-router screens (file = route)
│   ├── _layout.tsx                 # Root layout — providers, theme, fonts
│   ├── index.tsx                   # Disclaimer / first-launch gate
│   ├── (tabs)/
│   │   ├── _layout.tsx             # Bottom tab bar (Game | Account)
│   │   ├── game/
│   │   │   ├── _layout.tsx         # Stack navigator
│   │   │   ├── index.tsx           # Setup: level, stack size, mode
│   │   │   ├── play.tsx            # Active card + swipe verdict
│   │   │   ├── followup.tsx        # MCQ follow-up
│   │   │   ├── evolving.tsx        # Evolving presentation + 2nd MCQ
│   │   │   └── results.tsx         # Debrief + percentage scores
│   │   └── account/
│   │       └── index.tsx           # Level toggle, about, disclaimer
│
├── components/
│   ├── card/
│   │   ├── PatientCard.tsx         # Full card layout
│   │   ├── HeadlineVitals.tsx      # Always-visible vitals strip
│   │   ├── PrimarySurveyRow.tsx    # Always-visible DRABC/DE strip
│   │   ├── ExpandableSection.tsx   # Accordion wrapper (History / Full obs)
│   │   ├── ObservationsTable.tsx   # Full vitals grid (inside expandable)
│   │   └── HistoryTable.tsx        # SAMPLE table (inside expandable)
│   ├── game/
│   │   ├── SwipeableCard.tsx       # Gesture wrapper (RNGH + Reanimated)
│   │   ├── VerdictButtons.tsx      # NOT SICK / SICK tap buttons
│   │   ├── MCQOption.tsx           # Single answer row
│   │   ├── ProgressDots.tsx        # n of n indicator
│   │   └── LevelBadge.tsx          # CFA / ER pill
│   ├── results/
│   │   ├── ScoreHeader.tsx         # "74% — 14 of 19 available marks"
│   │   └── ScenarioResultRow.tsx   # Per-scenario: title, %, verdict, MCQ
│   └── ui/
│       ├── Button.tsx
│       ├── DisclaimerModal.tsx
│       └── UnofficialBanner.tsx    # Shown on home screen persistently
│
├── data/
│   ├── scenarios/                  # sja-001.json … sja-0nn.json
│   ├── registry.ts                 # getScenarios() — abstracted data access
│   └── validateScenario.ts         # Runtime schema + content rules check
│
├── store/
│   ├── settingsStore.ts            # Zustand + AsyncStorage persist
│   └── gameStore.ts                # Zustand ephemeral session state
│
├── hooks/
│   ├── useGameSession.ts           # useReducer state machine
│   ├── useLevel.ts                 # Read/write level preference
│   ├── useScenarioDeck.ts          # Filter → shuffle → slice
│   └── useSessionPersistence.ts    # Auto-save + resume on launch
│
├── types/
│   ├── scenario.ts
│   ├── game.ts
│   └── level.ts
│
├── utils/
│   ├── filterScenarios.ts
│   ├── scoring.ts                  # Always returns %, never raw points
│   ├── shuffle.ts
│   └── sessionStorage.ts          # AsyncStorage read/write helpers
│
├── constants/
│   ├── colors.ts
│   ├── typography.ts
│   └── layout.ts
│
└── assets/
    ├── scenarios/                  # Optimised JPGs, max 800px wide
    ├── fonts/
    └── icons/
```

---

## 7. State Management

### settingsStore (persisted to AsyncStorage)

```typescript
interface SettingsState {
  level: Level
  hasSeenDisclaimer: boolean
  gameMode: 'normal' | 'swipe-only'
  stackSize: 10 | 20 | 30
  setLevel: (level: Level) => void
  acknowledgeDisclaimer: () => void
  setGameMode: (mode: 'normal' | 'swipe-only') => void
  setStackSize: (size: 10 | 20 | 30) => void
}
```

### gameStore (ephemeral — but auto-saved for resume)

```typescript
interface GameState {
  session: GameSession | null
  startSession: (deck: Scenario[], level: Level, mode: string) => void
  recordVerdict: (verdict: Verdict) => void
  recordFollowup: (answerIndex: number) => void
  recordEvolving: (answerIndex: number) => void
  advance: () => void
  reset: () => void
}
```

---

## 8. Session Persistence & Resume

On every state change in `gameStore`, `useSessionPersistence` writes the current session to AsyncStorage under the key `@sja_gestalt/active_session`.

On app launch (`app/index.tsx`), before showing the disclaimer or home screen:

```
Check AsyncStorage for @sja_gestalt/active_session
    │
    ├── Not found → normal launch
    │
    └── Found (status !== 'session-complete')
            │
            ▼
        Show resume prompt:
        "You have a session in progress.
         [Level] · Card n of n
         [Resume]  [Start fresh]"
```

On `Start fresh` or session completion: delete the AsyncStorage key.

---

## 9. Data Layer Abstraction

All scenario data access goes through `data/registry.ts`. The rest of the app never imports JSON directly.

```typescript
// data/registry.ts
// v1: returns local JSON bundle
// v2: swap implementation for CMS/API call — no other files change

export async function getScenarios(): Promise<Scenario[]> {
  // import all local scenario JSON files
  const raw = [
    require('./scenarios/sja-001.json'),
    require('./scenarios/sja-002.json'),
    // ...
  ]
  return raw as Scenario[]
}
```

When a backend CMS is added, only this file changes.

---

## 10. Gesture Implementation Notes

The card uses both vertical scroll and horizontal swipe. These must be coordinated carefully.

- Use `react-native-gesture-handler` `Pan` gesture + `react-native-reanimated` v3
- **Direction lock at 12px**: after finger moves >12px, determine dominant axis. Lock to that axis for the remainder of the gesture.
- If dominant axis is **vertical** → hand off to `ScrollView`. Horizontal swipe animation stays at 0.
- If dominant axis is **horizontal** → disable `ScrollView`. Animate card translate and opacity.
- Tapping `NOT SICK` / `SICK` buttons is always available as a fallback regardless of swipe state.
- The buttons must be visible without scrolling — they are fixed at the bottom of the screen, outside the scrollable card area.

```
┌──────────────────────────┐  ← top of screen
│  [scrollable card area]  │
│                          │
│  (scrolls vertically)    │
│  (swipes horizontally)   │
│                          │
└──────────────────────────┘
┌──────────────────────────┐  ← fixed, outside scroll
│  [NOT SICK]    [SICK]    │
└──────────────────────────┘  ← bottom of screen
```

---

## 11. Branding & Disclaimer Requirements

### Colours (SJA-inspired, not SJA official)

```typescript
// constants/colors.ts
export const colors = {
  primary: '#006B3F',       // SJA green — used sparingly
  primaryLight: '#E8F5EE',  // light green tint
  accent: '#F0C93A',        // SJA yellow — chevron stripe accent only
  sick: '#C0392B',          // red — SICK verdict
  notSick: '#1C1C1E',       // near-black — NOT SICK verdict
  surface: '#FFFFFF',
  background: '#F5F5F5',
  text: '#1C1C1E',
  textSecondary: '#6B6B6B',
  border: '#E0E0E0',
}
```

- Do **not** use the SJA cross or official logo anywhere in the app
- The yellow chevron stripe pattern may be used as a decorative background element only (as in the scenario PDFs) — it is a common hazard pattern, not a protected SJA mark

### Disclaimer modal (first launch — cannot be dismissed without tapping "I understand")

> **This is an independent education and practice tool.**
>
> It is not affiliated with, endorsed by, or officially released by St John Ambulance.
>
> Content is based on UK Resuscitation Council and SJA guidelines but **does not replace formal first aid training** and must not be used as clinical decision support in a real emergency.
>
> Always follow your organisation's protocols and the guidance of your training provider.
>
> **[I understand — continue]**

### Persistent "unofficial" banner on home screen

A small, always-visible pill/badge on the game setup screen:
> ⚠️ Independent practice tool — not an official SJA product

### App Store listing (first paragraph must include)

> "SJA Gestalt is an independent educational app for St John Ambulance volunteers. It is not affiliated with or endorsed by St John Ambulance. For training practice only."

---

## 12. Content Validation Rules

`data/validateScenario.ts` runs in CI and during development. It enforces:

| Rule | Check |
|---|---|
| `setting` ≤ 200 characters | Warn if exceeded |
| Exactly 4 MCQ options per question | Error |
| Exactly 1 correct option per MCQ | Error |
| `levelFlags.availableTo` is non-empty | Error |
| `guidelineReference` is present | Warn if missing |
| `version` is a valid semver string | Warn if missing |
| Image file exists in `assets/scenarios/` | Error if missing |
| If `availableTo` includes `'cfa'`, `observations.cfa` is present | Error |
| If `availableTo` includes `'er'`, `observations.er` is present | Error |

---

## 13. Scenario Content Plan (v1 — 20 scenarios)

| ID | Title | CFA | ER | Verdict | Has evolving stage |
|---|---|---|---|---|---|
| sja-001 | Ankle sprain — sports event | — | ✓ | Not sick | No |
| sja-002 | Knee sprain — walking event | — | ✓ | Not sick | No |
| sja-003 | Hand strain — country show | — | ✓ | Not sick | No |
| sja-004 | Epistaxis simple — sports tournament | ✓ | ✓ | Not sick | No |
| sja-005 | Epistaxis deteriorating — air show | — | ✓ | Sick | Yes |
| sja-006 | Minor laceration — craft festival | — | ✓ | Not sick | No |
| sja-007 | Minor graze — park event | — | ✓ | Not sick | No |
| sja-008 | Adult cardiac arrest — football | ✓ | ✓ | Sick | No |
| sja-009 | Adult cardiac arrest — theatre (electrocution) | ✓ | ✓ | Sick | No |
| sja-010 | Child cardiac arrest — country fayre (drowning) | ✓ | ✓ | Sick | No |
| sja-011 | Child cardiac arrest — sports day | ✓ | ✓ | Sick | No |
| sja-012 | Anaphylaxis — food festival | ✓ | ✓ | Sick | Yes |
| sja-013 | FAST positive stroke — community event | ✓ | ✓ | Sick | No |
| sja-014 | Hypoglycaemia — marathon | — | ✓ | Sick | Yes |
| sja-015 | Asthma attack — indoor venue | ✓ | ✓ | Sick | Yes |
| sja-016 | Heat exhaustion — outdoor festival | — | ✓ | Not sick | No |
| sja-017 | Seizure (postictal, recovering) — school event | ✓ | ✓ | Sick | No |
| sja-018 | Choking (adult, resolved) — gala dinner | ✓ | ✓ | Not sick | No |
| sja-019 | Chest pain — race day | — | ✓ | Sick | Yes |
| sja-020 | Faint / vasovagal — concert | ✓ | ✓ | Not sick | No |

**CFA-available scenarios: 12 of 20**
**ER-available scenarios: 20 of 20**

All content to be reviewed by a qualified SJA clinician before v1 release.
All content references Resus Council UK guidelines (current edition at time of writing).

---

## 14. Phased Build Plan

### Phase 1 — Foundation (Weeks 1–3)
- [ ] Expo project init, TypeScript config, GitHub Actions CI
- [ ] expo-router navigation skeleton (tabs, game stack)
- [ ] `data/registry.ts` + 3 sample scenarios
- [ ] Disclaimer screen (blocks app until acknowledged)
- [ ] Level toggle (CFA / ER) — persisted
- [ ] Compact patient card with expandable sections
- [ ] Swipe gesture (horizontal) + tap buttons

### Phase 2 — Gameplay (Weeks 4–6)
- [ ] MCQ follow-up screen
- [ ] Evolving presentation screen
- [ ] Game state machine (`useGameSession` with useReducer)
- [ ] Scoring utility (percentage, variable denominator)
- [ ] Results / debrief screen
- [ ] Session auto-save + resume on launch

### Phase 3 — Content & Polish (Weeks 7–10)
- [ ] All 20 scenarios authored and clinically reviewed
- [ ] Photography / images sourced and optimised
- [ ] Full branding pass (colours, typography, unofficial banner)
- [ ] Content validation script in CI
- [ ] Accessibility pass (contrast, tap targets, font sizes)
- [ ] Physical device testing (outdoor sunlight conditions)

### Phase 4 — Release Prep (Weeks 11–12)
- [ ] App Store / Play Store assets (icon, splash, screenshots)
- [ ] Store listing copy (education category, unofficial disclaimer in first paragraph)
- [ ] TestFlight beta with SJA volunteers
- [ ] Feedback → fixes → release

### Phase 5 — Future
- [ ] Headless CMS for scenario management (non-technical editors)
- [ ] Additional levels (Event Paramedic / Doctor)
- [ ] Score history and progress tracking
- [ ] Push notifications for new scenario packs

---

## 15. Key Decisions Log

| Decision | Choice | Rationale |
|---|---|---|
| Framework | Expo (React Native) | Single codebase iOS + Android, fast setup, good ecosystem |
| Navigation | expo-router | File-based, standard for modern Expo projects |
| State management | Zustand | Minimal boilerplate, works cleanly with AsyncStorage persist |
| Gesture library | RNGH v2 + Reanimated v3 | Best-in-class for React Native gesture handling |
| Data layer | Local JSON behind `getScenarios()` | Fast to start; abstraction allows CMS swap without refactor |
| Level MCQ variants | `LevelAwareFollowUp` union type | Allows single or split questions; decided at data model level |
| Scoring display | Percentage only (never raw points) | Comparable across variable-length scenarios |
| Session persistence | AsyncStorage auto-save + resume prompt | Prevents loss during events; low implementation cost |
| Branding | SJA-inspired palette, no logo | Avoids trademark issues; clear unofficial status |
| Card compactness | Compact default + tap-to-expand accordion | No scroll needed for gestalt decision; detail available if needed |
