/**
 * PatientPartner Social Media Image Generator
 * Uses fal.ai Ideogram v3 for text-accurate branded image generation.
 *
 * Usage:
 *   FAL_KEY=your_key node scripts/generate-images.mjs [options]
 *
 * Options:
 *   --carousel    Generate LinkedIn carousel slides
 *   --atoms       Generate atomized social media assets
 *   --all         Generate everything
 *   --prompt "…"  Generate a single image from a custom prompt
 *   --type stat|quote|tip|question|carousel  Content type
 *   --platform linkedin|instagram|twitter    Target platform
 *   --output dir  Output directory (default: ./output)
 *   --model flux|ideogram  Model to use (default: ideogram for text-heavy, flux for photo)
 *   --dry-run     Print prompts without calling fal.ai
 */

import { fal } from "@fal-ai/client";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

// ──────────────────────────────────────────────
// Brand Tokens
// ──────────────────────────────────────────────
const BRAND = {
  colors: {
    primaryTeal: "#74CCD3",
    darkNavy: "#314D69",
    lightTeal: "#DDF7F9",
    deepTeal: "#188F8B",
    warmAccent: "#F6A454",
    white: "#FFFFFF",
    grayLight: "#F7F9FC",
    grayText: "#6B7280",
  },
  fonts: {
    heading: "Georgia serif",
    body: "Inter sans-serif",
  },
  name: "PatientPartner",
  url: "patientpartner.com",
  tagline: "Real Support, Real Time, Real Outcomes",
};

// ──────────────────────────────────────────────
// Platform dimensions
// ──────────────────────────────────────────────
const DIMENSIONS = {
  linkedin: { width: 1200, height: 1200 },
  "linkedin-carousel": { width: 1080, height: 1350 },
  instagram: { width: 1080, height: 1080 },
  "instagram-story": { width: 1080, height: 1920 },
  twitter: { width: 1600, height: 900 },
  facebook: { width: 1200, height: 630 },
};

// ──────────────────────────────────────────────
// Proof Points
// ──────────────────────────────────────────────
const PROOF_POINTS = [
  { stat: "133.5", unit: "days", text: "longer on therapy with peer mentorship" },
  { stat: "68%", unit: "", text: "of patients abandon new prescriptions without early support" },
  { stat: "72%", unit: "", text: "of mentored patients took the next step in treatment" },
  { stat: "92%", unit: "", text: "patient retention rate with AI-powered mentor matching" },
  { stat: "22%", unit: "", text: "improvement in treatment adherence" },
  { stat: "1,000+", unit: "", text: "trained patient mentors across 100+ conditions" },
  { stat: "68%", unit: "", text: "increase in new patient starts" },
];

// ──────────────────────────────────────────────
// Prompt builders by content type
// ──────────────────────────────────────────────

function buildBrandStyle(bgColor) {
  const bgMap = {
    navy: `dark navy blue background (${BRAND.colors.darkNavy})`,
    white: `clean white background`,
    lightTeal: `soft light teal background (${BRAND.colors.lightTeal})`,
    gradient: `gradient background from light teal (${BRAND.colors.lightTeal}) to white`,
  };
  return `${bgMap[bgColor] || bgMap.navy}, modern healthcare SaaS design, clean minimalist layout, premium corporate feel`;
}

function buildStatPrompt({ stat, description, context, bgColor = "navy" }) {
  return [
    `Professional social media graphic for "${BRAND.name}",`,
    buildBrandStyle(bgColor) + ".",
    `Large bold headline text "${stat}" in teal color (${BRAND.colors.primaryTeal}),`,
    `Georgia serif font.`,
    `Below it: "${description}" in white clean sans-serif text.`,
    context ? `Smaller supporting text: "${context}" in light gray.` : "",
    `Small teal horizontal accent line divider centered below the text.`,
    `"${BRAND.url}" in small teal text at bottom center.`,
    `Small "${BRAND.name}" wordmark logo in top left corner, white.`,
    `No photos, no people, no icons — purely typographic layout.`,
    `Aspect ratio matches the output dimensions exactly. No borders or frames.`,
  ].filter(Boolean).join(" ");
}

function buildQuotePrompt({ quote, attribution, bgColor = "white" }) {
  return [
    `Professional social media graphic for "${BRAND.name}",`,
    buildBrandStyle(bgColor) + ".",
    `Thin teal accent bar (${BRAND.colors.primaryTeal}) on the left edge running full height.`,
    `Large decorative open curly quote mark in very light teal (${BRAND.colors.lightTeal}), top center.`,
    `Quote text in dark navy Georgia italic serif font: "${quote}"`,
    `Attribution below in smaller gray Inter sans-serif: "${attribution}"`,
    `"${BRAND.url}" in small teal text at bottom center.`,
    `Small "${BRAND.name}" wordmark in top left corner.`,
    `No photos, no people — purely typographic with accent colors.`,
  ].join(" ");
}

function buildTipPrompt({ tipNumber, headline, body, bgColor = "lightTeal" }) {
  return [
    `Professional social media graphic for "${BRAND.name}",`,
    buildBrandStyle(bgColor) + ".",
    `Thin teal banner bar across the very top edge.`,
    `Small "${BRAND.name}" wordmark in top left. Round badge "TIP #${tipNumber}" in dark navy circle, top right.`,
    `Large bold headline in dark navy Georgia serif: "${headline}"`,
    `Supporting body text below in smaller Inter sans-serif, slightly lighter color: "${body}"`,
    `Dark navy bar across the bottom with white text: "Learn more at ${BRAND.url} →"`,
    `No photos, no people, no icons — clean typographic healthcare design.`,
  ].join(" ");
}

function buildQuestionPrompt({ question, bgColor = "gradient" }) {
  return [
    `Professional social media graphic for "${BRAND.name}",`,
    buildBrandStyle(bgColor) + ".",
    `Small "${BRAND.name}" wordmark in top left.`,
    `Small italic teal text "Did you know..." centered above the main text.`,
    `Large bold question in dark navy Georgia serif font, centered: "${question}"`,
    `A pill-shaped light teal badge below: "Drop your thoughts below ↓"`,
    `"${BRAND.url}" in small teal text at bottom center.`,
    `Subtle decorative circle outlines in very light teal in corners.`,
    `No photos, no people — purely typographic.`,
  ].join(" ");
}

function buildCarouselSlidePrompt({ slideNumber, totalSlides, sectionLabel, headline, body, bgColor, extras = "" }) {
  return [
    `Professional LinkedIn carousel slide (portrait 4:5) for "${BRAND.name}",`,
    buildBrandStyle(bgColor) + ".",
    `Small "${BRAND.name}" wordmark top left.`,
    `Round slide number badge "${slideNumber}" top right in ${bgColor === "navy" ? "teal" : "dark navy"} circle.`,
    sectionLabel ? `Small uppercase label "${sectionLabel}" in ${bgColor === "navy" ? "teal" : "deep teal"} above headline.` : "",
    `Bold headline in ${bgColor === "navy" ? "white" : "dark navy"} Georgia serif: "${headline}"`,
    body ? `Body text below in ${bgColor === "navy" ? "light gray" : "medium gray"} Inter sans-serif: "${body}"` : "",
    extras,
    slideNumber < totalSlides ? `Small "Swipe →" text in teal, bottom right.` : "",
    `Progress dots at bottom left showing slide ${slideNumber} of ${totalSlides} — active dot is wider.`,
    `No photos, no people — purely typographic healthcare design.`,
  ].filter(Boolean).join(" ");
}

function buildCTASlidePrompt({ headline, subtitle, ctaText }) {
  return [
    `Professional LinkedIn carousel final slide (portrait 4:5) for "${BRAND.name}",`,
    buildBrandStyle("navy") + ".",
    `"${BRAND.name}" wordmark logo centered, white, larger than other slides.`,
    `Bold headline in white Georgia serif centered: "${headline}"`,
    `Subtitle in light gray Inter sans-serif: "${subtitle}"`,
    `Large teal pill-shaped CTA button: "${ctaText}"`,
    `"${BRAND.url}" in teal below the button.`,
    `Small text: "Follow ${BRAND.name} for more insights"`,
    `Subtle decorative teal circle outlines and a soft teal glow in the center background.`,
    `No photos, no people — purely typographic.`,
  ].join(" ");
}

// ──────────────────────────────────────────────
// Content definitions
// ──────────────────────────────────────────────

const ATOM_CONTENT = [
  {
    id: "linkedin-stat-1",
    platform: "linkedin",
    type: "stat",
    promptFn: () => buildStatPrompt({
      stat: "133.5 days",
      description: "longer on therapy with peer mentorship",
      context: "Patients matched with a trained mentor stay on treatment significantly longer — improving outcomes and reducing drop-off.",
      bgColor: "navy",
    }),
  },
  {
    id: "linkedin-quote-2",
    platform: "linkedin",
    type: "quote",
    promptFn: () => buildQuotePrompt({
      quote: "Patients disengage not because treatment doesn't work, but because they feel unheard, unsupported, and unsure how to stay on track.",
      attribution: "— IQVIA Pharma Patient Engagement Report, 2026",
    }),
  },
  {
    id: "instagram-tip-3",
    platform: "instagram",
    type: "tip",
    promptFn: () => buildTipPrompt({
      tipNumber: 1,
      headline: "Don't Wait for Patients to Drop Off — Connect Them Early",
      body: "68% of patients abandon new prescriptions without early support. The first 30 days are critical. Matching patients with a peer mentor at the point of prescription reduces anxiety and keeps them on track.",
    }),
  },
  {
    id: "twitter-stat-4",
    platform: "twitter",
    type: "stat",
    promptFn: () => buildStatPrompt({
      stat: "92%",
      description: "patient retention rate with AI-powered mentor matching",
      context: "That's 35% higher than programs relying on manual methods.",
      bgColor: "navy",
    }),
  },
  {
    id: "instagram-question-5",
    platform: "instagram",
    type: "question",
    promptFn: () => buildQuestionPrompt({
      question: "What if every patient had someone who truly understood their treatment journey — before they decided to stop?",
    }),
  },
  {
    id: "linkedin-stat-6",
    platform: "linkedin",
    type: "stat",
    promptFn: () => buildStatPrompt({
      stat: "68%",
      description: "of patients abandon new prescriptions without early support",
      context: "The first 30 days are when patients need someone most. Peer mentors bridge that gap — turning uncertainty into confidence.",
      bgColor: "navy",
    }),
  },
];

const CAROUSEL_CONTENT = [
  {
    id: "carousel-01",
    promptFn: () => buildCarouselSlidePrompt({
      slideNumber: 1, totalSlides: 8, sectionLabel: "",
      headline: "68% of patients abandon treatment without early support.",
      body: "Here's how peer mentorship is changing that — and why pharma leaders can't afford to ignore it.",
      bgColor: "navy",
      extras: `Large teal stat "68%" above the headline in huge Georgia bold font. Small "LinkedIn Carousel" label badge in top right.`,
    }),
  },
  {
    id: "carousel-02",
    promptFn: () => buildCarouselSlidePrompt({
      slideNumber: 2, totalSlides: 8, sectionLabel: "THE PROBLEM",
      headline: "Patients aren't disengaging because treatment doesn't work.",
      body: "They feel unheard, unsupported, and unsure how to stay on track. Fewer than half stay on therapy after the first year — costing pharma an estimated 37% of potential annual revenue.",
      bgColor: "white",
      extras: `A highlighted stat callout box with light gray background and teal left border: "$140–240B in potential savings from digital patient engagement solutions."`,
    }),
  },
  {
    id: "carousel-03",
    promptFn: () => buildCarouselSlidePrompt({
      slideNumber: 3, totalSlides: 8, sectionLabel: "THE SHIFT",
      headline: "Pharma is moving from visibility to verified authority.",
      body: "In 2026, 67% of pharma marketers rank condition-specific communities as extremely important — rising to 75% in Oncology and Rare Disease.",
      bgColor: "lightTeal",
      extras: `A white card with subtle shadow containing a quote: "68% of marketers are reallocating funds from general search toward specialized patient engagement platforms." — 2026 Pharma Marketing Pulse Report`,
    }),
  },
  {
    id: "carousel-04",
    promptFn: () => buildCarouselSlidePrompt({
      slideNumber: 4, totalSlides: 8, sectionLabel: "THE SOLUTION",
      headline: "Peer mentorship fills the gap that content alone can't.",
      body: "",
      bgColor: "navy",
      extras: `Three numbered step cards with semi-transparent teal backgrounds:
      "1. Patient shares their experience" with small description,
      "2. AI matches them with a trained mentor" with small description,
      "3. Real conversations build real confidence" with small description.`,
    }),
  },
  {
    id: "carousel-05",
    promptFn: () => buildCarouselSlidePrompt({
      slideNumber: 5, totalSlides: 8, sectionLabel: "THE IMPACT",
      headline: "Patients stay on therapy significantly longer with a mentor.",
      body: "When patients have someone who genuinely understands their journey — they stay engaged, stay adherent, and stay hopeful. That's measurable ROI.",
      bgColor: "white",
      extras: `Very large teal stat "133.5 days" in bold Georgia serif dominating the center of the slide.`,
    }),
  },
  {
    id: "carousel-06",
    promptFn: () => buildCarouselSlidePrompt({
      slideNumber: 6, totalSlides: 8, sectionLabel: "BY THE NUMBERS",
      headline: "What happens when patients get real peer support.",
      body: "",
      bgColor: "lightTeal",
      extras: `Four white stat cards in a 2×2 grid, each with a teal top border:
      "92% patient retention rate",
      "72% of mentored patients took the next step",
      "35% boost in treatment adherence",
      "90%+ of patients report reduced anxiety."`,
    }),
  },
  {
    id: "carousel-07",
    promptFn: () => buildCarouselSlidePrompt({
      slideNumber: 7, totalSlides: 8, sectionLabel: "WHAT LEADERS ARE SAYING",
      headline: "The ROI of human connection is real.",
      body: "",
      bgColor: "navy",
      extras: `A testimonial card with teal left border: "GLP-1 prospects connected with a mentor are up to 68% more likely to start therapy — and those who engage stay on treatment 30% longer."
      Three proof point badges in a row below: "1,000+ trained mentors", "100+ health conditions", "1.5% avg HbA1c drop."`,
    }),
  },
  {
    id: "carousel-08",
    promptFn: () => buildCTASlidePrompt({
      headline: "Ready to make peer mentorship part of your patient strategy?",
      subtitle: "Connect with our team to see how PatientPartner drives measurable engagement, adherence, and ROI for pharma brands.",
      ctaText: "Let's Talk →",
    }),
  },
];

// ──────────────────────────────────────────────
// Image generation via fal.ai
// ──────────────────────────────────────────────

async function generateImage(prompt, { width, height, model = "ideogram", outputPath }) {
  const modelId = model === "flux"
    ? "fal-ai/flux/dev"
    : "fal-ai/ideogram/v3";

  const input = model === "flux"
    ? {
        prompt,
        image_size: { width, height },
        num_images: 1,
        num_inference_steps: 28,
        guidance_scale: 3.5,
      }
    : {
        prompt,
        image_size: { width, height },
        style_type: "DESIGN",
        rendering_speed: "BALANCED",
        num_images: 1,
      };

  console.log(`  Generating with ${modelId} (${width}×${height})...`);

  const result = await fal.subscribe(modelId, {
    input,
    logs: true,
    onQueueUpdate: (update) => {
      if (update.status === "IN_QUEUE") {
        process.stdout.write("  ⏳ In queue...\r");
      }
      if (update.status === "IN_PROGRESS") {
        process.stdout.write("  🎨 Generating...\r");
      }
    },
  });

  const imageUrl = result.data.images[0].url;
  console.log(`  ✓ Generated: ${imageUrl}`);

  // Download and save
  const response = await fetch(imageUrl);
  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile(outputPath, buffer);
  console.log(`  ✓ Saved: ${outputPath}`);

  return { url: imageUrl, path: outputPath };
}

// ──────────────────────────────────────────────
// CLI
// ──────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const flags = new Set(args.filter((a) => a.startsWith("--")));
  const outputDir = args.includes("--output")
    ? args[args.indexOf("--output") + 1]
    : "./output";

  await mkdir(outputDir, { recursive: true });

  const dryRun = flags.has("--dry-run");
  const runAll = flags.has("--all") || (!flags.has("--carousel") && !flags.has("--atoms") && !flags.has("--prompt"));
  const runCarousel = flags.has("--carousel") || runAll;
  const runAtoms = flags.has("--atoms") || runAll;

  // Custom prompt mode
  if (flags.has("--prompt")) {
    const promptIdx = args.indexOf("--prompt");
    const prompt = args[promptIdx + 1];
    const platform = args.includes("--platform") ? args[args.indexOf("--platform") + 1] : "linkedin";
    const dims = DIMENSIONS[platform] || DIMENSIONS.linkedin;

    if (dryRun) {
      console.log("\n[DRY RUN] Custom prompt:");
      console.log(prompt);
      console.log(`Dimensions: ${dims.width}×${dims.height}`);
      return;
    }

    await generateImage(prompt, {
      ...dims,
      outputPath: join(outputDir, `custom-${platform}-${Date.now()}.png`),
    });
    return;
  }

  const results = [];

  // Atomized assets
  if (runAtoms) {
    console.log("\n═══ Generating Atomized Social Media Assets ═══\n");
    for (const atom of ATOM_CONTENT) {
      const dims = DIMENSIONS[atom.platform] || DIMENSIONS.linkedin;
      const prompt = atom.promptFn();
      const outputPath = join(outputDir, `patient-engagement-${atom.id}.png`);

      console.log(`[${atom.id}] ${atom.type} (${atom.platform})`);

      if (dryRun) {
        console.log(`  PROMPT: ${prompt.slice(0, 120)}...`);
        console.log(`  SIZE: ${dims.width}×${dims.height}\n`);
        continue;
      }

      try {
        const result = await generateImage(prompt, { ...dims, outputPath });
        results.push({ ...atom, ...result });
      } catch (err) {
        console.error(`  ✗ Failed: ${err.message}`);
      }
      console.log();
    }
  }

  // Carousel slides
  if (runCarousel) {
    console.log("\n═══ Generating LinkedIn Carousel Slides ═══\n");
    const dims = DIMENSIONS["linkedin-carousel"];
    for (const slide of CAROUSEL_CONTENT) {
      const prompt = slide.promptFn();
      const outputPath = join(outputDir, `peer-mentorship-${slide.id}.png`);

      console.log(`[${slide.id}]`);

      if (dryRun) {
        console.log(`  PROMPT: ${prompt.slice(0, 120)}...`);
        console.log(`  SIZE: ${dims.width}×${dims.height}\n`);
        continue;
      }

      try {
        const result = await generateImage(prompt, { ...dims, outputPath });
        results.push({ ...slide, ...result });
      } catch (err) {
        console.error(`  ✗ Failed: ${err.message}`);
      }
      console.log();
    }
  }

  // Summary
  console.log("\n═══ Summary ═══\n");
  console.log(`Total images generated: ${results.length}`);
  results.forEach((r) => {
    console.log(`  ✓ ${r.path}`);
  });
  console.log(`\nOutput directory: ${outputDir}`);
}

main().catch((err) => {
  console.error("Fatal error:", err.message);
  process.exit(1);
});
