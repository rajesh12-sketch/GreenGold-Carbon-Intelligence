
import { GoogleGenAI, Type, Modality } from "@google/genai";

// Portable API Key access logic
const getApiKey = () => {
  // Try platform-injected process.env, then Vite-style import.meta.env, then fallback
  return (process.env?.API_KEY) || 
         ((import.meta as any).env?.VITE_API_KEY) || 
         "";
};

const getAI = () => {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.warn("Gemini API Key is missing. Please set API_KEY in your environment.");
  }
  return new GoogleGenAI({ apiKey });
};

// Audio Helper Functions
export const decodeBase64 = (base64: string) => {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

export const encodeBase64 = (bytes: Uint8Array) => {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number = 24000,
  numChannels: number = 1,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export const searchUKCompany = async (query: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Search for UK company information matching: ${query}. Return the company name, registration number, and primary sector if found.`,
    config: {
      tools: [{ googleSearch: {} }],
    },
  });
  return {
    text: response.text || 'No information found for this query.',
    sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
  };
};

export const getDeepThinkingAnalysis = async (data: any) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: `Analyze this sustainability dataset deeply: ${JSON.stringify(data)}. Provide a strategic 12-month decarbonization roadmap for an enterprise in this sector.`,
    config: {
      thinkingConfig: { thinkingBudget: 32768 }
    },
  });
  return response;
};

export const getAIInsights = async (data: any) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Based on this sustainability data: ${JSON.stringify(data)}, provide 2-3 specific AI-driven carbon reduction recommendations for the ${data.industry || 'specified'} sector.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            description: { type: Type.STRING },
            impact: { type: Type.STRING },
            savings: { type: Type.NUMBER }
          },
          required: ["title", "description", "impact", "savings"]
        }
      }
    },
  });
  
  try {
    const text = response.text || '[]';
    return JSON.parse(text);
  } catch (error) {
    return [];
  }
};

export const generateSustainabilityImage = async (prompt: string, size: "1K" | "2K" | "4K" = "1K", aspectRatio: string = "1:1") => {
  const ai = getAI();
  const model = size === "1K" ? 'gemini-2.5-flash-image' : 'gemini-3-pro-image-preview';
  const response = await ai.models.generateContent({
    model: model,
    contents: { parts: [{ text: prompt }] },
    config: {
      imageConfig: { aspectRatio: aspectRatio as any, imageSize: size }
    },
  });
  
  const imagePart = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
  return imagePart ? `data:image/png;base64,${imagePart.inlineData.data}` : null;
};

export const generateSustainabilityVideo = async (prompt: string, startImageBase64?: string) => {
  const ai = getAI();
  const apiKey = getApiKey();
  const videoParams: any = {
    model: 'veo-3.1-fast-generate-preview',
    prompt,
    config: {
      numberOfVideos: 1,
      resolution: '720p',
      aspectRatio: '16:9'
    }
  };
  
  if (startImageBase64) {
    videoParams.image = { imageBytes: startImageBase64, mimeType: 'image/png' };
  }

  try {
    let operation = await ai.models.generateVideos(videoParams);
    while (!operation.done) {
      await new Promise(resolve => setTimeout(resolve, 10000));
      operation = await ai.operations.getVideosOperation({ operation: operation });
    }
    const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
    return `${downloadLink}&key=${apiKey}`;
  } catch (error: any) {
    throw error;
  }
};

export const speakReport = async (text: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: `Speak this sustainability insight professionally: ${text}` }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
      },
    },
  });
  return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
};
