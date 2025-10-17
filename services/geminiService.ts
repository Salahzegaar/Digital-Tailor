import { GoogleGenAI, Modality } from "@google/genai";
import { ImagePart, EditedImageResult } from '../types';

export const editImage = async (images: ImagePart[], prompt: string): Promise<EditedImageResult> => {
    // A new AI client is created for each request to ensure the most up-to-date API key is used.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const imageParts = images.map((image) => ({
      inlineData: {
        data: image.data,
        mimeType: image.mimeType,
      },
    }));

    const contentParts = [...imageParts, { text: prompt }];

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-image",
            contents: { parts: contentParts },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        const parts = response.candidates?.[0]?.content?.parts;

        if (!parts || parts.length === 0) {
            const refusalText = response.text?.trim();
            if (refusalText) throw new Error(refusalText);
            throw new Error("The AI returned an empty response.");
        }

        let newImage: ImagePart | null = null;
        let responseText: string | undefined = undefined;

        for (const part of parts) {
            if (part.inlineData) {
                newImage = {
                    data: part.inlineData.data,
                    mimeType: part.inlineData.mimeType,
                };
            } else if (part.text) {
                responseText = part.text;
            }
        }

        if (!newImage) {
            if (responseText) throw new Error(responseText);
            throw new Error("The AI did not return an edited image.");
        }

        return { newImage, responseText };
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        if (errorMessage.includes("API key not valid") || errorMessage.includes("Requested entity was not found")) {
             throw new Error("مفتاح API الذي تم تكوينه غير صالح. يرجى التأكد من صحته.");
        }
        if (errorMessage.includes("quota")) {
            throw new Error("لقد تجاوزت الحصة المتاحة لمفتاح API الخاص بك. يرجى التحقق من خطتك وتفاصيل الفواتير.");
        }
        throw new Error(`لم نتمكن من تعديل الصورة. الرجاء المحاولة مرة أخرى. ${errorMessage}`);
    }
};