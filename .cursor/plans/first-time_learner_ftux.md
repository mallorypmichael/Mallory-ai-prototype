# First-time learner experience (FTUX) — updated plan

## Product intent

- **Keep all current behavior and mock data as the default** (no regression when the toggle is off).
- Add a **visible toggle on the inline ChatGPT / My Learning view** ([`ChatGPTPage.tsx`](src/components/my-learning/ChatGPTPage.tsx)) to switch into **first-time learner view** for prototyping and demos.
- When the toggle is on, inline UI uses FTUX rules and data; when off, behavior matches today.

## Toggle placement and state

- **UI**: Add a control on the inline page — e.g. in the [`chatgpt-topbar`](src/components/my-learning/ChatGPTPage.tsx) row (near existing actions) or directly above [`MyLearningLight`](src/components/my-learning/MyLearningLight.tsx) inside the assistant column. Use existing OpenAI-themed controls (`oai-*` / [`openai-theme.css`](src/components/my-learning/openai-theme.css)); avoid arbitrary Tailwind values per CDS rules.
- **State ownership**: Store boolean **`firstTimeLearnerView`** in [`App.tsx`](src/App.tsx) (lifted state) so that when the user **Expand**s or **Resume**s into [`MyLearningFullScreen`](src/components/my-learning/MyLearningFullScreen.tsx), the same mode applies (overview resume vs start, XDP lock, widgets). Pass into `ChatGPTPage` as `firstTimeLearnerView` + `onFirstTimeLearnerViewChange` (or `setFirstTimeLearnerView`).
- **Returning from full screen**: Closing full course back to ChatGPT should **preserve** the toggle value (state lives in `App`).

## Data when toggle is on

- **Default (toggle off)**: Continue passing `openAIEnrollments`, `openAIDailyGoals`, `openAISkills`, `openAIWeeklyActivity`, `openAICertificates` as today.
- **FTUX (toggle on)**: Pass **alternate** props derived in one place (e.g. [`mockData.ts`](src/data/mockData.ts) exports `openAIEnrollmentsFirstTime`, `openAIDailyGoalsFirstTime`, etc., or a small `getMyLearningProps({ firstTime: boolean })` helper) so the default mocks stay untouched and the toggle only **selects** which bundle is passed.
- FTUX enrollment bundle should match the story: e.g. **no** `In progress` course, **all** or most courses `Not started` with **first** in path startable per path helpers; **zero** certificates; goals/skills/weekly at **empty / zero** state.

## Shared path rule (unchanged intent)

- First **incomplete** course in [`openAIEnrollments`](src/data/mockData.ts) order is **startable**; later `Not started` courses stay locked until earlier ones complete.
- Helpers: `getFirstIncompleteIndex`, `isFirstIncompleteCourse`, strip/XDP/MainPanel/Light all use this when **either** implementing core behavior globally **or** when `firstTimeLearnerView` is on (implementation detail: helpers are shared; toggle only switches data + any copy tweaks).

## UI and logic changes

- **Path / start / lock behavior** (first incomplete startable, later `Not started` locked): apply **whenever** enrollments are passed — not gated behind the toggle. The toggle only swaps **which mock bundle** is passed; default bundle keeps today’s rich progress story.
- **Resume vs “Pick up” bug** on full-screen overview: `MainPanel` should not show the resume card for `Not started`; that correction applies globally so default data (e.g. a `Not started` course) does not show misleading copy.

| Surface | Change |
|--------|--------|
| **`MainPanel` (full screen)** | Resume card only for `In progress`. For first incomplete `Not started`: **Get started / Start learning** card. |
| **`ResumeHeroCard` / strip (`MyLearningLight`)** | **Start** CTA when first incomplete + `Not started`; strip **current** for that course even if not `In progress`. |
| **`XdpPanel`** | `locked` = `Not started` **and not** first incomplete (pass `enrollments` or boolean). |
| **`onMyLearning` in full screen** | If no `In progress`, select **first incomplete** enrollment. |

## Files likely touched

- [`src/App.tsx`](src/App.tsx) — `firstTimeLearnerView` state; conditional props to `ChatGPTPage` and `MyLearningFullScreen`.
- [`src/components/my-learning/ChatGPTPage.tsx`](src/components/my-learning/ChatGPTPage.tsx) — toggle UI; pass through to `MyLearningLight` if needed (or only App swaps enrollments/widgets).
- [`src/components/my-learning/MyLearningLight.tsx`](src/components/my-learning/MyLearningLight.tsx) — Start CTA, strip state, optional `firstTimeLearnerView` prop for copy only if not fully driven by data.
- [`src/components/my-learning/MyLearningFullScreen.tsx`](src/components/my-learning/MyLearningFullScreen.tsx) — `MainPanel`, `XdpPanel`, nav fallback, pass `firstTimeLearnerView` or rely on enrollment shapes only.
- [`src/lib/openAILearningPath.ts`](src/lib/openAILearningPath.ts) (new) — path helpers.
- [`src/data/mockData.ts`](src/data/mockData.ts) — FTUX dataset exports / selector.

## Out of scope (unless expanded later)

- Persisting toggle or FTUX state across refresh.
- Backend enrollment mutations when Start is clicked.

## Implementation todos

1. Add path helper module and unit-style sanity checks (manual) for first incomplete / lock.
2. Add FTUX mock bundle; keep existing exports unchanged.
3. Lift `firstTimeLearnerView` in `App`; wire conditional props to `ChatGPTPage` and `MyLearningFullScreen`.
4. Add toggle UI on `ChatGPTPage`.
5. Update `MainPanel`, `XdpPanel`, `MyLearningLight` (hero + strip), full-screen `onMyLearning` per table above.
6. Manually verify: toggle **off** matches current prototype; toggle **on** shows FTUX inline and after expand/resume.
