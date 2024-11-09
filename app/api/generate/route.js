// app/api/generate/route.js
import { NextResponse } from "next/server";
import axios from "axios";

const STYLE_MODIFIERS = {
  pixel: "pixel art style, 8-bit, retro gaming aesthetic",
  anime: "anime style, cel shaded, vibrant colors",
  realistic: "realistic digital art, highly detailed, cinematic lighting",
  vector: "vector art style, clean lines, flat colors",
  painterly: "digital painting style, brushstrokes visible, artistic",
  cyberpunk: "cyberpunk style, neon colors, futuristic elements",
  fantasy: "high fantasy style, magical elements, ethereal lighting",
  chibi: "chibi style, cute, super-deformed proportions"
};

const CLASS_MODIFIERS = {
  warrior: "armored warrior with weapons, battle-ready pose",
  mage: "mystical spellcaster with magical effects, arcane symbols",
  rogue: "stealthy character with daggers, cloaked in shadows",
  ranger: "agile archer with bow and nature elements",
  paladin: "holy knight with divine symbols and heavy armor",
  necromancer: "dark spellcaster with undead elements",
  monk: "martial artist in traditional garments",
  druid: "nature-themed spellcaster with animal elements"
};

// Additional modifiers to create variations
const VARIATION_MODIFIERS = [
  ", front view, full body shot, dramatic lighting",
  ", three-quarter view, action pose, atmospheric effects",
  ", side view, combat stance, dynamic composition",
  ", dynamic pose, elemental effects, heroic composition"
];

const buildPrompt = (style, characterClass, attributes = {}, variationIndex = 0) => {
  const styleModifier = STYLE_MODIFIERS[style] || "";
  const classModifier = CLASS_MODIFIERS[characterClass] || "";
  const variationModifier = VARIATION_MODIFIERS[variationIndex] || "";
  
  // Base prompt structure
  const basePrompt = `A character portrait for a fantasy RPG game, ${styleModifier}, ${classModifier}${variationModifier}`;
  
  // Add attribute modifiers
  const attributePrompts = [];
  if (attributes.gender) {
    attributePrompts.push(attributes.gender);
  }
  if (attributes.race) {
    attributePrompts.push(`${attributes.race} race`);
  }
  if (attributes.equipment) {
    attributePrompts.push(`wearing ${attributes.equipment}`);
  }
  
  // Combine all elements
  const fullPrompt = [
    basePrompt,
    ...attributePrompts,
    "high quality, detailed, centered composition"
  ].join(", ");
  
  return fullPrompt;
};

const validateInput = (style, characterClass) => {
  if (!STYLE_MODIFIERS[style]) {
    throw new Error(`Invalid style: ${style}`);
  }
  if (!CLASS_MODIFIERS[characterClass]) {
    throw new Error(`Invalid character class: ${characterClass}`);
  }
};

const generateSingleImage = async (prompt) => {
  const payload = {
    prompt,
    output_format: "webp",
    width: 512,
    height: 512,
  };

  const response = await axios.postForm(
    "https://api.stability.ai/v2beta/stable-image/generate/core",
    axios.toFormData(payload),
    {
      validateStatus: undefined,
      responseType: "arraybuffer",
      headers: {
        Authorization: `Bearer ${process.env.STABILITY_API_KEY}`,
        Accept: "image/*",
      },
    }
  );

  if (response.status !== 200) {
    throw new Error(`Stability AI API Error: ${response.status}`);
  }

  return Buffer.from(response.data).toString("base64");
};

export async function POST(request) {
  try {
    const {
      style = "realistic",
      characterClass = "warrior",
      attributes = {},
    } = await request.json();

    // Validate inputs
    validateInput(style, characterClass);

    // Generate 4 variations in parallel
    const variations = await Promise.all(
      VARIATION_MODIFIERS.map(async (_, index) => {
        const prompt = buildPrompt(style, characterClass, attributes, index);
        try {
          const base64Image = await generateSingleImage(prompt);
          return {
            success: true,
            image: `data:image/webp;base64,${base64Image}`,
            metadata: {
              prompt,
              style,
              characterClass,
              attributes,
              variation: index + 1,
              generated: new Date().toISOString(),
            }
          };
        } catch (error) {
          console.error(`Error generating variation ${index + 1}:`, error);
          return {
            success: false,
            error: error.message,
            variation: index + 1
          };
        }
      })
    );

    // Check if at least one variation was successful
    const successfulVariations = variations.filter(v => v.success);
    if (successfulVariations.length === 0) {
      throw new Error("Failed to generate any variations");
    }

    return NextResponse.json({
      success: true,
      variations
    });

  } catch (error) {
    console.error("Error generating images:", error);
    
    return NextResponse.json(
      {
        success: false,
        error: {
          message: error.message || "Failed to generate images",
          code: error.code || "GENERATION_ERROR"
        }
      },
      { status: error.status || 500 }
    );
  }
}