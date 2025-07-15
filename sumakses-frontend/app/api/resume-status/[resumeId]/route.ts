import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { resumeId: string } }
) {
  try {
    const resumeId = params.resumeId
    const apiUrl = process.env.NEXT_PUBLIC_RESUME_API_URL
    
    const response = await fetch(`${apiUrl}/status/${resumeId}`)
    const data = await response.json()
    
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch status' },
      { status: 500 }
    )
  }
}