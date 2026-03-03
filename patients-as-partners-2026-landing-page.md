# PatientPartner × Patients as Partners 2026 — Webflow Landing Page Blueprint

> **Purpose:** Drive meeting bookings with pharma/clinical trial decision-makers attending Patients as Partners® in Clinical Research (March 24–26, 2026, Boston).
> **CTA:** "Book a Meeting" / "Schedule a 1-on-1"
> **Target Audience:** Directors, VPs of Patient Marketing, Patient Services, Clinical Operations, Innovation

---

## Global Webflow Settings

### Fonts
- **Heading font:** Georgia (set as primary in Webflow Project Settings → Fonts)
- **Body font:** Inter (add via Google Fonts in Webflow Project Settings → Fonts)

### Color Swatches (add to Webflow Design System)
| Swatch Name       | Hex       | Usage                              |
|--------------------|-----------|-------------------------------------|
| PP Teal            | `#74CCD3` | Primary buttons, accents, icons     |
| PP Navy            | `#314D69` | Headlines, nav, footer bg           |
| PP Light Teal      | `#DDF7F9` | Section backgrounds, badges         |
| PP Deep Teal       | `#188F8B` | Button hover states, emphasis       |
| PP White           | `#FFFFFF` | Backgrounds, button text            |
| PP Gray BG         | `#F7F9FC` | Alternate section bg                |
| PP Gray Text       | `#6B7280` | Body text, captions                 |

### Global Styles
- **Max content width:** 1200px (use Container element set to max-width 1200px)
- **Section padding:** 80px top/bottom desktop, 48px mobile
- **Card border-radius:** 8px
- **Button border-radius:** 4px
- **Card shadow:** 0px 2px 16px 0px rgba(49, 77, 105, 0.10)

---

## SECTION 1: Navigation Bar

**Webflow Element:** Navbar component (set to sticky/fixed)

**Structure:**
```
Navbar (bg: white, shadow: 0 1px 0 rgba(0,0,0,0.06), z-index: 1000)
└── Container (max-width: 1200px, flex, justify: space-between, align: center)
    ├── Brand Link
    │   └── Text Block: "Patient" (color: PP Navy, font: Georgia, weight: bold, size: 20px)
    │       + "Partner" (color: PP Navy) + "●" (color: PP Teal, size: 10px)
    └── Nav Right (flex, align: center, gap: 24px)
        ├── Link: "About the Event" (color: PP Navy, size: 14px, font: Inter)
        ├── Link: "Why Meet With Us" (color: PP Navy, size: 14px, font: Inter)
        └── Button: "Book a Meeting" (bg: PP Teal, color: white, padding: 10px 24px, radius: 4px, font: Inter 14px semibold)
```

**Hover states:**
- Nav links → color: PP Deep Teal
- Button → bg: PP Deep Teal

**Mobile:** Hamburger menu, button stays visible outside menu

---

## SECTION 2: Hero

**Webflow Element:** Section (bg: PP Light Teal)

**Structure:**
```
Section (bg: PP Light Teal, padding: 100px top / 80px bottom desktop)
└── Container (max-width: 1200px)
    └── Flex (direction: column, align: center, text-align: center, gap: 24px)
        ├── Badge (inline-block, bg: white, color: PP Deep Teal, font: Inter 13px semibold,
        │         padding: 6px 16px, border-radius: 20px, shadow: card shadow)
        │   └── "📍 March 24–26, 2026 · Boston, MA"
        ├── H1 (font: Georgia, size: 44px desktop / 32px mobile, color: PP Navy,
        │       line-height: 1.2, max-width: 800px)
        │   └── "Meet PatientPartner at Patients as Partners® 2026"
        ├── Paragraph (font: Inter, size: 18px, color: PP Gray Text, max-width: 620px, line-height: 1.6)
        │   └── "We're heading to the premier patient-centricity conference — and we'd love to connect. See how peer mentorship is transforming patient engagement across pharma and clinical trials."
        ├── Flex (direction: row, gap: 16px, wrap on mobile)
        │   ├── Button Primary: "Schedule a 1-on-1" (bg: PP Teal, color: white,
        │   │   padding: 14px 32px, radius: 4px, font: Inter 16px semibold)
        │   └── Button Secondary: "See What We Do" (bg: transparent, color: PP Navy,
        │       border: 2px solid PP Navy, padding: 14px 32px, radius: 4px, font: Inter 16px semibold)
        └── Text Block (font: Inter 13px, color: PP Gray Text, margin-top: 8px)
            └── "Booth visits, 1-on-1 meetings, or a quick coffee chat — your call."
```

**Button hover states:**
- Primary → bg: PP Deep Teal
- Secondary → bg: PP Navy, color: white

---

## SECTION 3: Trust Bar / Social Proof Strip

**Webflow Element:** Section (bg: white, padding: 40px top/bottom)

**Structure:**
```
Section (bg: white, border-top: 1px solid #E5E7EB, border-bottom: 1px solid #E5E7EB)
└── Container (max-width: 1200px)
    └── Grid (3 columns desktop, 1 column mobile, gap: 40px, text-align: center)
        ├── Stat Block
        │   ├── Text: "133.5" (font: Georgia 40px, color: PP Teal, weight: bold)
        │   │   + " more days" (font: Georgia 24px, color: PP Navy)
        │   └── Text: "patients stay on therapy with peer mentorship" (Inter 14px, PP Gray Text)
        ├── Stat Block
        │   ├── Text: "72%" (font: Georgia 40px, color: PP Teal, weight: bold)
        │   └── Text: "of patients who spoke with a mentor took the next step" (Inter 14px, PP Gray Text)
        └── Stat Block
            ├── Text: "22%" (font: Georgia 40px, color: PP Teal, weight: bold)
            └── Text: "improvement in treatment adherence" (Inter 14px, PP Gray Text)
```

---

## SECTION 4: About the Event

**Webflow Element:** Section (bg: PP Gray BG, padding: 80px top/bottom)

**Structure:**
```
Section (bg: PP Gray BG, id: "about")
└── Container (max-width: 1200px)
    ├── Flex (direction: column, align: center, margin-bottom: 48px)
    │   ├── Label (font: Inter 13px semibold uppercase, color: PP Deep Teal, letter-spacing: 2px, margin-bottom: 8px)
    │   │   └── "THE EVENT"
    │   └── H2 (font: Georgia 36px, color: PP Navy, text-align: center, max-width: 700px)
    │       └── "Patients as Partners® in Clinical Research 2026"
    │
    └── Grid (2 columns desktop, 1 column mobile, gap: 32px)
        ├── Event Details Card (bg: white, padding: 40px, radius: 8px, shadow: card shadow)
        │   ├── H3 (Georgia 22px, PP Navy, margin-bottom: 24px) → "Event Details"
        │   ├── Detail Row (flex, gap: 12px, margin-bottom: 16px)
        │   │   ├── Icon placeholder (24x24 div, bg: PP Light Teal, radius: 4px, centered text "📅")
        │   │   └── Text: "March 24–26, 2026" (Inter 16px, PP Navy)
        │   ├── Detail Row
        │   │   ├── Icon "📍"
        │   │   └── Text: "Renaissance Boston Seaport Hotel, Boston, MA" (Inter 16px, PP Navy)
        │   ├── Detail Row
        │   │   ├── Icon "🎤"
        │   │   └── Text: "In-Person Conference · 22+ Case Studies" (Inter 16px, PP Navy)
        │   └── Detail Row
        │       ├── Icon "🤝"
        │       └── Text: "7+ Hours of Dedicated Networking" (Inter 16px, PP Navy)
        │
        └── What to Expect Card (bg: white, padding: 40px, radius: 8px, shadow: card shadow)
            ├── H3 (Georgia 22px, PP Navy, margin-bottom: 24px) → "Key Conference Themes"
            └── List (flex column, gap: 14px)
                ├── List Item (flex, gap: 12px, align: flex-start)
                │   ├── Checkmark (color: PP Teal, size: 18px) → "✓"
                │   └── Text: "Operationalizing patient engagement across the trial lifecycle" (Inter 15px, PP Gray Text)
                ├── "✓" + "Inclusive representation and diverse patient recruitment"
                ├── "✓" + "AI, digital & mobile tech transforming patient experience"
                ├── "✓" + "FDA & HTA regulatory updates with live Q&A"
                └── "✓" + "Measuring the impact of patient engagement on outcomes"
```

---

## SECTION 5: Why Meet With PatientPartner

**Webflow Element:** Section (bg: white, padding: 80px top/bottom)

**Structure:**
```
Section (bg: white, id: "why-meet")
└── Container (max-width: 1200px)
    ├── Flex (direction: column, align: center, margin-bottom: 48px)
    │   ├── Label → "WHY MEET WITH US"
    │   └── H2 (Georgia 36px, PP Navy, text-align: center, max-width: 700px)
    │       └── "Real Conversations About Real Patient Outcomes"
    │
    └── Grid (3 columns desktop, 1 column mobile, gap: 24px)
        ├── Card (bg: white, border: 1px solid #E5E7EB, padding: 32px, radius: 8px, hover: shadow)
        │   ├── Icon Area (48x48, bg: PP Light Teal, radius: 8px, centered, margin-bottom: 20px)
        │   │   └── "🧑‍🤝‍🧑" (or Webflow icon)
        │   ├── H4 (Georgia 18px, PP Navy, margin-bottom: 12px)
        │   │   └── "Peer Mentorship Programs"
        │   └── P (Inter 14px, PP Gray Text, line-height: 1.6)
        │       └── "Learn how 1-on-1 peer mentorship helps patients start and stay on therapy — with 72% of matched patients taking the next step in their treatment journey."
        │
        ├── Card
        │   ├── Icon "🧬"
        │   ├── H4 → "Clinical Trial Engagement"
        │   └── P → "Discover how peer support improves enrollment, retention, and the overall participant experience. Patients stay on therapy 133.5 days longer with mentorship support."
        │
        └── Card
            ├── Icon "🤖"
            ├── H4 → "PerfectPatient AI"
            └── P → "See our AI-powered patient engagement platform in action. Intelligent, always-on support that extends your team's reach — without replacing the human connection."
```

---

## SECTION 6: What People Are Saying

**Webflow Element:** Section (bg: PP Light Teal, padding: 80px top/bottom)

**Structure:**
```
Section (bg: PP Light Teal)
└── Container (max-width: 800px, text-align: center)
    ├── Label → "PROOF IN THE OUTCOMES"
    ├── H2 (Georgia 36px, PP Navy, margin-bottom: 40px)
    │   └── "Why Pharma Teams Choose PatientPartner"
    ├── Quote Block (bg: white, padding: 48px, radius: 8px, shadow: card shadow, margin-bottom: 24px)
    │   ├── Quote marks: """ (Georgia 60px, color: PP Teal, opacity: 0.3)
    │   ├── Blockquote (Inter 18px, PP Navy, line-height: 1.7, font-style: italic)
    │   │   └── "1 in 4 patients would be more likely to start treatment if they could talk to someone who's already been on it. PatientPartner makes that connection possible at scale — with compliance built in."
    │   └── Attribution (Inter 14px, PP Gray Text, margin-top: 16px)
    │       └── "— PatientPartner Outcomes Research"
    │
    └── Grid (2 columns, gap: 16px)
        ├── Mini-stat card (bg: white, padding: 24px, radius: 8px)
        │   ├── "68%" (Georgia 28px, PP Teal, bold)
        │   └── "of patients abandon Rx without early support" (Inter 13px, PP Gray Text)
        └── Mini-stat card
            ├── "1,000+" (Georgia 28px, PP Teal, bold)
            └── "trained mentors across 100+ health conditions" (Inter 13px, PP Gray Text)
```

---

## SECTION 7: Meeting Booking Form (CTA Section)

**Webflow Element:** Section (bg: PP Navy, padding: 80px top/bottom)

**Structure:**
```
Section (bg: PP Navy, id: "book")
└── Container (max-width: 1200px)
    └── Grid (2 columns desktop — 55%/45%, 1 column mobile, gap: 48px, align: center)
        ├── Left Column (color: white)
        │   ├── Label (Inter 13px semibold uppercase, color: PP Teal, letter-spacing: 2px)
        │   │   └── "LET'S CONNECT"
        │   ├── H2 (Georgia 36px, white, margin: 12px 0 20px)
        │   │   └── "Book a Meeting at Patients as Partners 2026"
        │   ├── P (Inter 16px, rgba(255,255,255,0.8), line-height: 1.7, margin-bottom: 32px)
        │   │   └── "Whether you're exploring peer mentorship for the first time or scaling an existing program, we'd love to chat. Grab 20 minutes with our team — at the conference, at the hotel bar, or wherever works best."
        │   └── Checklist (flex column, gap: 14px)
        │       ├── "✓" (PP Teal) + "See a live demo of PerfectPatient AI" (Inter 15px, white)
        │       ├── "✓" + "Discuss your patient engagement strategy"
        │       ├── "✓" + "Get a custom ROI analysis for your brand"
        │       └── "✓" + "Explore clinical trial mentorship programs"
        │
        └── Right Column: Form Card (bg: white, padding: 40px, radius: 8px, shadow: card shadow)
            ├── H3 (Georgia 22px, PP Navy, text-align: center, margin-bottom: 8px)
            │   └── "Schedule a 1-on-1"
            ├── P (Inter 14px, PP Gray Text, text-align: center, margin-bottom: 24px)
            │   └── "Fill out the form and we'll find a time that works."
            ├── Form Block (Webflow native form)
            │   ├── Field: First Name (label: "First Name", placeholder: "Jane")
            │   │   → Input style: border: 1px solid #D1D5DB, radius: 4px, padding: 12px 16px,
            │   │     Inter 15px, focus: border-color PP Teal + ring 0 0 0 3px rgba(116,204,211,0.15)
            │   ├── Field: Last Name (label: "Last Name", placeholder: "Smith")
            │   ├── Field: Work Email (label: "Work Email", placeholder: "jane@pharmacompany.com")
            │   ├── Field: Company (label: "Company", placeholder: "Your organization")
            │   ├── Field: Job Title (label: "Job Title", placeholder: "VP, Patient Services")
            │   ├── Select Field: "What are you most interested in?"
            │   │   Options:
            │   │     - "Peer Mentorship Programs"
            │   │     - "Clinical Trial Patient Engagement"
            │   │     - "PerfectPatient AI Demo"
            │   │     - "General Partnership Opportunities"
            │   │     - "Other"
            │   └── Submit Button: "Book a Meeting →"
            │       (bg: PP Teal, color: white, width: 100%, padding: 14px,
            │        radius: 4px, Inter 16px semibold, hover: bg PP Deep Teal)
            │
            ├── Privacy Note (Inter 12px, PP Gray Text, text-align: center, margin-top: 16px)
            │   └── "Your information is kept private and secure. HIPAA-compliant."
            │
            └── Compliance Badges Row (flex, justify: center, gap: 24px, margin-top: 16px)
                ├── Badge: "HIPAA" (Inter 11px semibold, PP Gray Text, bg: PP Gray BG, padding: 4px 12px, radius: 4px)
                ├── Badge: "SOC 2"
                └── Badge: "ISO 27001"
```

**Webflow Form Settings:**
- Form name: `patients-as-partners-2026-meeting`
- Redirect URL: `/thank-you-pap-2026` (create a simple thank-you page)
- Or connect to Zapier/HubSpot via Webflow Logic

---

## SECTION 8: Footer

**Webflow Element:** Section (bg: PP Navy — slightly darker or same)

**Structure:**
```
Footer (bg: #253D54 or PP Navy, padding: 48px top / 32px bottom)
└── Container (max-width: 1200px)
    ├── Top Row (flex, justify: space-between, align: center, padding-bottom: 24px,
    │            border-bottom: 1px solid rgba(255,255,255,0.12))
    │   ├── Left
    │   │   ├── Logo: "PatientPartner●" (Georgia 18px, white + PP Teal dot)
    │   │   └── Tagline: "Real Support, Real Time, Real Outcomes" (Inter 13px, rgba(255,255,255,0.6))
    │   └── Right (flex, gap: 24px)
    │       ├── Link: "Privacy Policy" (Inter 13px, rgba(255,255,255,0.6), hover: white)
    │       └── Link: "Terms & Conditions" (Inter 13px, rgba(255,255,255,0.6), hover: white)
    │
    └── Bottom Row (padding-top: 24px, text-align: center)
        └── Text: "© 2026 PatientPartner. All rights reserved." (Inter 12px, rgba(255,255,255,0.4))
```

---

## Webflow Page Settings

### SEO Meta
- **Title:** Meet PatientPartner at Patients as Partners® 2026 | Book a Meeting
- **Meta Description:** Connect with PatientPartner at Patients as Partners® in Clinical Research 2026 in Boston. Schedule a 1-on-1 to discuss peer mentorship, clinical trial engagement, and PerfectPatient AI.
- **OG Image:** Use PatientPartner branded social card (create in Canva if needed — 1200x630px, navy bg, teal accents, event title)

### Open Graph
- **og:title:** Meet PatientPartner at Patients as Partners® 2026
- **og:description:** Schedule a meeting with our team at the premier patient-centricity conference. March 24–26, Boston.
- **og:type:** website

---

## Responsive Breakpoints (Webflow)

| Element              | Desktop (992+) | Tablet (768–991) | Mobile (0–767)  |
|----------------------|----------------|-------------------|-----------------|
| H1                   | 44px           | 36px              | 32px            |
| H2                   | 36px           | 30px              | 26px            |
| Grid columns         | 2–3 col        | 2 col             | 1 col (stacked) |
| Section padding      | 80px TB        | 60px TB           | 48px TB         |
| Nav                  | Full links     | Full links        | Hamburger       |
| Form card            | Side-by-side   | Stacked           | Stacked         |
| Stats strip          | 3 col row      | 3 col row         | Stacked         |

---

## Interactions & Animations (Webflow native)

1. **Scroll-triggered fade-in:** Each section fades in + slides up 20px on scroll into view (use Webflow's "While scrolling in view" trigger, opacity 0→1, transform Y 20→0, duration 500ms, ease: ease-out)

2. **Button hover:** Scale 1.02 on hover (transform scale), transition 200ms

3. **Card hover:** Shadow increases on hover (0 4px 24px rgba(49,77,105,0.15)), transition 200ms

4. **Nav background:** On scroll past 50px, navbar gets subtle shadow (0 2px 8px rgba(0,0,0,0.06))

---

## Thank You Page (`/thank-you-pap-2026`)

Simple page, same nav + footer:
```
Section (bg: PP Light Teal, min-height: 60vh, flex center center)
└── Container (max-width: 600px, text-align: center)
    ├── Checkmark circle (80x80, bg: PP Teal, white check icon, radius: 50%, margin-bottom: 24px)
    ├── H1 (Georgia 36px, PP Navy) → "You're All Set!"
    ├── P (Inter 18px, PP Gray Text, margin: 16px 0 32px)
    │   └── "Thanks for booking a meeting with PatientPartner at Patients as Partners® 2026. We'll be in touch within 1 business day to confirm your time slot."
    ├── Detail card (bg: white, padding: 24px, radius: 8px, shadow, margin-bottom: 32px)
    │   ├── "📍 Renaissance Boston Seaport Hotel"
    │   └── "📅 March 24–26, 2026"
    └── Link Button: "Visit PatientPartner.com →" (styled as secondary button)
```

---

## Implementation Checklist

- [ ] Set up Webflow project fonts (Georgia + Inter via Google Fonts)
- [ ] Create color swatches in Webflow Design System
- [ ] Build global class styles (`.pp-btn-primary`, `.pp-btn-secondary`, `.pp-section-label`, `.pp-card`)
- [ ] Build Section 1: Navbar (use Webflow Navbar component)
- [ ] Build Section 2: Hero
- [ ] Build Section 3: Trust Bar
- [ ] Build Section 4: About the Event
- [ ] Build Section 5: Why Meet With Us (3-card grid)
- [ ] Build Section 6: Social Proof / Quote
- [ ] Build Section 7: Meeting Booking Form (native Webflow form)
- [ ] Build Section 8: Footer
- [ ] Build Thank You page
- [ ] Configure form submission (Webflow native or Zapier/HubSpot)
- [ ] Add scroll animations (Webflow Interactions panel)
- [ ] Set page SEO & OG tags
- [ ] Test responsive breakpoints
- [ ] Publish and test form submission
