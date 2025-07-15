"use client"

import React, { useState, useCallback, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, CheckCircle, X, AlertCircle, Brain } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface EnhancedResumeUploadProps {
  onComplete: (resumeData: any) => void
  onSkip: () => void
  userEmail?: string
}

interface UploadState {
  file: File | null
  uploading: boolean
  analyzing: boolean
  progress: number
  error: string
  success: boolean
  resumeId: string | null
  analysisResults: any
  currentStep: string
}

export default function EnhancedResumeUpload({ onComplete, onSkip, userEmail }: EnhancedResumeUploadProps) {
  const [uploadState, setUploadState] = useState<UploadState>({
    file: null,
    uploading: false,
    analyzing: false,
    progress: 0,
    error: '',
    success: false,
    resumeId: null,
    analysisResults: null,
    currentStep: 'idle'
  })

  const updateState = (updates: Partial<UploadState>) => {
    setUploadState(prev => ({ ...prev, ...updates }))
  }

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
    if (!allowedTypes.includes(file.type)) {
      updateState({ error: 'Please upload a PDF, DOC, DOCX, or TXT file' })
      return
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      updateState({ error: 'File size must be less than 5MB' })
      return
    }

    updateState({ file, error: '' })
  }, [])

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    
    const files = event.dataTransfer.files
    if (files && files[0]) {
      const file = files[0]
      
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
      if (!allowedTypes.includes(file.type)) {
        updateState({ error: 'Please upload a PDF, DOC, DOCX, or TXT file' })
        return
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        updateState({ error: 'File size must be less than 5MB' })
        return
      }

      updateState({ file, error: '' })
    }
  }, [])

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }, [])

  const handleDragEnter = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }, [])

  const handleDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }, [])

  const uploadToAPI = async () => {
    if (!uploadState.file) return
    
    updateState({ uploading: true, progress: 10, error: '', currentStep: 'Uploading file...' })

    try {
      // Convert file to base64
      const fileReader = new FileReader()
      const base64Promise = new Promise<string>((resolve, reject) => {
        fileReader.onload = () => {
          const result = fileReader.result as string
          const base64 = result.split(',')[1]
          resolve(base64)
        }
        fileReader.onerror = reject
        fileReader.readAsDataURL(uploadState.file!)
      })

      updateState({ progress: 20, currentStep: 'Processing file...' })
      const base64Content = await base64Promise
      
      updateState({ progress: 30, currentStep: 'Sending to server...' })
      
      // Upload to API
      const apiUrl = process.env.NEXT_PUBLIC_RESUME_API_URL
      const response = await fetch(`${apiUrl}/upload-resume`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          file_content_base64: base64Content,
          file_name: uploadState.file.name,
          content_type: uploadState.file.type
        })
      })

      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.message || 'Upload failed')
      }

      updateState({ 
        progress: 50, 
        uploading: false, 
        analyzing: true,
        resumeId: result.resume_id,
        currentStep: 'AI analyzing your resume...'
      })

      // Start polling for analysis results
      pollForResults(result.resume_id)

    } catch (error) {
      updateState({ 
        error: error instanceof Error ? error.message : 'Upload failed. Please try again.', 
        uploading: false,
        analyzing: false,
        currentStep: 'idle'
      })
    }
  }

  const pollForResults = async (resumeId: string) => {
    const maxAttempts = 30 // 5 minutes max
    let attempts = 0
    
    const poll = async () => {
      try {
        attempts++
        const response = await fetch(`/api/resume-status/${resumeId}`)
        const data = await response.json()

        // Update progress based on status
        if (data.status === 'processing') {
          const progressValue = Math.min(50 + (attempts * 2), 90)
          updateState({ 
            progress: progressValue,
            currentStep: attempts < 5 ? 'Extracting text from resume...' : 
                       attempts < 15 ? 'AI analyzing skills and experience...' :
                       'Generating compatibility insights...'
          })
          
          if (attempts < maxAttempts) {
            setTimeout(poll, 10000) // Poll every 10 seconds
          } else {
            throw new Error('Analysis timeout - please try again')
          }
        } else if (data.status === 'completed') {
          updateState({
            progress: 100,
            analyzing: false,
            success: true,
            analysisResults: data.analysis_results,
            currentStep: 'Analysis complete!'
          })
        } else if (data.status === 'failed') {
          throw new Error(data.error_message || 'Analysis failed')
        }
      } catch (error) {
        updateState({
          error: error instanceof Error ? error.message : 'Analysis failed. Please try again.',
          analyzing: false,
          currentStep: 'idle'
        })
      }
    }
    
    poll()
  }

  const handleUpload = () => {
    if (!uploadState.file) return
    uploadToAPI()
  }

  const handleComplete = () => {
    onComplete({
      resumeUploaded: true,
      fileName: uploadState.file?.name,
      resumeId: uploadState.resumeId,
      analysisResults: uploadState.analysisResults,
      uploadedAt: new Date().toISOString()
    })
  }

  const removeFile = () => {
    updateState({ 
      file: null, 
      error: '', 
      success: false, 
      progress: 0, 
      analyzing: false,
      uploading: false,
      resumeId: null,
      analysisResults: null,
      currentStep: 'idle'
    })
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Resume</h2>
        <p className="text-gray-600">
          Optional - Our AI will extract your skills and experience to enhance your profile
        </p>
      </div>

      {/* Upload Area */}
      <Card className="rounded-2xl border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
        <CardContent className="p-8">
          {!uploadState.file ? (
            <div
              className="text-center cursor-pointer"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onClick={() => {
                const input = document.getElementById('resume-upload') as HTMLInputElement
                if (input) {
                  input.click()
                }
              }}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Upload className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Drop your resume here
              </h3>
              <p className="text-gray-600 mb-4">
                or click to browse files
              </p>
              <input
                type="file"
                onChange={handleFileSelect}
                accept=".pdf,.doc,.docx,.txt"
                className="hidden"
                id="resume-upload"
              />
              <Button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  const input = document.getElementById('resume-upload') as HTMLInputElement
                  if (input) {
                    input.value = '' // Reset input to allow same file selection
                    input.click()
                  }
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-2"
              >
                Choose File
              </Button>
              <p className="text-xs text-gray-500 mt-3">
                Supports PDF, DOC, DOCX, TXT (max 5MB)
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* File Info */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">{uploadState.file.name}</p>
                    <p className="text-sm text-gray-500">
                      {(uploadState.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                {!uploadState.uploading && !uploadState.success && (
                  <button
                    onClick={removeFile}
                    className="p-1 hover:bg-gray-200 rounded-full"
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                )}
              </div>

              {/* Upload/Analysis Progress */}
              {(uploadState.uploading || uploadState.analyzing) && (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Brain className="h-5 w-5 text-blue-600 animate-pulse" />
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">{uploadState.currentStep}</span>
                        <span className="text-gray-900 font-medium">{uploadState.progress}%</span>
                      </div>
                      <Progress value={uploadState.progress} className="h-2" />
                    </div>
                  </div>
                  {uploadState.analyzing && (
                    <div className="text-xs text-gray-500 text-center">
                      AI is analyzing your resume - this may take 1-3 minutes
                    </div>
                  )}
                </div>
              )}

              {/* Success State */}
              {uploadState.success && uploadState.analysisResults && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="font-semibold text-green-800">AI Analysis Complete!</p>
                      <p className="text-sm text-green-700">
                        Compatibility Score: {uploadState.analysisResults.compatibility_score}% • 
                        {uploadState.analysisResults.top_technical_skills_found?.length || 0} skills identified
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Upload Button */}
              {!uploadState.uploading && !uploadState.analyzing && !uploadState.success && (
                <Button
                  onClick={uploadToAPI}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-11"
                >
                  Analyze Resume with AI
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Error Message */}
      {uploadState.error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
          <p className="text-sm text-red-700">{uploadState.error}</p>
        </div>
      )}

      {/* AI Analysis Results */}
      {uploadState.success && uploadState.analysisResults && (
        <Card className="rounded-2xl border border-gray-200">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {uploadState.analysisResults.compatibility_score}%
                </div>
                <p className="text-sm text-gray-600">Tech Career Compatibility</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Top Technical Skills Found</h3>
                <div className="flex flex-wrap gap-2">
                  {uploadState.analysisResults.top_technical_skills_found?.map((skill: string, index: number) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              {uploadState.analysisResults.compatibility_explanation && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Analysis Summary</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {uploadState.analysisResults.compatibility_explanation}
                  </p>
                </div>
              )}
              
              {uploadState.analysisResults.suggested_keywords?.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Suggested Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {uploadState.analysisResults.suggested_keywords.map((keyword: string, index: number) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Benefits */}
      {!uploadState.success && (
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <h3 className="font-semibold text-blue-800 mb-2">AI-Powered Resume Analysis</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>✓ Real compatibility scoring for tech careers</li>
            <li>✓ Identifies your transferable technical skills</li>
            <li>✓ Personalized career transition roadmap</li>
            <li>✓ Skills gap analysis and recommendations</li>
            <li>✓ Resume optimization suggestions</li>
          </ul>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col space-y-3">
        {uploadState.success ? (
          <Button
            onClick={handleComplete}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-11 font-semibold"
          >
            Continue with AI Analysis Results
          </Button>
        ) : (
          <Button
            onClick={onSkip}
            variant="outline"
            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl h-11 font-semibold"
            disabled={uploadState.uploading || uploadState.analyzing}
          >
            {uploadState.uploading || uploadState.analyzing ? 'Processing...' : 'Skip for Now'}
          </Button>
        )}
      </div>

      <div className="text-center space-y-2">
        <p className="text-xs text-gray-500">
          Resume are protected, view{" "}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="link" className="text-xs text-blue-600 hover:text-blue-700 p-0 h-auto underline">
                privacy policy
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-gray-900">Privacy Policy</DialogTitle>
                <DialogDescription className="text-sm text-gray-600">
                  Last updated: {new Date().toLocaleDateString()}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <section>
                  <h3 className="font-semibold text-gray-900 mb-2">1. Information We Collect</h3>
                  <p className="mb-2">
                    When you upload your resume, we collect and process the following information:
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Resume content and file metadata</li>
                    <li>Contact information provided during registration</li>
                    <li>Usage data and interaction with our services</li>
                    <li>Technical information about your device and browser</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-semibold text-gray-900 mb-2">2. How We Use Your Information</h3>
                  <p className="mb-2">We use the collected information to:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Analyze your resume using AI to provide career insights</li>
                    <li>Generate personalized learning roadmaps and recommendations</li>
                    <li>Improve our services and user experience</li>
                    <li>Communicate with you about your account and services</li>
                    <li>Ensure security and prevent fraud</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-semibold text-gray-900 mb-2">3. Data Security</h3>
                  <p>
                    We implement industry-standard security measures to protect your information:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li>Encryption of data in transit and at rest</li>
                    <li>Secure cloud infrastructure using AWS services</li>
                    <li>Regular security audits and updates</li>
                    <li>Limited access to personal data by authorized personnel only</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-semibold text-gray-900 mb-2">4. Data Sharing</h3>
                  <p>
                    We do not sell, trade, or rent your personal information to third parties. 
                    We may share your information only in the following circumstances:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li>With your explicit consent</li>
                    <li>To comply with legal obligations</li>
                    <li>To protect our rights and safety</li>
                    <li>With service providers who assist in our operations (under strict confidentiality agreements)</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-semibold text-gray-900 mb-2">5. Your Rights</h3>
                  <p>You have the right to:</p>
                  <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li>Access and review your personal information</li>
                    <li>Request correction of inaccurate data</li>
                    <li>Request deletion of your data</li>
                    <li>Opt-out of marketing communications</li>
                    <li>Export your data in a portable format</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-semibold text-gray-900 mb-2">6. Data Retention</h3>
                  <p>
                    We retain your resume data for as long as your account is active or as needed 
                    to provide our services. You may request deletion of your data at any time.
                  </p>
                </section>

                <section>
                  <h3 className="font-semibold text-gray-900 mb-2">7. Contact Us</h3>
                  <p>
                    If you have any questions about this Privacy Policy or our data practices, 
                    please contact us at privacy@sumakses.com
                  </p>
                </section>
              </div>
            </DialogContent>
          </Dialog>
        </p>
      </div>
    </div>
  )
}