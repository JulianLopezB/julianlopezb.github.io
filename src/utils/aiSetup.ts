import OpenAI from 'openai';
import { CV_DATA } from './cvData';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const SYSTEM_MESSAGE = `You are an AI assistant that answers questions about Julian's resume. Here's Julian's full CV:

${CV_DATA}

Please answer questions based on this information. If the information is not in the CV, politely say that you don't have that information.`;

export async function getAIResponse(question: string, previousMessages: { role: 'user' | 'assistant' | 'system'; content: string }[] = []): Promise<{ content: string; isComplete: boolean }> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-16k",
      messages: [
        { role: "system", content: SYSTEM_MESSAGE },
        ...previousMessages,
        { role: "user", content: question }
      ] as OpenAI.Chat.ChatCompletionMessageParam[],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const content = response.choices[0].message.content || "Sorry, I couldn't generate a response.";
    const isComplete = !response.choices[0].finish_reason || response.choices[0].finish_reason === 'stop';

    return { content, isComplete };
  } catch (error) {
    console.error("Error getting AI response:", error);
    return { content: "Sorry, I encountered an error while processing your request.", isComplete: true };
  }
}