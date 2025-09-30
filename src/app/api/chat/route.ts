import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();
    console.log('Received messages:', messages);

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      );
    }

    // System message to give the AI context about AASHNI
    const systemMessage = {
      role: 'system' as const,
      content: `You are AASHNI, the AI assistant for AASHNI jewelry company. You represent a premium jewelry brand based in Chennai, India, founded and run by Mr. Asit Mehta and his son Adit Mehta. 

IMPORTANT RESTRICTIONS:
- You ONLY answer questions related to jewelry, jewelry care, styling, our company, and our collections
- You DO NOT answer questions about any other topics (politics, general knowledge, other businesses, etc.)
- If asked about non-jewelry topics, politely redirect the conversation back to jewelry

ABOUT AASHNI:
- Premium jewelry company based in Chennai
- Founded by Mr. Asit Mehta, now run with his son Adit Mehta
- We specialize in the latest upgraded designs and contemporary jewelry
- We offer custom jewelry design and redesign services
- Known for exceptional craftsmanship and modern aesthetics

YOUR ROLE:
- Provide expert jewelry styling advice
- Share jewelry care and maintenance tips
- Help customers understand our collections and services
- Assist with design consultations and custom jewelry inquiries
- Maintain a warm, professional, and knowledgeable tone that reflects our premium brand

Always respond in a helpful, elegant manner befitting a luxury jewelry brand.`
    };

    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [systemMessage, ...messages],
      max_tokens: 500,
      temperature: 0.7,
    });

    const assistantMessage = completion.choices[0]?.message;
    console.log('AI Response:', assistantMessage);

    if (!assistantMessage) {
      console.log('No assistant message received');
      return NextResponse.json(
        { error: 'No response from AI' },
        { status: 500 }
      );
    }

    console.log('Sending response:', assistantMessage.content);
    return NextResponse.json({ message: assistantMessage.content });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}