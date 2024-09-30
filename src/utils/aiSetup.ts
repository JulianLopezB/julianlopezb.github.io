import OpenAI from 'openai';
import { CV_DATA } from './cvData';

// Access the API key from the window.env object
const apiKey = (window as any).env?.REACT_APP_OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: apiKey,
  dangerouslyAllowBrowser: true
});

const SYSTEM_MESSAGE = `You are an AI assistant that answers questions about Julian's resume. Here's Julian's full CV:

${CV_DATA}

Please answer questions based on this information. If the information is not in the CV, politely say that you don't have that information.`;

export async function getAIResponse(question: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-16k", // Using a model with larger context
      messages: [
        { role: "system", content: SYSTEM_MESSAGE },
        { role: "user", content: question }
      ],
      max_tokens: 300 // Increased for more detailed responses
    });

    return response.choices[0].message.content || "Sorry, I couldn't generate a response.";
  } catch (error) {
    console.error("Error getting AI response:", error);
    return "Sorry, I encountered an error while processing your request.";
  }
}