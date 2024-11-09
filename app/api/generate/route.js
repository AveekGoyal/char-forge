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

// Updated equipment-specific class modifiers
const EQUIPMENT_CLASS_MODIFIERS = {
  warrior: {
    'sword-shield': "warrior wielding a longsword and shield",
    'hammer': "warrior wielding a massive war hammer",
    'daggers': "warrior dual-wielding short swords",
    'bow': "warrior with a sturdy combat bow",
    'staff': "warrior with a battle staff",
    'grimoire': "warrior with a magic tome"
  },
  mage: {
    'sword-shield': "battlemage with sword and magical shield",
    'hammer': "war-mage with enchanted warhammer",
    'daggers': "spellblade with magical daggers",
    'bow': "arcane archer with glowing bow",
    'staff': "mage wielding an ornate magical staff",
    'grimoire': "mage holding a glowing spellbook"
  },
  // Add similar mappings for other classes
  default: {
    'sword-shield': "character with sword and shield",
    'hammer': "character wielding a war hammer",
    'daggers': "character with dual daggers",
    'bow': "character with a bow",
    'staff': "character with a magical staff",
    'grimoire': "character with a spellbook"
  }
};

const buildPrompt = (style, characterClass, attributes = {}) => {
  const styleModifier = STYLE_MODIFIERS[style] || "";
  
  // Get equipment-specific class description
  const classModifiers = EQUIPMENT_CLASS_MODIFIERS[characterClass] || EQUIPMENT_CLASS_MODIFIERS.default;
  const equipmentModifier = classModifiers[attributes.equipment] || classModifiers['sword-shield'];
  
  // Base prompt structure focusing on character portrait and equipment
  const basePrompt = `A detailed portrait of a fantasy RPG ${equipmentModifier}, ${styleModifier}`;
  
  // Add attribute modifiers
  const attributePrompts = [];
  if (attributes.gender) {
    attributePrompts.push(`${attributes.gender} character`);
  }
  if (attributes.race) {
    attributePrompts.push(`${attributes.race} race`);
  }
  
  // Character details
  attributePrompts.push("determined expression");
  attributePrompts.push("three-quarter view portrait");
  
  // Combine all elements
  const fullPrompt = [
    basePrompt,
    ...attributePrompts,
    "high quality, detailed character portrait",
    "single character only",
    "clean background",
    "focused on character and equipment",
    "clear face details"
  ].join(", ");
  
  console.log("Generated prompt:", fullPrompt);
  return fullPrompt;
};

const validateInput = (style, characterClass) => {
  if (!STYLE_MODIFIERS[style]) {
    throw new Error(`Invalid style: ${style}`);
  }
  if (!EQUIPMENT_CLASS_MODIFIERS[characterClass] && characterClass !== 'default') {
    throw new Error(`Invalid character class: ${characterClass}`);
  }
};

const generateImage = async (prompt) => {
  const payload = {
    prompt,
    output_format: "webp",
    width: 512,
    height: 512,
    negative_prompt: "multiple characters, complex background, multiple weapons, full body, extreme poses, complex lighting, complex effects",
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

    // Generate single variation with improved prompt
    const prompt = buildPrompt(style, characterClass, attributes);
    const base64Image = await generateImage(prompt);

    const variation = {
      success: true,
      image: `data:image/webp;base64,${base64Image}`,
      metadata: {
        prompt,
        style,
        characterClass,
        attributes,
        generated: new Date().toISOString(),
      }
    };

    return NextResponse.json({
      success: true,
      variations: [variation], // Keep variations array for compatibility
      generatedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error("Error generating image:", error);
    
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