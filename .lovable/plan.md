## Goal

Add a checkbox in the assessment editor labeled **"Include Pro Academy Experience (Portugal Gap Year)"**. When enabled, the assessment report appends a set of native slides (rebuilt to match existing design) right after the Packages slide. The Pro Academy package price is editable and respects the currency toggle (defaults to **€19,995**).

## Editor changes (`AssessmentEditor.tsx`)

Add a new "Pro Academy Add-On" card with:
- Switch: **Include Pro Academy Experience**
- Number/text input: **Pro Academy Price** (placeholder `19,995`, only shown when toggle is on)

## Database

Add two columns to `assessments`:
- `include_pro_academy` boolean default false
- `pro_academy_price` text nullable (default placeholder `19,995`)

Wire them through `Index.tsx`, `Preview.tsx`, and the save flow so the toggle/price persist.

## New slides (native, matching current design)

Inserted right after the Packages slide, only when the toggle is on. Six slides total:

1. **Pro Academy Intro** — venture logo + "PRO ACADEMY EXPERIENCE" hero with player photo background
2. **Why Choose Us** — 6 benefit chips: College Placement, European Football Exposure, Colleges & Clubs Network, Full Team Support, Personalized Service, Authentic Recruitment
3. **How We Work** — 4-step flow: Soccer Dreams → Curated Itinerary → Decision → Preparation & Travel (with icons)
4. **What's Included** — checklist: Yearly Visa, 9 Month Program, U19 Academy Team, Accommodation, Meal Plan, Transportation Card, Health Insurance
5. **Lisbon & Porto Clubs** — two columns listing partner clubs (Alverca, Belenenses, Torreense, Estoril, Estrela / Boavista, Paços Ferreira, Vitória SC, Gil Vicente, Tondela)
6. **Pro Academy Pricing** — large price (uses currency symbol + editable value), payment method "2 in 2 Month Payments", fine print (flights/taxes/fees not included, 15% deposit)

All slides use existing design tokens, typography, and circular/photo treatments already established in `AssessmentPreview.tsx` — no PDF page screenshots embedded.

## Assets

Copy the venture/PDF imagery we need (a couple of soccer hero shots and partner club logos) from the parsed PDF into `src/assets/pro-academy/` and import them as ES6 modules.

## Currency

Pricing slide uses the same `sym` (`$` / `€`) helper already in `CostsSlide`/`PackagesSlide`.

## Out of scope

- No edits to other slides
- No translation strings yet (English only for the new slides — can be added later)
