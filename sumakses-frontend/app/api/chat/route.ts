import { NextRequest, NextResponse } from 'next/server'
import { chatWithBedrock } from '@/lib/bedrock'

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()
    
    const context = `You are SUMAKSES AI, a career coach helping Filipino BPO professionals transition to tech careers. Keep responses under 200 words, practical and encouraging.`
    
    const response = await chatWithBedrock(message, context)
    
    return NextResponse.json({ response })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'AI service temporarily unavailable' },
      { status: 503 }
    )
  }
}