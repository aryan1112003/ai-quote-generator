import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateQuote(mood: string): Promise<{ text: string; author: string }> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `Generate an inspiring quote that reflects a ${mood} mood. Return it in the format: "quote" - author. Make sure the quote is meaningful and uplifting.`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    const [quote, author] = response.split(' - ').map(s => s.trim());
    return {
      text: quote.replace(/["']/g, ''),
      author: author || 'Unknown'
    };
  } catch (error) {
    console.error('Error generating quote:', error);
    return {
      text: 'The best preparation for tomorrow is doing your best today.',
      author: 'H. Jackson Brown Jr.'
    };
  }
}