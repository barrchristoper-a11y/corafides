
import { GoogleGenAI } from "@google/genai";

export class GeminiInsightsService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async getSalesAnalysis(data: any) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze this e-commerce sales data and provide 3 brief strategic recommendations: ${JSON.stringify(data)}`,
      });
      return response.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Unable to generate insights at this moment.";
    }
  }
}

export const insightsService = new GeminiInsightsService();
