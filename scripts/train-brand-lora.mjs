/**
 * PatientPartner Brand LoRA Trainer
 * Trains a custom FLUX LoRA on PatientPartner's brand style using fal.ai.
 *
 * Prerequisites:
 *   1. Create a folder with 10–30 PatientPartner brand images (screenshots of
 *      existing social posts, website sections, marketing materials, slide decks).
 *   2. ZIP them into a single archive.
 *   3. Upload the ZIP to a public URL (or use fal.ai's file upload).
 *
 * Usage:
 *   FAL_KEY=your_key node scripts/train-brand-lora.mjs --images path/to/brand-images.zip
 *   FAL_KEY=your_key node scripts/train-brand-lora.mjs --images https://url-to/brand-images.zip
 *   FAL_KEY=your_key node scripts/train-brand-lora.mjs --images ./brand-assets/  (directory of images)
 *
 * Options:
 *   --images <path|url>   Path to ZIP file, image directory, or URL (required)
 *   --steps <number>      Training steps (default: 1000, range: 500–2000)
 *   --trigger <word>      Trigger word (default: "ppbrand")
 *   --model <v1|v2>       FLUX version to train on (default: v1)
 *   --dry-run             Show what would be uploaded without training
 *
 * After training:
 *   The script saves the LoRA weights URL to ./brand-lora-config.json
 *   Use this with generate-images.mjs --lora to generate branded images.
 */

import { fal } from "@fal-ai/client";
import { readFile, writeFile, readdir, stat } from "fs/promises";
import { join, extname, resolve } from "path";
import { createReadStream } from "fs";

const DEFAULTS = {
  triggerWord: "ppbrand",
  steps: 1000,
  model: "v1",
};

const TRAINER_MODELS = {
  v1: "fal-ai/flux-lora-fast-training",
  v2: "fal-ai/flux-2-trainer",
};

const INFERENCE_MODELS = {
  v1: "fal-ai/flux-lora",
  v2: "fal-ai/flux-2/lora",
};

// ──────────────────────────────────────────────
// Upload helpers
// ──────────────────────────────────────────────

async function uploadFile(filePath) {
  console.log(`  Uploading ${filePath}...`);
  const file = new File(
    [await readFile(filePath)],
    filePath.split("/").pop(),
    { type: getMimeType(filePath) }
  );
  const url = await fal.storage.upload(file);
  console.log(`  ✓ Uploaded: ${url}`);
  return url;
}

function getMimeType(path) {
  const ext = extname(path).toLowerCase();
  const types = {
    ".zip": "application/zip",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
  };
  return types[ext] || "application/octet-stream";
}

async function isDirectory(path) {
  try {
    return (await stat(path)).isDirectory();
  } catch {
    return false;
  }
}

async function isFile(path) {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
}

/**
 * If the user provides a directory of images, we need to ZIP them
 * and upload. We use a simple approach: create a tar-like structure
 * that fal.ai accepts, or instruct the user to zip manually.
 */
async function resolveImagesUrl(imagesArg) {
  // Already a URL
  if (imagesArg.startsWith("http://") || imagesArg.startsWith("https://")) {
    console.log(`  Using remote URL: ${imagesArg}`);
    return imagesArg;
  }

  const absPath = resolve(imagesArg);

  // It's a ZIP file — upload it
  if (absPath.endsWith(".zip") && await isFile(absPath)) {
    return await uploadFile(absPath);
  }

  // It's a directory — instruct user to zip first
  if (await isDirectory(absPath)) {
    const files = await readdir(absPath);
    const imageFiles = files.filter((f) =>
      [".png", ".jpg", ".jpeg", ".webp"].includes(extname(f).toLowerCase())
    );

    if (imageFiles.length === 0) {
      throw new Error(`No image files found in ${absPath}`);
    }

    console.log(`\n  Found ${imageFiles.length} images in ${absPath}:`);
    imageFiles.forEach((f) => console.log(`    - ${f}`));
    console.log(`\n  Please ZIP these images first:`);
    console.log(`    cd "${absPath}" && zip ../brand-images.zip *.png *.jpg *.jpeg *.webp`);
    console.log(`    Then re-run with: --images ${join(absPath, "..", "brand-images.zip")}\n`);
    throw new Error(
      "Directory provided — please ZIP the images first (see instructions above)"
    );
  }

  throw new Error(`Cannot find file or directory: ${absPath}`);
}

// ──────────────────────────────────────────────
// Training
// ──────────────────────────────────────────────

async function trainLoRA({ imagesUrl, triggerWord, steps, model }) {
  const trainerModel = TRAINER_MODELS[model];
  const inferenceModel = INFERENCE_MODELS[model];

  console.log(`\n═══ Training PatientPartner Brand LoRA ═══\n`);
  console.log(`  Model:        ${trainerModel}`);
  console.log(`  Trigger word: "${triggerWord}"`);
  console.log(`  Steps:        ${steps}`);
  console.log(`  Est. cost:    $${(steps * (model === "v2" ? 0.008 : 0.002)).toFixed(2)}`);
  console.log(`  Images:       ${imagesUrl}`);
  console.log();

  const input = {
    images_data_url: imagesUrl,
    trigger_word: triggerWord,
    steps,
    is_style: true,
    create_masks: false,
  };

  console.log("  Submitting training job...\n");

  const result = await fal.subscribe(trainerModel, {
    input,
    logs: true,
    onQueueUpdate: (update) => {
      if (update.status === "IN_QUEUE") {
        process.stdout.write("  ⏳ In queue...\r");
      }
      if (update.status === "IN_PROGRESS") {
        process.stdout.write("  🎨 Training in progress...\r");
        if (update.logs) {
          update.logs.forEach((log) => {
            if (log.message) console.log(`  [train] ${log.message}`);
          });
        }
      }
    },
  });

  console.log("\n  ✓ Training complete!\n");

  // Extract LoRA weights URL from result
  const loraUrl =
    result.data.diffusers_lora_file?.url ||
    result.data.lora_weights?.url ||
    result.data.config_file?.url ||
    null;

  if (!loraUrl) {
    console.log("  Full result:", JSON.stringify(result.data, null, 2));
    throw new Error("Could not find LoRA weights URL in training result");
  }

  // Save config
  const config = {
    loraUrl,
    triggerWord,
    trainerModel,
    inferenceModel,
    steps,
    trainedAt: new Date().toISOString(),
    resultData: result.data,
  };

  const configPath = "./brand-lora-config.json";
  await writeFile(configPath, JSON.stringify(config, null, 2));
  console.log(`  LoRA weights: ${loraUrl}`);
  console.log(`  Config saved: ${configPath}`);

  return config;
}

// ──────────────────────────────────────────────
// Test generation
// ──────────────────────────────────────────────

async function testGeneration(config) {
  console.log("\n═══ Test Generation ═══\n");

  const testPrompt = `${config.triggerWord} style, professional social media graphic, dark navy blue background (#314D69), large bold teal statistic "92%" in center, supporting text "patient retention rate" in white below, clean minimalist healthcare design, modern SaaS aesthetic`;

  console.log(`  Prompt: ${testPrompt.slice(0, 100)}...`);
  console.log(`  Using: ${config.inferenceModel} + trained LoRA`);

  const result = await fal.subscribe(config.inferenceModel, {
    input: {
      prompt: testPrompt,
      image_size: { width: 1080, height: 1080 },
      num_images: 1,
      loras: [{ path: config.loraUrl, scale: 0.85 }],
      num_inference_steps: 28,
      guidance_scale: 3.5,
    },
    logs: true,
    onQueueUpdate: (update) => {
      if (update.status === "IN_PROGRESS") {
        process.stdout.write("  🎨 Generating test image...\r");
      }
    },
  });

  const imageUrl = result.data.images[0].url;
  console.log(`\n  ✓ Test image: ${imageUrl}`);

  // Download
  const response = await fetch(imageUrl);
  const buffer = Buffer.from(await response.arrayBuffer());
  await writeFile("./output/brand-lora-test.png", buffer);
  console.log("  ✓ Saved: ./output/brand-lora-test.png");
}

// ──────────────────────────────────────────────
// CLI
// ──────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);

  if (args.includes("--help") || args.length === 0) {
    console.log(`
PatientPartner Brand LoRA Trainer

Usage:
  FAL_KEY=your_key node scripts/train-brand-lora.mjs --images <path-or-url>

Options:
  --images <path|url>   ZIP file, directory, or URL of brand images (required)
  --steps <number>      Training steps (default: 1000)
  --trigger <word>      Trigger word (default: "ppbrand")
  --model <v1|v2>       FLUX version (default: v1)
  --dry-run             Preview without training
  --test                Run a test generation after training

Steps to prepare brand images:
  1. Collect 10-30 PatientPartner images:
     - Screenshots of existing social media posts
     - Website hero sections and feature blocks
     - Marketing slide decks (individual slides)
     - Brand guideline example graphics
     - Any branded materials with the teal/navy color scheme

  2. Save as PNG/JPG at 1024x1024 or larger

  3. ZIP them:
     zip brand-images.zip *.png *.jpg

  4. Run this script:
     FAL_KEY=your_key node scripts/train-brand-lora.mjs --images brand-images.zip
`);
    return;
  }

  const getArg = (flag) => {
    const idx = args.indexOf(flag);
    return idx !== -1 && idx + 1 < args.length ? args[idx + 1] : null;
  };

  const imagesArg = getArg("--images");
  const steps = parseInt(getArg("--steps") || DEFAULTS.steps, 10);
  const triggerWord = getArg("--trigger") || DEFAULTS.triggerWord;
  const model = getArg("--model") || DEFAULTS.model;
  const dryRun = args.includes("--dry-run");
  const runTest = args.includes("--test");

  if (!imagesArg) {
    console.error("Error: --images is required. Use --help for usage.");
    process.exit(1);
  }

  if (!["v1", "v2"].includes(model)) {
    console.error('Error: --model must be "v1" or "v2"');
    process.exit(1);
  }

  // Resolve images URL
  const imagesUrl = await resolveImagesUrl(imagesArg);

  if (dryRun) {
    console.log("\n[DRY RUN]");
    console.log(`  Images URL:   ${imagesUrl}`);
    console.log(`  Trainer:      ${TRAINER_MODELS[model]}`);
    console.log(`  Trigger word: "${triggerWord}"`);
    console.log(`  Steps:        ${steps}`);
    console.log(`  Est. cost:    $${(steps * (model === "v2" ? 0.008 : 0.002)).toFixed(2)}`);
    return;
  }

  // Train
  const config = await trainLoRA({ imagesUrl, triggerWord, steps, model });

  // Optional test generation
  if (runTest) {
    await testGeneration(config);
  }

  console.log(`
═══ Next Steps ═══

1. Review the test image in ./output/brand-lora-test.png

2. To generate branded images, update scripts/generate-images.mjs:
   - Load the LoRA config from ./brand-lora-config.json
   - Pass loras: [{ path: loraUrl, scale: 0.85 }] to FLUX calls
   - Prefix prompts with "${triggerWord} style,"

3. Adjust LoRA scale (0.0–1.0) to control brand strength:
   - 0.7–0.85: Strong brand style, flexible compositions
   - 0.85–1.0: Very strict brand adherence
   - 0.5–0.7:  Subtle brand influence, more creative freedom

4. If results aren't branded enough:
   - Add more training images (20-30 is ideal)
   - Increase steps to 1500
   - Use higher LoRA scale (0.9+)

5. If results are too rigid / all look the same:
   - Reduce steps to 500-700
   - Lower LoRA scale to 0.6-0.7
   - Use more diverse training images
`);
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
