import { NextRequest, NextResponse } from 'next/server';
import { chatWithBedrock } from '@/lib/bedrock';

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Add Filipino BPO context for better responses
    const filipinoContext = `You are SUMAKSES AI, a career coach for Filipino BPO professionals transitioning to tech. 
    Respond in a helpful, encouraging tone. Use both English and Filipino terms when appropriate. 
    Focus on practical advice for BPO-to-tech career transitions.
    ${context ? `\n\nAdditional context: ${context}` : ''}`;

    const response = await chatWithBedrock(message, filipinoContext);

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chat API error details:', {
      error: error.message,
      name: error.name,
      stack: error.stack
    });
    return NextResponse.json(
      { error: `API Error: ${error.message}` },
      { status: 500 }
    );
  }
}