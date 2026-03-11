/**
 * Render Patient Engagement 2026 carousel PNGs with ppbrand LoRA
 *
 * Usage:
 *   node scripts/render-engagement-2026.mjs
 *
 * Requires FAL_KEY in .env or environment
 */
import "dotenv/config";
import { fal } from "@fal-ai/client";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

const OUTPUT_DIR = "./output/2026-03-11-patient-engagement-2026/carousel-png";
const LORA_URL = "https://huggingface.co/debbeefernandez/claude-patientpartner";
const LORA_SCALE = 0.85;

const slides = [
  {
    name: "engagement-2026-carousel-01",
    prompt: `ppbrand style, professional social media carousel slide, dark navy blue background #314D69, large bold teal text "63%" centered in Georgia serif font, subtitle "would leave" in teal below, supporting text "of patients would switch providers due to poor communication alone" in white, PatientPartner logo top left corner white, slide number "01" badge top right, progress dots bottom left with first dot highlighted teal, "Swipe" text bottom right in teal, clean minimalist healthcare SaaS corporate design, no photos no people, purely typographic layout`,
  },
  {
    name: "engagement-2026-carousel-02",
    prompt: `ppbrand style, professional social media carousel slide, clean white background, thin teal accent bar on left edge, section label "THE PROBLEM" in small teal uppercase, headline "Engagement is a 96.7B market. But most strategies still miss." in dark navy Georgia serif, body text about technology without human connection being just noise in gray, stat callout box with light teal background showing "84%" in large navy text with "of patients want to be partners in their health decisions", PatientPartner logo top left, slide "02" badge, progress dots bottom, clean minimalist healthcare design`,
  },
  {
    name: "engagement-2026-carousel-03",
    prompt: `ppbrand style, professional social media carousel slide, soft light teal #DDF7F9 background, section label "THE OPPORTUNITY" in small dark teal uppercase, headline "The strategies that work in 2026 put people before platforms" in dark navy serif font, quote block with teal left border containing "Patients don't want to be surveyed. They want to be partners.", stat card showing "62%" with "of healthcare leaders say GenAI holds the highest potential for patient engagement", PatientPartner logo top left, slide "03" badge, progress dots bottom, clean healthcare design`,
  },
  {
    name: "engagement-2026-carousel-04",
    prompt: `ppbrand style, professional social media carousel slide, dark navy blue gradient background #314D69, section label "THE SOLUTION" in small teal uppercase, headline "5 strategies that actually move the needle in 2026" in white serif font, five numbered strategy cards with semi-transparent teal backgrounds: "1 Peer mentorship at first touch" "2 AI-powered personalization" "3 Close the insight silo" "4 Reduce digital burden" "5 Measure engagement as a KPI", teal numbered circles, PatientPartner logo top left white, slide "04" badge, progress dots bottom, clean corporate design`,
  },
  {
    name: "engagement-2026-carousel-05",
    prompt: `ppbrand style, professional social media carousel slide, soft light teal #DDF7F9 background, section label "BY THE NUMBERS" in dark teal uppercase, headline "What real engagement looks like" in navy serif, four white stat cards in 2x2 grid each with teal top border: "133.5 more days on therapy" "72% took the next step" "68% increase in patient starts" "1000+ trained mentors", large teal numbers with navy descriptions, PatientPartner logo top left, slide "05" badge, progress dots bottom, clean minimalist design`,
  },
  {
    name: "engagement-2026-carousel-06",
    prompt: `ppbrand style, professional social media carousel slide, dark navy blue gradient background #314D69, centered layout, PatientPartner logo centered in white larger size, headline "Ready to make engagement your competitive edge?" in white serif font centered, subtext "See how peer mentorship transforms hesitation into confident committed patients" in soft white, large teal pill-shaped CTA button with text "Lets Talk" in navy, "patientpartner.com" in teal below, decorative subtle teal circles in corners at low opacity, progress dots bottom center, premium corporate healthcare design`,
  },
];

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  console.log(
    `\n🎨 Rendering ${slides.length} carousel slides with ppbrand LoRA...\n`
  );

  for (const slide of slides) {
    console.log(`⏳ ${slide.name}...`);
    try {
      const result = await fal.subscribe("fal-ai/flux-lora", {
        input: {
          prompt: slide.prompt,
          image_size: { width: 1080, height: 1350 },
          num_images: 1,
          num_inference_steps: 28,
          guidance_scale: 3.5,
          loras: [{ path: LORA_URL, scale: LORA_SCALE }],
        },
      });

      const imageUrl = result.data.images[0].url;
      const resp = await fetch(imageUrl);
      const buf = Buffer.from(await resp.arrayBuffer());
      const outPath = join(OUTPUT_DIR, `${slide.name}.png`);
      await writeFile(outPath, buf);
      console.log(`   ✅ Saved: ${outPath}`);
    } catch (err) {
      console.error(`   ❌ Failed: ${err.message}`);
    }
  }

  console.log(`\n✅ Done! PNGs saved to ${OUTPUT_DIR}/\n`);
}

main();
