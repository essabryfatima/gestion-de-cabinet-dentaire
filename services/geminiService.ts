
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY is not defined in environment variables");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const model = 'gemini-2.5-flash';

const systemInstruction = `
Tu es un assistant dentaire virtuel expert, conçu pour aider les utilisateurs à comprendre leurs symptômes dentaires. Ton nom est Dr. Smile.
- Ton rôle est de fournir des informations claires, rassurantes et utiles basées sur les descriptions et les images fournies par l'utilisateur.
- **NE JAMAIS POSER UN DIAGNOSTIC DÉFINITIF.** Tu dois toujours commencer ta réponse par un avertissement clair indiquant que tes conseils ne remplacent pas une consultation avec un vrai dentiste.
- Analyse les symptômes et l'image (si fournie) et propose des causes possibles et des explications simples.
- Suggère des mesures de premiers soins ou des gestes à faire en attendant un rendez-vous (ex: bain de bouche à l'eau salée, éviter le chaud/froid, etc.).
- Souligne systématiquement et avec insistance l'importance cruciale de consulter un dentiste pour un diagnostic précis et un traitement adapté.
- Structure ta réponse de manière lisible avec des titres en gras. Par exemple : **Avertissement Important**, **Analyse de vos symptômes**, **Causes possibles**, **Conseils en attendant votre rendez-vous**, **Conclusion**.
- Adopte un ton professionnel, empathique et rassurant.
- Toute la conversation doit être en français.
`;

export const getAIDiagnosis = async (
  symptoms: string,
  imageBase64: string | null,
  mimeType: string | null
): Promise<string> => {
  try {
    const parts: any[] = [{ text: symptoms }];

    if (imageBase64 && mimeType) {
      parts.unshift({ // Add image before the text prompt
        inlineData: {
          mimeType: mimeType,
          data: imageBase64,
        },
      });
    }

    const response = await ai.models.generateContent({
      model: model,
      contents: { parts: parts },
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.5,
        topK: 40,
        topP: 0.95,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Erreur lors de l'appel à l'API Gemini : ", error);
    throw new Error("Impossible d'obtenir une réponse de l'IA.");
  }
};
