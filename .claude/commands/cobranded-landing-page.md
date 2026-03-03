Generate a co-branded PatientPartner + pharma client landing page. Usage: /cobranded-landing-page [client-url OR client-name] [optional: hex color] [optional: font name]

$ARGUMENTS

---

You are generating a co-branded PatientPartner landing page for a pharmaceutical, biotech, or life-sciences client. The page features BOTH logos and is client-brand-forward — client colors, client fonts, client feel — with PatientPartner as the trusted partner.

**Focus:** Pharma and life sciences ONLY. Medications, treatments, therapies, and conditions. NOT surgery.

---

## PHASE 1: Extract Client Brand (Colors + Fonts)

### Parse Arguments First
From $ARGUMENTS extract:
- **client-url** — website URL (e.g. https://www.xcopri.com)
- **client-name** — brand/medication/company name
- **hex** — if user directly provided a hex color (e.g. #632E91), use it as `--client-primary`
- **font** — if user directly provided a font name, use it; still run font extraction to confirm

If only a name is provided (no URL), skip WebFetch and go straight to WebSearch.
If an image was attached, go directly to **Image Color Extraction** below.

---

### COLOR EXTRACTION (run in order; stop when you have primary + heading hex)

**Step 1 — WebFetch the URL**
Call WebFetch on the client URL. Scan the returned text for:
- Any `#RRGGBB` or `#RGB` hex patterns
- Words like "theme-color", "primary", "brand color", "accent"
- Named colors with context (e.g. "teal green", "cobalt blue")
If 2+ hex codes found → proceed with them. Otherwise → Step 2.

**Step 2 — WebSearch for hex codes (MOST RELIABLE)**
Run these searches in order until hex codes are found:
1. `WebSearch("[brand name] brand colors hex")` — finds brandcolorcode.com, color-hex.com, Wikipedia
2. `WebSearch("[brand name] brand guidelines hex palette")` — finds PDFs, official brand pages
3. `WebSearch("site:brandcolorcode.com [brand name]")` — brandcolorcode.com has clean hex tables

**Step 3 — Try raw CSS file**
Call WebFetch on these URLs (try each, stop when one returns CSS):
- `https://[domain]/css/main.css`
- `https://[domain]/assets/css/main.css`
- `https://[domain]/static/css/main.css`
- `https://[domain]/styles/main.css`
Scan response for `--primary:`, `--color-primary:`, `color:`, `background:`, hex values in `:root`.

**Step 4 — Industry fallback** (if all above fail)
Use an industry-appropriate palette and label it `[CONFIRM: #hex]`:
- Oncology → `#003087` (navy) + `#E31837` (red)
- Rare Disease → `#6B2F8A` (purple) + `#009B77`
- GLP-1 / Metabolic → `#00857C` (teal) + `#1A6DB5`
- Neurology / CNS → `#5C1C74` (purple) + `#4A90D9`
- Immunology → `#E35205` (orange) + `#1A2332`
- General Pharma → `#1A6DB5` (blue) + `#27AE60`

### IMAGE COLOR EXTRACTION (when user attaches a screenshot or logo)
Look at the image and identify:
1. **Primary** — main brand color (header, logo, dominant UI element)
2. **Secondary/accent** — second most visible color
3. **Heading text color** — dark color used for headlines (rarely pure black in pharma)
4. **Body text color** — paragraph text color

Map visually to nearest hex:
| Visual Description | Approximate Hex |
|--------------------|-----------------|
| Teal / green-blue | #007A72 or #00A399 |
| Cobalt blue | #1A6DB5 or #0066CC |
| Navy / dark blue | #1A2332 or #1B3A5C |
| Purple / violet | #5C1C74 or #632E91 |
| Magenta / rose | #A030C8 or #C0006E |
| Green | #27AE60 or #009B77 |
| Red | #E1242A or #B91C1C |
| Orange / warm | #EA580C or #F6A454 |
| Gray-navy (text) | #1A2332 or #374151 |
| Warm gray (body) | #4B5563 or #6B7280 |

State which element you pulled each color from (e.g. "Primary from header background, heading from hero text").

---

### FONT EXTRACTION (run in order; stop when font name is found)

**Step 1 — Scan WebFetch output**
Look for font names in the returned text: "Playfair Display", "DM Sans", "Montserrat", "Nunito", "Inter", "Lato", "Roboto", "Open Sans", "Poppins", "Source Sans", "Raleway", "Libre Baskerville", "Josefin Sans", etc.

**Step 2 — Try raw CSS**
If fetched CSS in color step — scan for:
- `font-family:` declarations
- `@import url('https://fonts.googleapis.com/css?family=...`
- Any font name after a colon

**Step 3 — WebSearch for typography**
Run: `WebSearch("[brand name] typography font family")` or `WebSearch("[brand name] brand font")`

**Step 4 — Infer from brand style (visual)**
If image provided, identify the style:
- Serif headings (elegant/traditional) → Playfair Display
- Geometric sans (modern/clean) → Montserrat or Poppins
- Humanist sans (warm/friendly) → Nunito or DM Sans
- Corporate sans (clinical/professional) → Inter or Lato
- Bold pharma sans → Montserrat Bold

**Step 5 — Fallback table by brand personality**

| Brand Style | Heading Font | Body Font |
|-------------|-------------|-----------|
| Modern / clean | DM Sans | DM Sans |
| Elegant / premium | Playfair Display | Lato |
| Bold / pharma | Montserrat | Open Sans |
| Warm / accessible | Nunito | Inter |
| Clinical / medical | Source Serif 4 | Source Sans 3 |
| Corporate / professional | Poppins | Poppins |

Use fallback and label: `[CONFIRM font — fallback used]`

**Always** include the actual Google Fonts `<link>` tag(s) in the HTML `<head>`.

---

### MAP TO CSS VARIABLES
After extraction, define these variables (include a comment stating the source):

```css
:root {
  /* CLIENT PALETTE — source: [web search / WebFetch / image vision / fallback] */
  --client-primary: #XXXXXX;      /* main brand color */
  --client-secondary: #XXXXXX;    /* accent / secondary (if found) */
  --client-heading: #XXXXXX;      /* heading text color */
  --client-body: #XXXXXX;         /* body text color */
  --client-btn-text: #FFFFFF;     /* button text — change to #1A2332 if primary is light */
  --client-font-heading: 'Font Name', fallback;
  --client-font-body: 'Font Name', fallback;

  /* PATIENTPARTNER (fixed — do not change) */
  --pp-teal: #74CCD3;
  --pp-navy: #314D69;
  --pp-light-teal: #DDF7F9;
  --pp-white: #FFFFFF;
  --pp-light-gray: #F8F9FA;
}
```

---

## PHASE 2: Determine Patient ICP (for Nano Banana image prompts)

Based on the client's medication, condition, or therapy area, infer the typical patient demographics:

| Therapy Area | Typical ICP |
|-------------|-------------|
| Epilepsy / CNS | 25–55, mixed gender, managing chronic condition |
| GLP-1 / Weight | 35–65, mixed gender, managing obesity/diabetes |
| Oncology | Varies; often 50–70, caregiver-inclusive |
| Rare Disease | Often younger adults or caregivers/parents |
| Immunology | 25–55, more female, chronic inflammatory |
| Dermatology | 20–50, mixed gender |
| Women's Health | 25–55, female-primary |
| Neurology (MS) | 30–55, more female |
| Cardiology | 50–75, more male |
| General Pharma | 40–65, mixed |

Generate 2 distinct avatar demographics (for the 2 testimonial cards):
- Avatar 1: Primary demographic
- Avatar 2: Secondary demographic (different gender, ethnicity, or age)

Aim for diverse representation: include varied ethnicities (Hispanic, Black/African American, Asian, White).

---

## PHASE 3: Generate the HTML Page

Create a **single self-contained HTML file** with all CSS in `<style>` tags. Vanilla JS only. Fully responsive (mobile-first, breakpoint 768px).

### Google Fonts in `<head>`
Include the actual `<link>` tag for the client's detected/fallback fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=[HeadingFont]:wght@400;600;700&family=[BodyFont]:wght@400;500;600&display=swap" rel="stylesheet">
```

### `:root` block
Define all CSS variables as specified in Phase 1.

---

### SECTION 1: Header / Nav

**Structure:**
- Sticky, white background, subtle bottom border (`border-bottom: 1px solid #E5E7EB`)
- **Left:** Client logo — `<img src="[CLIENT_LOGO_URL]" alt="[Client Name]">` — max-height 40px
- Thin vertical divider: `border-right: 1px solid #D1D5DB; padding-right: 20px; margin-right: 20px;`
- **Center-left:** PatientPartner logo — `<img src="https://cdn.prod.website-files.com/67ab8a022edd6044d96d2597/688a131d24aa57007a344296_Asset%204%201.webp" alt="PatientPartner">`  — max-height 36px
- **Far right:** "Login" link → `https://patient.patientpartner.com/member/login` — styled as small button using `--client-primary`

---

### SECTION 2: Hero

**Background:** Multi-stop gradient using client colors:
```css
background: linear-gradient(135deg,
  rgba(var(--client-primary-rgb), 0.12) 0%,
  rgba(var(--client-secondary-rgb), 0.06) 50%,
  #ffffff 100%);
```
If no secondary, use:
```css
background: linear-gradient(135deg, rgba(clientPrimaryHex, 0.1) 0%, #DDF7F9 50%, #fff 100%);
```

**Content:**
- Headline (h1, 48px desktop / 32px mobile, `var(--client-heading)`, `var(--client-font-heading)`):
  "Talk to a [CLIENT NAME] Mentor" OR "Want to learn more about [MEDICATION/TREATMENT]?"
- Subheadline (20px, `var(--client-body)`):
  "Connect with a patient [or caregiver] who can answer your questions, share their experience, and offer support. It's free, private, and judgment-free."
- CTA button → `#custom-form`:
  - Background: `var(--client-primary)` | Text: `var(--client-btn-text)` | Padding: 14px 32px | Border-radius: 50px | Font-weight: 700
  - Hover: brightness(0.9), lift 2px (`transform: translateY(-2px)`)
  - Text: "Find My Mentor →"

---

### SECTION 3: Tagline / Emotional Hook

**Background:** White or 5% tint of `--client-primary`
**Content (centered, max-width 700px):**
- Large tagline (28px, `var(--client-heading)`): "You're not alone in your journey."
- Body copy (18px, `var(--client-body)`): "[CLIENT NAME] has partnered with PatientPartner so you can connect with a real patient who has been through [treatment/medication] and understands what you're going through."

---

### SECTION 4: How It Works

**Title (h2, centered):** "How it Works"
**Three cards** (flex row on desktop, stack on mobile):

Each card: white background, `border-radius: 16px`, `box-shadow: 0 2px 16px rgba(0,0,0,0.08)`, top accent border `border-top: 4px solid var(--client-primary)`.

**Card 1 — Tell Us About Yourself**
Step number in `--client-primary`. Title: "Tell Us About Yourself". Body: "Complete a short form sharing your experience with [condition/medication/treatment]. Your answers help us find the best mentor match for you."

**Card 2 — Get Matched With a Mentor**
Title: "Get Matched With a Mentor". Body: "We'll connect you with a volunteer PatientPartner mentor who has similar lived experience — someone who's been through [the same medication/treatment/condition] and wants to help."

**Card 3 — Start the Conversation**
Title: "Start the Conversation". Body: "Message your mentor directly, ask questions, share concerns, and get real support. Conversations are private, secure, and on your schedule."

**CTA below cards (centered):**
"Get Started →" button → `#custom-form` (same button styling as hero)

---

### SECTION 5: Testimonials

**Title (h2):** "Real People, Real Support"
**Subtitle:** "Hear how mentors made an impact."

**Two testimonial cards** (side-by-side on desktop, stacked on mobile):
Each card: white bg, `border-radius: 16px`, shadow, left border `border-left: 4px solid var(--client-primary)`.

Generate AUTHENTIC testimonial copy specific to the client's condition/medication. Make them warm, specific, and credible — not generic.

**Card structure:**
```html
<div class="testimonial-card">
  <!-- Nano Banana prompt: "[full image prompt for this avatar]" -->
  <img src="" alt="[age]-year-old [demographic] patient mentor" class="avatar">
  <blockquote>"[Testimonial text — 2–3 sentences, specific to this therapy/medication]"</blockquote>
  <cite>[First Name], [City, State]</cite>
</div>
```

The avatar `<img>` must have:
- `src=""` (blank, to be filled with generated image)
- `alt="[age]-year-old [demographic] patient mentor"`
- `class="avatar"` — styled as 64px circle: `border-radius: 50%; width: 64px; height: 64px; object-fit: cover; border: 3px solid var(--client-primary);`
- HTML comment directly above the `<img>` with the full Nano Banana prompt (see Phase 2 format)

---

### SECTION 6: Topics You Can Discuss

**Title (h2):** "Real Support Is Waiting For You"
**Subtitle:** "Topics you can chat about privately:"

**Numbered list of 5 topics** — customize EVERY item to the client's specific condition/medication:
Example for an epilepsy drug:
1. What it was like starting [medication] for the first time
2. Managing seizure triggers and daily lifestyle adjustments
3. Side effects they experienced and how they managed them
4. What they wish they'd known before beginning treatment
5. Balancing work, relationships, and life with [condition]

**CTA:** "Meet Your Mentor →" button → `#custom-form`

---

### SECTION 7: Partnership Section

**Title (h2):** "Bridging the Gap in Patient Connections"
**Background:** Light tint of `--client-primary` at 8% opacity

**Both logos side-by-side** (same layout as header, centered)

**Body copy:**
"[CLIENT NAME] has partnered with PatientPartner to ensure every patient has access to meaningful peer support. Our mentors are real patients with experience in [medication/treatment] who want to help others feel confident and informed in their treatment journey."

**CTA text (not a button — just emphasized text + link):**
"Ready to chat with a mentor? → Find yours below ↓"

---

### SECTION 8: Signup Form

**Anchor:** `id="custom-form"`
**Title (h2):** "Connect With Your Mentor"
**Background:** `--pp-light-teal` (#DDF7F9)

**Form fields** (stacked, full width on mobile; 2-col grid on desktop for name fields):
- First Name (required)
- Last Name (required)
- Email (required, type="email")
- Zip Code (required, type="text", pattern="[0-9]{5}")
- [Optional dropdown customized to condition/medication: e.g. "How long have you been taking [medication]?" with relevant options]

**Checkboxes (both required):**
- `<input type="checkbox" required>` "I agree to the <a href="https://patient.patientpartner.com/terms">Terms of Service</a>."
- `<input type="checkbox" required>` "I agree to the <a href="https://patient.patientpartner.com/privacy">Privacy Policy and Authorization</a>."

**Submit button:** Full-width, `background: var(--client-primary)`, `color: var(--client-btn-text)`, `border-radius: 8px`, font-weight 700, 16px, padding 14px.

**Below button:**
- "Already have an account? <a href="https://patient.patientpartner.com/member/login">Log In</a>"
- Success message (hidden by default): "Thank you! Your submission has been received!"
- Error message (hidden by default): "Oops! Something went wrong while submitting the form."

**HIPAA disclaimer (small text, gray):**
"PatientPartner is not intended for use in medical emergencies. If you are experiencing a medical emergency, call 911 immediately or go to the nearest emergency department."

**Compliance badges row:** HIPAA | SOC 2 | ISO 27001 (text badges styled as small pills, `background: var(--client-primary) at 10%`, border `1px solid var(--client-primary)`)

---

### SECTION 9: FAQ Accordion

**Title (h2):** "Frequently Asked Questions"

Nine FAQs — replace `[CLIENT NAME]` and `[medication/treatment]` throughout:

**Q1: What is the [CLIENT NAME] mentorship program?**
The [CLIENT NAME] mentorship program, powered by PatientPartner, connects patients and caregivers with trained volunteer mentors who have personal experience with [medication/treatment]. It's a free, private, peer-to-peer support program designed to help you feel informed and confident.

**Q2: Is this program free?**
Yes — completely free for patients and caregivers. There is no cost to sign up, connect with a mentor, or use the platform.

**Q3: Who are the mentors?**
Mentors are real patients (or caregivers) who have firsthand experience with [medication/treatment/condition] and have volunteered to support others going through a similar journey. They are not medical professionals and do not provide medical advice.

**Q4: How do I get matched with a mentor?**
After you complete the short form, our system matches you with a mentor based on your experience, background, and needs. You'll typically be connected within 24–48 hours.

**Q5: How do I communicate with my mentor?**
All communication happens through PatientPartner's secure messaging platform. You can message your mentor at any time that works for you.

**Q6: What kinds of questions can I ask my mentor?**
You can ask your mentor anything about their personal experience with [medication/treatment] — what starting it was like, side effects they experienced, how it fits into daily life, and what they wish they had known. Think of it as a conversation with a trusted friend who truly understands.

**Q7: Can my mentor give me medical advice?**
No. Mentors share personal experience only — not medical advice, diagnoses, or treatment recommendations. For medical questions, always consult your healthcare provider.

**Q8: How soon can I talk to a mentor?**
Most patients are matched within 24–48 hours of completing the signup form. Your mentor will reach out to introduce themselves through the PatientPartner platform.

**Q9: Is this program private and confidential?**
Yes. All conversations are private and conducted through PatientPartner's HIPAA-compliant, secure messaging platform. Your personal health information is never shared without your consent.

**Accordion behavior (vanilla JS):** Click to expand/collapse. Only one open at a time. Chevron icon rotates on open. Active border-left: 3px solid `var(--client-primary)`.

---

### FOOTER

**Background:** `--pp-navy` (#314D69), white text
**Left:** PatientPartner logo (white version or text) + tagline: "Real Support, Real Time, Real Outcomes"
**Right:** Links — Privacy Policy | Terms & Conditions
**Bottom bar:** © 2026 PatientPartner. All rights reserved. | In partnership with [CLIENT NAME]

---

## PHASE 4: Save the File

**Filename:** slugify the client name → lowercase, hyphens, remove special chars → `[client-slug]-cobranded-landing-page.html`
Example: "XCOPRI® (cenobamate tablets)" → `xcopri-cobranded-landing-page.html`

Use the Write tool to save the file in the current working directory.

---

## PHASE 5: Output Summary

After saving, output:

### Brand Extraction Results
```
Client Name:     [name]
Primary Color:   [#hex] — source: [web search / WebFetch / image / fallback]
Secondary Color: [#hex] — source: [...]
Heading Color:   [#hex] — source: [...]
Body Color:      [#hex] — source: [...]
Heading Font:    [Font Name] — source: [...]
Body Font:       [Font Name] — source: [...]
```

### Nano Banana Image Prompts
Generate these images at https://nano-banana.ai or via the Gemini API, then add the URLs to `src=""` in the HTML:

**Avatar 1:** "Authentic portrait of a [age]-year-old [gender] [ethnicity], warm smile, casual home setting, soft natural lighting, photorealistic, professional photography quality, no medical equipment, approachable and genuine expression"

**Avatar 2:** "Authentic portrait of a [age]-year-old [gender] [ethnicity], warm smile, sitting outdoors or at a kitchen table, soft natural lighting, photorealistic, professional photography quality, no medical equipment, hopeful expression"

### Follow-up Options
Ask: "Would you also like me to generate: (a) a companion email for this page, (b) social media post copy, (c) both?"

---

## Design Rules Summary

**Client colors are used for:**
- CTA buttons (primary color background)
- Heading text (`var(--client-heading)`)
- Body text (`var(--client-body)`)
- Card top borders, left accent borders
- Section background tints
- Form submit button
- Compliance badge borders
- FAQ active state border
- Login button in header
- Logo divider / accent elements
- Hero background gradient

**PatientPartner colors are used for:**
- Footer background (PP navy)
- Compliance section background (PP light teal)
- PP logo in header and partnership section

**Font rules:**
- All headings: `var(--client-font-heading)` (the extracted or fallback Google Font)
- All body text: `var(--client-font-body)`
- Always load from Google Fonts CDN in `<head>`

**Never:**
- Use plain `#000000` black for text
- Use PP green (#27AE60) for client buttons — the client's primary color is used instead
- Reference surgery, surgical procedures, or medical devices
- Include MCP tool names in any output

**Layout:**
- Max-width: 1140px centered | Section padding: 80px (desktop), 48px (mobile)
- Cards: border-radius 16px | Shadow: 0 2px 16px rgba(0,0,0,0.08)
- `html { scroll-behavior: smooth; }` | Mobile breakpoint: 768px
- Google Fonts in `<head>` | SEO meta tags (title, description, og:title, og:description)

---

## Usage Examples

**Option A — URL:**
`/cobranded-landing-page https://www.xcopri.com`
→ Fetches XCOPRI site, searches for brand hex + font, generates page for epilepsy medication.

**Option B — Name only:**
`/cobranded-landing-page Sanofi Dupixent`
→ WebSearches for Dupixent/Sanofi brand colors and font, generates for atopic dermatitis/asthma.

**Option C — Name + hex:**
`/cobranded-landing-page Bayer #10069F`
→ Uses provided primary hex, searches for secondary + font.

**Option D — Image attached:**
Attach screenshot of client site → run `/cobranded-landing-page [client name]`
→ Uses vision to extract palette from image, generates page.

Always label unverified values: `[CONFIRM: #hex]` or `[CONFIRM font]`.
