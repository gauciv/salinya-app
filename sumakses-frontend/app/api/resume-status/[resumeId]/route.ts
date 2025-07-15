import { NextRequest, NextResponse } from 'next/server'
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb'
import { getCached, setCache } from '@/lib/cache'

const dynamodb = new DynamoDBClient({ 
  region: process.env.AWS_REGION || 'ap-southeast-2',
  requestHandler: {
    requestTimeout: 3000,
    connectionTimeout: 1000
  }
})

export const maxDuration = 10

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ resumeId: string }> }
) {
  const { resumeId } = await params
  
  // Check cache first
  const cached = getCached(resumeId)
  if (cached) {
    return NextResponse.json(cached)
  }
  
  try {
    const command = new GetItemCommand({
      TableName: process.env.DYNAMODB_TABLE_NAME || 'ResumeAnalysisTable',
      Key: {
        resume_id: { S: resumeId }
      }
    })
    
    const result = await dynamodb.send(command)
    
    if (!result.Item) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 })
    }
    
    const status = result.Item.status?.S || 'processing'
    
    if (status === 'processing') {
      return NextResponse.json({ status: 'processing' })
    }
    
    if (status === 'failed') {
      return NextResponse.json({ 
        status: 'failed', 
        error: result.Item.error_message?.S || 'Processing failed' 
      })
    }
    
    // Parse analysis results from JSON string
    const analysisResults = result.Item.analysis_results?.S 
      ? JSON.parse(result.Item.analysis_results.S)
      : null
    
    const response = {
      status,
      analysis_results: analysisResults
    }
    
    // Cache completed results
    if (status === 'completed') {
      setCache(resumeId, response)
    }
    
    return NextResponse.json(response)
    
  } catch (error) {
    console.error('Error fetching resume status:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}