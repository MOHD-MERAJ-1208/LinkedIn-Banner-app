
import { GoogleGenAI } from "@google/genai";
import { BannerInputs } from "../types";

const MODEL_NAME = 'gemini-2.5-flash-image';

export const generateLinkedInBanner = async (inputs: BannerInputs, refinementPrompt?: string, currentImage?: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

  const parts: any[] = [];

  // If we have a refinement prompt and a current image, it's an EDIT task
  if (refinementPrompt && currentImage) {
    parts.push({
      inlineData: {
        data: currentImage.split(',')[1],
        mimeType: 'image/png'
      }
    });
    parts.push({
      text: `Based on this LinkedIn banner, please update it with the following request: ${refinementPrompt}. 
      Ensure the name "${inputs.name}", title "${inputs.jobTitle}", and expertise "${inputs.services}" remain clearly legible and professional. 
      Maintain a modern LinkedIn aesthetic.`
    });
  } else {
    // Initial generation task
    let prompt = `Create a professional, high-converting LinkedIn profile banner (aspect ratio 1584x396).
    The person's name is: ${inputs.name}.
    Job Position: ${inputs.jobTitle}.
    Services/Expertise: ${inputs.services}.
    Design Style: ${inputs.customPrompt || 'Modern, clean, corporate but creative'}.
    
    CRITICAL INSTRUCTIONS:
    - Include a clear section for the profile photo area on the far left which is often obscured. Place important text and the user's photo (if provided) towards the middle and right.
    - Use high-quality professional typography.
    - Ensure high contrast and readability.
    - The layout should feel premium and credible for LinkedIn personal branding.`;

    if (inputs.userPhoto) {
      parts.push({
        inlineData: {
          data: inputs.userPhoto.split(',')[1],
          mimeType: 'image/png'
        }
      });
      prompt += `\n- Incorporate the attached user photo naturally into the design with professional blending and lighting.`;
    }

    if (inputs.referenceBanner) {
      parts.push({
        inlineData: {
          data: inputs.referenceBanner.split(',')[1],
          mimeType: 'image/png'
        }
      });
      prompt += `\n- Use the attached reference image as inspiration for layout, vibe, and color palette without copying it exactly.`;
    }

    parts.push({ text: prompt });
  }

  const response = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: { parts },
    config: {
      imageConfig: {
        aspectRatio: "16:9" // Closest to 4:1 LinkedIn banner
      }
    }
  });

  const candidate = response.candidates?.[0];
  if (!candidate) throw new Error("No response from AI");

  for (const part of candidate.content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }

  throw new Error("No image data found in response");
};
