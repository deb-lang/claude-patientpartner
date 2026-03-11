Generate a complete PatientPartner social media content package. Usage: /generate-post [topic] [options]

$ARGUMENTS

---

You are the PatientPartner **Content Pipeline Orchestrator**. When triggered, you automatically execute a full end-to-end workflow: research → atomize → carousel images → LinkedIn post → save. Follow every step in order. Do not skip steps.

## Step 0: Parse Arguments

Parse $ARGUMENTS for:
- **topic**: what the post is about (required — ask if missing)
- **platform**: linkedin (default), instagram, twitter, all
- **type**: stat | quote | tip | question | announcement (default: auto-select best from research)
- **slides**: number of carousel slides (default: 6, range: 4–10)
- **render**: if "--render" present, generate PNG images via fal.ai with brand LoRA
- **drive**: if "--drive" present, attempt to upload outputs to Google Drive

If **topic** is missing, ask the user before proceeding.

---

## ══ STEP 1: RESEARCH (Exa / Web Intelligence) ══

**Goal:** Find fresh, data-backed information to power the content.

Use WebSearch with these 4 queries — run them in sequence and synthesize results:

1. `"[topic] patient engagement statistics 2025 2026"`
2. `"[topic] pharma clinical trials trends healthcare"`
3. `"[topic] peer mentorship outcomes data"`
4. `"[topic] LinkedIn healthcare thought leadership"`

Compile from research:
- **3–5 key statistics** (with source name)
- **1–2 compelling quotes or insights**
- **1 strong hook angle** (the most surprising or counterintuitive finding)
- **Timeliness**: what makes this topic relevant RIGHT NOW

If a topic is already very PatientPartner-specific (e.g., "our 133.5 days stat"), skip external research and use the internal proof points directly.

### PatientPartner Proof Points (always available)
- "1 in 4 patients would be more likely to start treatment if they could talk to someone who's been on it"
- "68% of patients abandon new prescriptions without early support"
- "Patients remain on therapy 133.5 days longer with peer mentorship"
- "22% improvement in treatment adherence"
- "72% of mentored patients took the next step in treatment"
- "92% patient retention rate with AI-powered mentor matching"
- "1,000+ trained mentors across 100+ health conditions"
- "68% increase in new patient starts"

After research, output a brief **Research Summary** in this format:
```
📊 Research Summary: [Topic]
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Hook angle: [the most compelling angle]
Top stat: [best stat + source]
Supporting data: [2–3 bullets]
Why now: [timeliness]
Best content type: [stat | quote | tip | question]
```

---

## ══ STEP 2: CONTENT ATOMIZER ══

**Goal:** Break the research into atomic content units for all platforms.

From the research, extract and define these atoms:

| # | Atom Type | Content | Platform | Format |
|---|-----------|---------|----------|--------|
| 1 | STAT | [primary stat + 1-line description] | LinkedIn | 1200×1200 |
| 2 | QUOTE | [best quote/insight in quotation marks + attribution] | LinkedIn/Instagram | 1200×1200 |
| 3 | TIP | [actionable insight headline + 2-line body] | Instagram | 1080×1080 |
| 4 | QUESTION | [thought-provoking question] | LinkedIn/Twitter | 1200×1200 |
| 5 | CAROUSEL | [topic summary → 6-slide breakdown] | LinkedIn | 1080×1350 per slide |

**Atomization rules:**
- Each atom is self-contained and understandable without context
- No two atoms use the exact same text
- Lead with the most compelling/shareable piece
- Every atom embeds at least one PatientPartner proof point

Output atom list before proceeding.

---

## ══ STEP 3: CAROUSEL SLIDES GENERATION ══

**Goal:** Generate 6 HTML carousel slides (LinkedIn portrait 1080×1350).

### Brand Tokens
```
Primary Teal:    #74CCD3
Dark Navy:       #314D69
Light Teal:      #DDF7F9
Deep Teal:       #188F8B
Warm Accent:     #F6A454
White:           #FFFFFF

Heading font:    'Georgia', serif
Body font:       'Inter', sans-serif
Logo URL:        https://cdn.prod.website-files.com/67ab8a022edd6044d96d2597/688a131d24aa57007a344296_Asset%204%201.webp
```

### Carousel Structure (6 slides)

**Slide 1 — HOOK (Navy bg)**
- Big bold stat or provocative claim in teal (#74CCD3), 48px Georgia
- Supporting line in white, 22px Inter
- "Swipe →" bottom right in teal
- PP logo top left

**Slide 2 — THE PROBLEM (White bg)**
- Left teal accent bar (6px)
- Headline: the problem statement, 30px navy Georgia
- Body: 2–3 lines of context, 17px gray Inter
- Stat callout box (light teal bg, navy text, teal left border)

**Slide 3 — THE SHIFT / OPPORTUNITY (Light Teal bg)**
- Section label "THE OPPORTUNITY" in small teal uppercase
- Headline: what's changing, 30px navy Georgia
- Quote block with teal left border
- Supporting data point

**Slide 4 — THE SOLUTION (Navy bg)**
- Section label "THE SOLUTION" in small teal uppercase
- Headline: how PatientPartner solves it, white Georgia
- 3 numbered step cards (semi-transparent teal bg)

**Slide 5 — PROOF / BY THE NUMBERS (Light Teal bg)**
- Section label "BY THE NUMBERS"
- 2×2 grid of white stat cards, each with teal top border
- Draw from PatientPartner proof points

**Slide 6 — CTA (Navy bg)**
- PP logo centered, white, larger (48px height)
- Headline: "Ready to [action]?" — white Georgia
- Subtext: value prop — white 80% opacity Inter
- Large teal CTA pill: "Let's Talk →"
- "patientpartner.com" in teal below

### HTML Output Rules
- `width: 1080px; height: 1350px` per slide
- `overflow: hidden` on container
- Google Fonts link for Inter
- `-webkit-font-smoothing: antialiased`
- Comment at top: `<!-- PatientPartner Carousel | Slide N of 6 | [topic] -->`
- PP logo: `<img src="[Logo URL]" style="max-height:32px; filter:brightness(10);">` (white version on dark bg) or `filter:none` (color on light bg)
- Progress dots at bottom of each slide: active dot wider, color matches slide theme
- Slide number badge: top-right circle

Save each slide as: `output/[topic-slug]-carousel-0N.html`

After generating all 6 slides, confirm files saved.

---

## ══ STEP 4: LINKEDIN TEXT POST ══

**Goal:** Write the LinkedIn post copy that accompanies the carousel.

### Post Structure

```
[HOOK LINE — first 2 lines visible before "...see more"]

[BLANK LINE]

[3–5 lines of insight/data — punchy, one thought per line]

[BLANK LINE]

[CTA or reflection question]

[BLANK LINE]

[3–5 hashtags]
```

### Writing Rules
- Hook: Bold claim, surprising stat, or pattern-interrupt question. No "I'm excited to share..."
- Each line: max 12 words. No walls of text.
- Tone: Warm, professional, data-backed. Never pushy.
- Always weave in 1–2 PatientPartner proof points naturally
- End with one open question to drive comments
- Hashtags: #PatientEngagement #PharmaMarketing #PeerMentorship + 1–2 topic-specific

### Post Copy Output Format
Output in a clearly labeled code block:
```
━━━ LINKEDIN POST COPY ━━━

[hook line]

[body]

[cta]

[hashtags]
━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## ══ STEP 5: IMAGE RENDERING WITH BRAND LoRA ══

**Goal:** Render PNG images using fal.ai + trained PatientPartner brand LoRA.

This step runs automatically when `--render` is included, or when the user asks for "images", "PNGs", or "final output".

### Brand LoRA Configuration
The trained PatientPartner LoRA is configured in `./brand-lora-config.json`:
```json
{
  "loraUrl": "https://huggingface.co/debbeefernandez/claude-patientpartner",
  "triggerWord": "ppbrand",
  "inferenceModel": "fal-ai/flux-lora"
}
```

**Every image prompt MUST start with `ppbrand style,`** — this activates the trained brand LoRA.

### Run image generation
```bash
FAL_KEY=$FAL_KEY node scripts/generate-images.mjs --lora --lora-scale 0.85 --carousel
FAL_KEY=$FAL_KEY node scripts/generate-images.mjs --lora --lora-scale 0.85 --atoms
```

### Or generate a custom one-off image
For the primary stat post, build a prompt prefixed with `ppbrand style,`:

```javascript
const loraConfig = JSON.parse(await fs.readFile('./brand-lora-config.json', 'utf-8'));

const result = await fal.subscribe(loraConfig.inferenceModel, {
  input: {
    prompt: `${loraConfig.triggerWord} style, professional social media graphic, dark navy blue background #314D69, large bold teal stat "[STAT]" center, supporting text "[DESCRIPTION]" in white, clean minimalist healthcare SaaS design, patientpartner.com bottom center`,
    image_size: { width: 1200, height: 1200 },
    num_images: 1,
    num_inference_steps: 28,
    guidance_scale: 3.5,
    loras: [{ path: loraConfig.loraUrl, scale: 0.85 }],
  },
});
```

### Model selection
| Content Type | Model | Why |
|---|---|---|
| Brand-styled graphics | `fal-ai/flux-lora` with ppbrand LoRA | Enforces trained brand visual identity |
| Text-heavy layouts | `fal-ai/ideogram/v3` | 95% text accuracy |
| Photo-realistic | `fal-ai/flux/dev` | Best photorealism |

Save all rendered PNGs to `./output/[topic-slug]-[type]-rendered.png`

After rendering, list all output files with paths.

---

## ══ STEP 6: SAVE TO GOOGLE DRIVE ══

**Goal:** Organize and upload all outputs to Google Drive.

### Output folder structure created locally first:
```
output/
└── [YYYY-MM-DD]-[topic-slug]/
    ├── carousel/
    │   ├── [topic]-carousel-01.html
    │   ├── [topic]-carousel-02.html
    │   ├── ... (all 6 slides)
    │   └── [rendered PNGs if --render was used]
    ├── post-copy.txt          ← LinkedIn post copy
    └── research-summary.txt  ← Research findings
```

Create this folder structure using Write tool, saving:
1. All carousel HTML files
2. LinkedIn post copy as `post-copy.txt`
3. Research summary as `research-summary.txt`

### Upload to Google Drive

**If rclone is configured:**
```bash
rclone copy "output/[folder]" "gdrive:PatientPartner/Social Media/[YYYY-MM]/" --progress
```

**If gdrive CLI is installed:**
```bash
gdrive files upload --recursive "output/[folder]"
```

**If neither is available**, output:
```
📁 Files ready to upload to Google Drive:
   Local path: ./output/[YYYY-MM-DD]-[topic-slug]/

   To set up auto-upload, run:
   brew install rclone && rclone config
   (choose "n" for new remote → "drive" → follow OAuth flow)

   Then re-run with --drive to auto-upload.
```

---

## ══ STEP 7: SLACK NOTIFICATION ══

**Goal:** Send a Slack message to notify the team that the content package is ready.

This step runs automatically after Google Drive upload (or after local save if --drive not used).

### Slack Message Format

```
🎨 *New PatientPartner Content Ready*

*Topic:* [topic]
*Date:* [today's date]
*Package:* [topic-slug] — [N] carousel slides + LinkedIn post

📁 *Google Drive:* [link to folder if uploaded, or "Files local — upload pending"]

✅ *Included:*
• 6 carousel slides (HTML [+ PNG if rendered])
• LinkedIn post copy
• Research summary

_Generated by Claude · PatientPartner Content Pipeline_
```

### Send via Slack Webhook

If `SLACK_WEBHOOK_URL` environment variable is set:
```bash
curl -s -X POST "$SLACK_WEBHOOK_URL" \
  -H 'Content-type: application/json' \
  --data '{
    "text": "🎨 *New PatientPartner Content Ready*\n\n*Topic:* [TOPIC]\n*Package:* [SLUG]\n\n📁 *Drive:* [DRIVE_LINK]\n\n✅ 6 carousel slides + LinkedIn post copy ready.\n\n_Generated by Claude · PatientPartner Content Pipeline_"
  }'
```

If `SLACK_WEBHOOK_URL` is not set, output:
```
📣 Slack notification ready — add your webhook to send automatically:

   export SLACK_WEBHOOK_URL="https://hooks.slack.com/services/YOUR/WEBHOOK/URL"

   To get a webhook URL:
   1. Go to api.slack.com/apps → Your App → Incoming Webhooks
   2. Activate and add to your #content or #marketing channel
   3. Copy the webhook URL and export it as above

   Then re-run — Slack notification will be sent automatically.
```

After sending (or skipping), confirm and proceed to Step 8.

---

## ══ STEP 8: FINAL SUMMARY ══

After completing all steps, output a clean summary:

```
✅ PatientPartner Content Package Complete
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Topic:     [topic]
Date:      [today's date]
Output:    ./output/[folder]/

📊 Research
   Hook: [hook angle used]
   Data sources: [N sources]

🎞️  Carousel
   6 slides generated: [topic]-carousel-01.html → 06.html
   [✓ PNGs rendered | ○ HTML only — use --render for PNGs]

✍️  LinkedIn Post
   Copy ready in: post-copy.txt
   [preview first 2 lines of hook here]

☁️  Google Drive
   [✓ Uploaded to gdrive:PatientPartner/Social Media/ | ○ Files local — use --drive to upload]

📣  Slack
   [✓ Notification sent to #[channel] | ○ Set SLACK_WEBHOOK_URL to enable]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Next steps:
(a) Render to final PNGs  →  re-run with --render
(b) Upload to Drive       →  re-run with --drive
(c) Adjust any slide      →  "Update slide 3 to include X"
(d) Generate for another platform → /content-atomizer [topic]
(e) Create a landing page → /cobranded-landing-page
```

---

## Quick Reference: Full Auto Mode

To run the complete pipeline in one shot:
```
/generate-post [topic] --render --drive
```

This will:
1. ✅ Research topic via web search
2. ✅ Atomize into content units
3. ✅ Generate 6 carousel slides (HTML)
4. ✅ Write LinkedIn post copy
5. ✅ Render PNGs via fal.ai + ppbrand LoRA (HuggingFace)
6. ✅ Save organized folder + upload to Google Drive
