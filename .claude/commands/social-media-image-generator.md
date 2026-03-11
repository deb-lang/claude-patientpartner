Generate branded PatientPartner social media image posts. Usage: /social-media-image-generator [platform] [topic] [options]

Platforms: linkedin | instagram | facebook | twitter | all
Content types: stat | quote | tip | announcement | carousel-slide | infographic

$ARGUMENTS

---

You are generating branded PatientPartner social media image posts. You have TWO output modes:

1. **HTML mode** (default): Self-contained HTML files at exact pixel dimensions — useful for editing text, previewing in browser, and manual screenshots.
2. **fal.ai mode** (`--render`): Generate final PNG images using fal.ai Ideogram v3 (best text rendering) or FLUX dev (best photorealism). Requires `FAL_KEY` environment variable.

When the user asks for "images", "PNGs", "final output", or includes `--render`, use fal.ai mode. Otherwise default to HTML mode.

Follow these instructions exactly.

## Step 1: Parse Arguments

Parse $ARGUMENTS for:
- **platform**: linkedin, instagram, facebook, twitter, or all (required — default: linkedin)
- **topic**: the subject of the post (required)
- **type**: stat, quote, tip, announcement, carousel-slide, infographic (default: stat)
- **headline**: main text for the image (optional — will be generated if not provided)
- **subtext**: supporting text (optional)
- **stat**: a number or data point to feature (for stat type)
- **cta**: call-to-action text (optional, default varies by type)
- **output**: filename (optional — auto-generated from topic)
- **series**: if "true", generate 3–5 related images as a content series

If **topic** is missing, ask the user before proceeding.

If **topic** is vague (e.g., "patient engagement"), use WebSearch to find recent trends, data points, and angles related to the topic in the healthcare/pharma space. Suggest 3 specific angles and let the user pick, or auto-select the most compelling one.

---

## Step 2: PatientPartner Brand Tokens

Always use these exact values in all generated images:

```
Primary Teal:       #74CCD3
Dark Navy:          #314D69
Light Teal:         #DDF7F9
Deep Teal:          #188F8B
Warm Accent:        #F6A454
White:              #FFFFFF
Gray Light:         #F7F9FC
Gray Text:          #6B7280
Success Green:      #27AE60
Soft Shadow:        0 4px 24px rgba(49,77,105,0.12)

Heading font:       'Georgia', 'Times New Roman', serif
Body font:          'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif

Logo URL:           https://cdn.prod.website-files.com/67ab8a022edd6044d96d2597/688a131d24aa57007a344296_Asset%204%201.webp
```

### Brand Voice Rules (from PatientPartner Brand Guidelines)
- **Tone:** Warm, conversational, professional. Never pushy. Never clinical/cold.
- **Voice:** Safe, Genuine, Helpful, Compassionate, Approachable, Inspiring
- **Focus:** Pharma + clinical trial audiences (Directors, VPs of Patient Marketing, Patient Services, Innovation)
- **Avoid:** Surgery references (company has evolved beyond surgery), old taglines, shame-based language, passive voice, condescending tone
- **Use:** Real stats, real patient voice, compliance language, outcome-focused messaging
- **Archetypes:** The Caregiver (nurturing, helpful), The Everyman (humble, approachable), The Lover (bringing people together)

### Proof Points (use liberally in stat posts)
- "1 in 4 patients would be more likely to start treatment if they could talk to someone who's already been on it"
- "68% of patients abandon new prescriptions without early support"
- "Patients remain on therapy 133.5 days longer with peer mentorship"
- "22% improvement in treatment adherence"
- "72% of patients who connected with a mentor took the next step"
- "1,000+ trained mentors"
- "100+ health conditions supported"
- "68% increase in new patient starts"

---

## Step 3: Platform Dimensions

Generate HTML at the correct dimensions for each platform:

| Platform  | Dimension   | Aspect Ratio | Use Case                |
|-----------|-------------|--------------|-------------------------|
| LinkedIn  | 1200×1200   | 1:1          | Feed post (default)     |
| LinkedIn  | 1200×628    | 1.91:1       | Link preview / article  |
| Instagram | 1080×1080   | 1:1          | Feed post (default)     |
| Instagram | 1080×1350   | 4:5          | Portrait feed post      |
| Instagram | 1080×1920   | 9:16         | Story / Reel cover      |
| Facebook  | 1200×630    | 1.91:1       | Feed post               |
| Twitter   | 1600×900    | 16:9         | Feed post               |

Default to the first (primary) dimension for each platform. If `all` is selected, generate the LinkedIn 1:1 version and note the other sizes available.

---

## Step 4: Design Templates by Content Type

### TYPE: STAT
A bold data-driven image featuring a key statistic.

**Layout:**
- Background: Navy (#314D69) with subtle gradient overlay (`linear-gradient(135deg, #314D69 0%, #1a3350 100%)`)
- Top-left: PatientPartner logo (white version, max-height 36px) — `<img src="[Logo URL]" alt="PatientPartner" style="max-height:36px; filter: brightness(10);">`
- Center: Large stat number (72–96px, bold, #74CCD3, Georgia font)
- Below stat: Stat description (24–28px, white, Inter font, max 2 lines)
- Bottom: Thin teal accent line (4px, #74CCD3, 60px wide, centered)
- Below line: CTA or tagline (16px, #74CCD3, Inter)
- Optional: Small decorative dots or circles in Light Teal at 10% opacity in corners

**Example:**
```
┌────────────────────────────┐
│  [PP Logo]                 │
│                            │
│         133.5              │
│      days longer           │
│   on therapy with peer     │
│       mentorship           │
│                            │
│       ──────               │
│  patientpartner.com        │
└────────────────────────────┘
```

### TYPE: QUOTE
A patient or mentor testimonial quote image.

**Layout:**
- Background: White (#FFFFFF)
- Left accent: 6px teal bar (#74CCD3) running full height on the left edge
- Top-left: PatientPartner logo (navy version, max-height 32px)
- Center: Large open-quote mark (120px, #DDF7F9, Georgia font — decorative)
- Quote text (22–28px, #314D69, Georgia italic, centered, max 3 lines)
- Attribution line: "— First Name, City" (16px, #6B7280, Inter)
- Bottom-right: Teal accent shape (quarter circle or dot pattern, #DDF7F9)
- Bottom-center: "patientpartner.com" (14px, #74CCD3)

### TYPE: TIP
An educational tip or insight card.

**Layout:**
- Background: Light Teal (#DDF7F9)
- Top: Colored banner bar (16px tall, #74CCD3)
- Top-left (below banner): PatientPartner logo (navy, 32px)
- Top-right: Tip number badge (circle, navy bg, white text: "TIP #1")
- Center: Tip headline (28–36px, #314D69, Georgia, bold)
- Below: Supporting text (18–20px, #314D69 at 80% opacity, Inter, max 3 lines)
- Bottom: CTA bar — Navy background strip with white text "Learn more at patientpartner.com"

### TYPE: ANNOUNCEMENT
A branded announcement card (new feature, event, partnership, milestone).

**Layout:**
- Background: Gradient from #DDF7F9 to #FFFFFF (top to bottom)
- Top: PatientPartner logo centered (navy, 40px)
- Small label chip: "NEW" or "ANNOUNCEMENT" (teal bg, white text, pill shape, 12px, uppercase)
- Headline (32–40px, #314D69, Georgia, bold, centered)
- Subtext (18–22px, #6B7280, Inter, centered, max 2 lines)
- CTA button shape: Pill with teal bg, white text (not clickable — decorative)
- Bottom: Subtle wave or curved shape in #DDF7F9

### TYPE: CAROUSEL-SLIDE
A single slide designed for LinkedIn carousel / multi-image posts. Meant to be generated in series (use `series: true`).

**Layout:**
- Dimension: 1080×1350 (4:5 portrait, optimized for carousels)
- Background: Alternating — Slide 1: Navy, Slide 2: White, Slide 3: Light Teal, Slide 4: Navy, Slide 5: White
- Top: Slide number (small, top-right corner, circle badge)
- PatientPartner logo always top-left
- Large headline text (32–40px, centered)
- Supporting body text (18–20px, below headline)
- Bottom: "Swipe →" indicator on all slides except the last; last slide has CTA
- Each slide: consistent padding (60px), consistent font sizes

### TYPE: INFOGRAPHIC
A data-rich visual with multiple stats or a process flow.

**Layout:**
- Dimension: 1080×1350 (portrait for maximum real estate)
- Background: White
- Top banner: Navy (#314D69) with title in white (Georgia, 32px) + PP logo
- Content area: 3–4 stat blocks arranged vertically, each with:
  - Large number (#74CCD3, 48px, Georgia)
  - Description (#314D69, 18px, Inter)
  - Thin divider line (#DDF7F9) between blocks
- Bottom: Teal bar with "Source: PatientPartner | patientpartner.com"
- Optional: Small icons (CSS-only circles, squares, arrows) as decorative elements

---

## Step 5: Generate the HTML File

Create a self-contained HTML file with:
- `<meta>` viewport tag
- All CSS inline in `<style>` block
- Google Fonts link for Inter: `<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">`
- The exact pixel dimensions set on the root container (`width` and `height` in px)
- `overflow: hidden` on the container
- `<!-- PatientPartner Social Media Image | Generated by Claude -->` comment at top
- All text is HTML (not images), fully editable
- No JavaScript needed (static image)

### Container CSS:
```css
.social-image {
  width: [WIDTH]px;
  height: [HEIGHT]px;
  position: relative;
  overflow: hidden;
  font-family: 'Inter', -apple-system, sans-serif;
  /* background per template type */
}
```

### Text Rendering:
- Use `-webkit-font-smoothing: antialiased` for crisp text
- All text should have `line-height: 1.3` for headlines, `1.5` for body
- Ensure text never overflows the container

---

## Step 6: Topic Research (when needed)

If the topic is broad or the user wants data-backed content, use WebSearch to find:
1. Recent statistics related to the topic (prioritize 2024–2026 data)
2. Industry trends in patient engagement, pharma marketing, clinical trials
3. Relevant PatientPartner proof points that connect to the topic

Always attribute stats: include "Source: [source name]" in small text on the image.

For PatientPartner's own stats, use the proof points from Step 2 — no external source attribution needed.

---

## Step 7: Series Generation (when series: true)

When generating a content series, create 3–5 related images that tell a story:

**Series structure:**
1. **Hook** — Bold stat or question that stops the scroll
2. **Problem** — The challenge patients/pharma faces
3. **Solution** — How PatientPartner addresses it
4. **Proof** — Data/testimonial that validates the solution
5. **CTA** — Clear next step (visit site, download report, connect with mentor)

Each image in the series should:
- Share consistent design language (same template type, alternating color schemes)
- Have a series title in small text (e.g., "Patient Engagement Series | 1 of 5")
- Build on the previous slide's narrative

Save each as a separate file: `[topic-slug]-[N].html` (e.g., `patient-adherence-1.html`, `patient-adherence-2.html`)

---

## Step 8: Save the File(s)

Determine filename:
- If output argument provided, use that
- Otherwise slugify the topic: lowercase, spaces to hyphens, remove special chars
- Append platform and type: `[topic]-[platform]-[type].html`
- Example: "peer mentorship stats" on LinkedIn → `peer-mentorship-stats-linkedin-stat.html`
- For series: `[topic]-[platform]-[type]-[N].html`

Use the Write tool to save in the current working directory.

---

## Step 9: Summarize & Suggest

After saving, tell the user:
1. File(s) saved and their paths
2. Dimensions and platform target
3. A brief description of what was generated
4. **Content suggestions** — always suggest 2–3 related post ideas:
   - A complementary image type (e.g., if they made a stat, suggest a quote or tip)
   - A carousel series idea based on the same topic
   - A different platform adaptation

Ask: "Would you like me to:
(a) Generate companion LinkedIn post copy for this image
(b) Create a carousel series expanding on this topic (/linkedin-carousel)
(c) Atomize this into multiple platform-specific versions (/content-atomizer)
(d) Suggest more topics based on PatientPartner's key themes"

---

## Step 10: Topic Suggestion Engine

When the user asks for topic suggestions (or when suggesting in Step 9), draw from these PatientPartner content pillars:

**Pillar 1: Patient Engagement & Adherence**
- Treatment adherence statistics
- Why patients abandon prescriptions
- The power of peer support
- Patient activation and empowerment

**Pillar 2: Pharma & Clinical Trials**
- Patient recruitment challenges
- Retention in clinical trials
- Direct-to-patient marketing trends
- Real-world evidence from peer mentorship

**Pillar 3: Mentor Program Impact**
- Mentor success stories
- How mentorship improves outcomes
- Day-in-the-life of a PatientPartner mentor
- Diversity in mentorship

**Pillar 4: Industry Thought Leadership**
- Healthcare innovation trends
- Patient-centricity in pharma
- Digital health and peer support
- The future of patient services

**Pillar 5: Company Milestones & Culture**
- Partnership announcements
- Platform milestones (1000+ mentors, 100+ conditions)
- Team spotlights
- Event recaps

Use WebSearch with queries like `"patient engagement trends 2026"`, `"pharma patient support programs"`, `"clinical trial retention strategies"` to find fresh angles and timely hooks.

---

## Step 11: Render to PNG with fal.ai (when `--render` is specified or user wants images)

When the user wants final PNG images instead of HTML, use fal.ai to generate them.

### Brand LoRA (always use ppbrand)

The trained PatientPartner LoRA is at `./brand-lora-config.json`:
- **HuggingFace model:** `debbeefernandez/claude-patientpartner`
- **Trigger word:** `ppbrand` — prefix ALL prompts with `ppbrand style,`
- **LoRA scale:** 0.85 (adjust down to 0.7 for more creative freedom)

### Option A: Run the generation script (with brand LoRA)

Always pass `--lora` to activate the trained ppbrand LoRA:

```bash
FAL_KEY=$FAL_KEY node scripts/generate-images.mjs --lora --atoms     # atomized assets
FAL_KEY=$FAL_KEY node scripts/generate-images.mjs --lora --carousel  # carousel slides
FAL_KEY=$FAL_KEY node scripts/generate-images.mjs --lora --all       # everything
```

Images are saved to `./output/` as PNG files.

### Option B: Generate inline via fal.ai API (for custom/one-off images)

Use Bash to run a fal.ai call for any custom prompt. Build the prompt using these rules:

**Prompt Structure for Ideogram v3 (text-heavy images):**
```
Professional social media graphic for "PatientPartner",
[background description using brand colors],
[text layout: headline, stat, body — specify fonts, sizes, colors],
[decorative elements: accent lines, badges, shapes],
[footer: patientpartner.com],
No photos, no people — purely typographic layout.
Modern healthcare SaaS design, clean minimalist, premium corporate.
```

**Prompt Structure for FLUX dev (photo-enhanced images):**
```
Professional healthcare social media image,
[visual scene: warm photography, diverse patients, soft lighting],
[text overlay: headline in Georgia serif, stat in teal],
[PatientPartner branding: teal #74CCD3 and navy #314D69 accents],
Photorealistic, professional quality, warm and approachable.
```

**fal.ai inline call with ppbrand LoRA (Node.js):**
```javascript
import { fal } from "@fal-ai/client";
import { readFile } from "fs/promises";

// Load trained brand LoRA config
const loraConfig = JSON.parse(await readFile('./brand-lora-config.json', 'utf-8'));

// ALWAYS prefix prompt with trigger word
const prompt = `${loraConfig.triggerWord} style, YOUR PROMPT HERE`;

const result = await fal.subscribe(loraConfig.inferenceModel, {
  input: {
    prompt,
    image_size: { width: 1200, height: 1200 },
    num_images: 1,
    num_inference_steps: 28,
    guidance_scale: 3.5,
    loras: [{ path: loraConfig.loraUrl, scale: 0.85 }],
  },
});
// result.data.images[0].url → the generated image URL
```

**Bash one-liner for quick generation:**
```bash
node -e "
import { fal } from '@fal-ai/client';
const r = await fal.subscribe('fal-ai/ideogram/v3', {
  input: {
    prompt: \`PROMPT_HERE\`,
    image_size: { width: WIDTH, height: HEIGHT },
    style_type: 'DESIGN',
    rendering_speed: 'BALANCED',
    num_images: 1,
  }
});
const resp = await fetch(r.data.images[0].url);
const buf = Buffer.from(await resp.arrayBuffer());
await import('fs').then(fs => fs.promises.writeFile('output/FILENAME.png', buf));
console.log('Saved: output/FILENAME.png');
"
```

### Model Selection Guide:
| Content Type | Best Model | Why |
|---|---|---|
| Stat posts (text-heavy) | `fal-ai/ideogram/v3` | 95% text accuracy, perfect typography |
| Quote images | `fal-ai/ideogram/v3` | Handles long quotes and attributions |
| Tip cards | `fal-ai/ideogram/v3` | Multiple text blocks rendered cleanly |
| Carousel slides | `fal-ai/ideogram/v3` | Complex layouts with numbered steps |
| Photo-enhanced posts | `fal-ai/flux/dev` | Photorealistic backgrounds and people |
| Infographics | `fal-ai/ideogram/v3` | Multiple stats + text blocks |

### Color Palette Hint for Ideogram v3:
When calling Ideogram v3, you can optionally pass a `color_palette` to enforce brand colors:
```json
{
  "color_palette": {
    "members": [
      { "hex": "#314D69", "weight": 0.4 },
      { "hex": "#74CCD3", "weight": 0.3 },
      { "hex": "#DDF7F9", "weight": 0.2 },
      { "hex": "#FFFFFF", "weight": 0.1 }
    ]
  }
}
```

### After rendering, tell the user:
1. Which model was used and why
2. File paths to the generated PNGs in `./output/`
3. Note that text accuracy is ~95% — recommend reviewing text and regenerating any slides with errors
4. Offer to regenerate specific images with adjusted prompts if text isn't right
