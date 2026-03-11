/**
 * Render Patient Retention carousel PNGs with ppbrand LoRA
 *
 * Usage:
 *   node scripts/render-patient-retention.mjs
 *
 * Requires FAL_KEY in .env or environment
 */
import "dotenv/config";
import { fal } from "@fal-ai/client";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

const OUTPUT_DIR = "./output/2026-03-11-patient-retention/carousel-png";
const LORA_URL = "https://huggingface.co/debbeefernandez/claude-patientpartner";
const LORA_SCALE = 0.85;

const slides = [
  {
    name: "patient-retention-carousel-01",
    prompt: `ppbrand style, professional social media carousel slide, dark navy blue background #314D69, large bold teal text "68%" centered, subtitle "of patients quit" in white below, supporting text "abandon new prescriptions without early support" in smaller white text, PatientPartner logo top left corner in white, slide number "01" badge top right, progress dots bottom left with first dot highlighted teal, "Swipe" text bottom right in teal, clean minimalist healthcare SaaS design, corporate premium quality, no photos no people, purely typographic layout`,
  },
  {
    name: "patient-retention-carousel-02",
    prompt: `ppbrand style, professional social media carousel slide, clean white background, thin teal accent bar on left edge, section label "THE PROBLEM" in small teal uppercase letters, headline "The retention crisis starts before Day 1" in dark navy Georgia serif font, body text about patients dropping off between diagnosis and first dose in gray, stat callout box with light teal background showing "48%" in large navy text with description "of patient drop-off occurs during pre-screening", PatientPartner logo top left, slide number "02" badge top right, progress dots bottom, clean minimalist healthcare design`,
  },
  {
    name: "patient-retention-carousel-03",
    prompt: `ppbrand style, professional social media carousel slide, soft light teal #DDF7F9 background, section label "THE OPPORTUNITY" in small dark teal uppercase, headline "What if retention started with a conversation?" in dark navy serif font, quote block with teal left border containing "1 in 4 patients would be more likely to start treatment if they could talk to someone who has already been on it", stat card showing "69%" with text "of patients would switch providers for a better support experience", PatientPartner logo top left, slide "03" badge, progress dots bottom, clean healthcare design`,
  },
  {
    name: "patient-retention-carousel-04",
    prompt: `ppbrand style, professional social media carousel slide, dark navy blue gradient background #314D69, section label "THE SOLUTION" in small teal uppercase, headline "Peer mentorship closes the retention gap" in white serif font, three numbered step cards with semi-transparent teal backgrounds: "1 Match instantly" "2 Connect before Day 1" "3 Stay the course", each with brief description text in white, teal numbered circles, PatientPartner logo top left white, slide "04" badge, progress dots bottom, clean corporate healthcare design`,
  },
  {
    name: "patient-retention-carousel-05",
    prompt: `ppbrand style, professional social media carousel slide, soft light teal #DDF7F9 background, section label "BY THE NUMBERS" in dark teal uppercase, headline "What happens when patients have a mentor" in navy serif, four white stat cards in 2x2 grid each with teal top border: "133.5 more days on therapy" "72% took the next step" "22% improvement in adherence" "68% increase in patient starts", large teal numbers with navy descriptions, PatientPartner logo top left, slide "05" badge, progress dots bottom, clean minimalist design`,
  },
  {
    name: "patient-retention-carousel-06",
    prompt: `ppbrand style, professional social media carousel slide, dark navy blue gradient background #314D69, centered layout, PatientPartner logo centered in white larger size, headline "Ready to keep patients on therapy longer?" in white serif font centered, subtext "Connect your patients with trained peer mentors" in soft white, large teal pill-shaped CTA button with text "Lets Talk" in navy, "patientpartner.com" in teal below, decorative subtle teal circles in corners at low opacity, progress dots bottom center, premium corporate healthcare design`,
  },
];

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  console.log(`\n🎨 Rendering ${slides.length} carousel slides with ppbrand LoRA...\n`);

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
