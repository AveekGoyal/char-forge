import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request) {
  try {
    const {
      prompt = "A fantasy character portrait for Dungeons and Dragons, digital art style",
    } = await request.json();

    const payload = {
      prompt,
      output_format: "webp",
      width: 200,
      height: 200,
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
      throw new Error(`API Error: ${response.status}`);
    }

    // Convert the binary data to base64
    const base64Image = Buffer.from(response.data).toString("base64");

    return NextResponse.json({
      image: `data:image/webp;base64,${base64Image}`,
    });
  } catch (error) {
    console.error("Error generating image:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate image" },
      { status: 500 }
    );
  }
}