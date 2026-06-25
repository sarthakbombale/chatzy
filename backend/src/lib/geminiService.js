// backend/src/lib/geminiService.js
import { GoogleGenAI } from '@google/genai';

// Initialize the Google Gen AI SDK using the official class setup
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const getBotResponse = async (userMessage) => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash', 
      config: {
        systemInstruction: "You are Chatzy AI, a friendly and highly intelligent AI assistant integrated inside Chatzy app. Keep your answers clear, helpful, engaging, and under 3 paragraphs.",
        safetySettings: [
          { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_LOW_AND_ABOVE' },
          { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_LOW_AND_ABOVE' },
          { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_LOW_AND_ABOVE' },
          { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_LOW_AND_ABOVE' }
        ]
      }
    });

    const response = await chat.sendMessage({ message: userMessage });
    return response.text || "I'm sorry, I cannot answer that due to safety filters.";
  } catch (error) {
    console.error("Gemini System Error:", error);
    return "Oops! Something went wrong on my end. Please try again in a moment.";
  }
};