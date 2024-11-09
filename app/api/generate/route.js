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

const buildPrompt = (style, characterClass, attributes = {}) => {
  const styleModifier = STYLE_MODIFIERS[style] || "";
  const classModifier = CLASS_MODIFIERS[characterClass] || "";
  
  // Base prompt structure
  const basePrompt = `A character portrait for a fantasy RPG game, ${styleModifier}, ${classModifier}`;
  
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

export async function POST(request) {
  try {
    // Parse request body
    const {
      style = "realistic",
      characterClass = "warrior",
      attributes = {},
      width = 512,
      height = 512,
    } = await request.json();

    // Validate inputs
    validateInput(style, characterClass);

    // Build the prompt
    const prompt = buildPrompt(style, characterClass, attributes);

    // Prepare the payload for Stability AI
    const payload = {
      prompt,
      output_format: "webp",
      width: Math.min(Math.max(width, 200), 1024), // Clamp between 200 and 1024
      height: Math.min(Math.max(height, 200), 1024),
    };

    // Make request to Stability AI
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

    // Handle API errors
    if (response.status !== 200) {
      throw new Error(`Stability AI API Error: ${response.status}`);
    }

    // Convert the binary data to base64
    const base64Image = Buffer.from(response.data).toString("base64");

    // Return success response with metadata
    return NextResponse.json({
      success: true,
      data: {
        image: `data:image/webp;base64,${base64Image}`,
        metadata: {
          prompt,
          style,
          characterClass,
          attributes,
          generated: new Date().toISOString(),
        }
      }
    });

  } catch (error) {
    console.error("Error generating image:", error);
    
    // Return structured error response
    return NextResponse.json(
      {
        success: false,
        error: {
          message: error.message || "Failed to generate image",
          code: error.code || "GENERATION_ERROR"
        }
      },
      { status: error.status || 500 }
    );
  }
}