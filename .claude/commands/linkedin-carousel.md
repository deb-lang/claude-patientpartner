Generate a PatientPartner branded LinkedIn carousel (multi-slide PDF/image set). Usage: /linkedin-carousel [topic] [options]

$ARGUMENTS

---

You are generating a PatientPartner branded LinkedIn carousel — a series of visually cohesive slides designed to be posted as a multi-image LinkedIn post or PDF document. Follow these instructions exactly.

## Step 1: Parse Arguments

Parse $ARGUMENTS for:
- **topic**: the subject of the carousel (required)
- **slides**: number of slides (default: 8, range: 5–12)
- **angle**: specific angle or hook (optional — will research and suggest if not provided)
- **audience**: pharma, patient, clinical-trials, general (default: pharma)
- **cta**: final slide call-to-action (default: "Visit patientpartner.com")
- **output**: filename prefix (optional — auto-generated from topic)
- **format**: "individual" (separate HTML files per slide) or "combined" (one HTML with all slides, default: individual)

If **topic** is missing, ask the user before proceeding.

---

## Step 2: Topic Research & Angle Selection

### If topic is broad or no angle specified:

Use WebSearch to find fresh, compelling angles:
1. Search: `"[topic] statistics 2025 2026 healthcare"` — find recent data
2. Search: `"[topic] patient engagement pharma trends"` — find industry context
3. Search: `"[topic] LinkedIn post healthcare"` — see what performs well

Then suggest 3 specific carousel angles to the user:
- **Data-driven:** Built around a compelling statistic or report finding
- **Story-driven:** A patient journey or transformation narrative
- **Educational:** A step-by-step guide or myth-busting format

Auto-select the most compelling angle if user doesn't specify, prioritizing data-driven content.

### PatientPartner Content Pillars for Topic Ideas:

**Patient Engagement:** adherence, peer mentorship impact, patient activation, treatment confidence
**Pharma Marketing:** DTC trends, patient support programs, HCP engagement, launch strategies
**Clinical Trials:** recruitment, retention, diversity, patient-centricity, peer mentorship in trials
**Industry Trends:** digital health, AI in patient support, real-world evidence, value-based care
**Company Story:** PatientPartner milestones, mentor stories, partnership highlights, platform features

---

## Step 3: PatientPartner Brand Tokens

```
Primary Teal:       #74CCD3
Dark Navy:          #314D69
Light Teal:         #DDF7F9
Deep Teal:          #188F8B
Warm Accent:        #F6A454
White:              #FFFFFF
Gray Light:         #F7F9FC
Gray Text:          #6B7280

Heading font:       'Georgia', 'Times New Roman', serif
Body font:          'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif

Logo URL:           https://cdn.prod.website-files.com/67ab8a022edd6044d96d2597/688a131d24aa57007a344296_Asset%204%201.webp
```

### Brand Voice (from PatientPartner Brand Guidelines)
- **Tone:** Warm, conversational, professional. Never pushy or clinical.
- **Voice:** Safe, Genuine, Helpful, Compassionate, Approachable, Inspiring
- **Archetypes:** Caregiver (nurturing), Everyman (humble), Lover (connecting people)
- **Avoid:** Surgery references, shame-based language, passive voice, overselling
- **Use:** Real stats, authentic patient voice, outcome-focused messaging

### Proof Points (use as needed)
- "1 in 4 patients would be more likely to start treatment if they could talk to someone who's already been on it"
- "68% of patients abandon new prescriptions without early support"
- "Patients remain on therapy 133.5 days longer with peer mentorship"
- "22% improvement in treatment adherence"
- "72% of patients who connected with a mentor took the next step"
- "1,000+ trained mentors"
- "100+ health conditions supported"
- "68% increase in new patient starts"

---

## Step 4: Carousel Structure

Every carousel follows this proven LinkedIn engagement framework:

### Slide 1: HOOK (Cover Slide)
**Purpose:** Stop the scroll. Make them want to swipe.
- Background: Navy (#314D69) with subtle gradient
- Large bold headline (36–44px, white or #74CCD3, Georgia)
- Subtitle or question (20px, white at 80% opacity, Inter)
- PatientPartner logo bottom-left (white, 28px)
- Small "Swipe →" indicator bottom-right (14px, #74CCD3)
- Optional: Decorative teal accent shapes

**Headline formulas:**
- "[Number] [Things] About [Topic] That [Audience] Need to Know"
- "The [Adjective] Truth About [Topic]"
- "Why [Common Belief] Is Wrong About [Topic]"
- "[Stat]% of [Group] [Surprising Fact]"
- "What [Number] Years of [Experience] Taught Us About [Topic]"

### Slides 2–(N-2): CONTENT SLIDES
**Purpose:** Deliver value. Each slide = one key point.

**Alternating color schemes** (cycle through):
- **Scheme A (Navy):** Navy bg, white text, teal accents
- **Scheme B (White):** White bg, navy text, teal accent bar on left
- **Scheme C (Light Teal):** #DDF7F9 bg, navy text, deep teal accents

**Layout per content slide:**
- Slide number badge: top-right circle (24px, teal bg, white text)
- PatientPartner logo: top-left (small, 24px height, color matches bg)
- Headline: Key point (28–32px, Georgia, bold)
- Body: Supporting explanation (16–18px, Inter, max 3–4 lines)
- Optional: Stat callout box, icon placeholder, or pull quote
- Bottom: "Swipe →" or progress dots

**Content patterns by slide:**
- **Stat slide:** Large number + context
- **Insight slide:** Bold claim + explanation
- **Quote slide:** Testimonial or expert insight
- **Comparison slide:** Before/after or myth/reality
- **List slide:** 3–4 bullet points with teal checkmarks

### Slide (N-1): PROOF / SOCIAL PROOF
**Purpose:** Validate everything with data or testimonials.
- Background: Light Teal
- 2–3 key stats from PatientPartner proof points
- Each stat: Large number (#314D69) + description
- Or: A compelling patient testimonial quote
- Source attribution in small text

### Slide N: CTA (Final Slide)
**Purpose:** Drive action.
- Background: Navy (#314D69) with teal gradient accent
- Headline: "Ready to [action]?" (32px, white, Georgia)
- Subtext: Value prop summary (18px, white at 80%, Inter)
- CTA text: Large, bold, teal (#74CCD3) — e.g., "Visit patientpartner.com"
- PatientPartner logo centered (white, 40px)
- Optional: "Follow us for more insights" with LinkedIn icon

---

## Step 5: Generate HTML Files

### Slide Dimensions
- **Width:** 1080px
- **Height:** 1350px (4:5 portrait — optimal for LinkedIn carousels)

### HTML Structure (per slide)
```html
<!-- PatientPartner LinkedIn Carousel | Slide [N] of [Total] | Generated by Claude -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Topic] - Slide [N]</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { -webkit-font-smoothing: antialiased; }
    .slide {
      width: 1080px;
      height: 1350px;
      position: relative;
      overflow: hidden;
      padding: 60px;
      font-family: 'Inter', sans-serif;
    }
    /* ... type-specific styles ... */
  </style>
</head>
<body>
  <div class="slide">
    <!-- slide content -->
  </div>
</body>
</html>
```

### Design Consistency Rules
- All slides share identical padding (60px), font stack, and logo placement
- Color schemes alternate predictably (Navy → White → Light Teal → repeat)
- Slide number badges are always positioned top-right
- Logo is always top-left
- "Swipe →" is always bottom-right (except last slide)
- Headline font size stays consistent across content slides (28–32px)
- Body text stays at 16–18px across all slides

---

## Step 6: Save Files

### Individual format (default):
Save each slide as a separate HTML file:
- `[topic-slug]-carousel-01.html`
- `[topic-slug]-carousel-02.html`
- `[topic-slug]-carousel-03.html`
- ... etc.

### Combined format:
Save all slides in one HTML file with slides stacked vertically, separated by a dashed border:
- `[topic-slug]-carousel-all.html`

Use the Write tool to save in the current working directory.

---

## Step 7: Generate Companion Post Copy

After generating the carousel slides, automatically draft LinkedIn post copy to accompany it:

**Post structure:**
1. **Hook line** (first line visible before "...see more") — compelling, stops the scroll
2. **3–5 lines of body copy** — context, key takeaway, personal angle
3. **CTA** — comment prompt or link
4. **Hashtags** — 3–5 relevant hashtags (e.g., #PatientEngagement #PharmaMarketing #PeerMentorship #ClinicalTrials #HealthcareInnovation)

Output the post copy in a code block so the user can easily copy it.

---

## Step 8: Summarize & Suggest

After saving, tell the user:
1. Files saved and their paths
2. Number of slides and topic summary
3. The companion post copy

Then suggest:
- "Would you like me to:
  (a) Adjust any slide's content or design
  (b) Generate individual social images from the best slides (/social-media-image-generator)
  (c) Atomize this carousel into platform-specific content (/content-atomizer)
  (d) Create a new carousel on a related topic"

**Related topic suggestions** (always provide 3):
Use the content pillars from Step 2 and WebSearch to suggest 3 carousel topics that complement the one just created.
