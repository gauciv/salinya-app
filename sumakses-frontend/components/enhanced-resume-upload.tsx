"use client"

import React, { useState, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, CheckCircle, X, AlertCircle } from "lucide-react"

interface EnhancedResumeUploadProps {
  onComplete: (resumeData: any) => void
  onSkip: () => void
  userEmail?: string
}

interface UploadState {
  file: File | null
  uploading: boolean
  progress: number
  error: string
  success: boolean
  extractedData: any
}

export default function EnhancedResumeUpload({ onComplete, onSkip, userEmail }: EnhancedResumeUploadProps) {
  const [uploadState, setUploadState] = useState<UploadState>({
    file: null,
    uploading: false,
    progress: 0,
    error: '',
    success: false,
    extractedData: null
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
    const file = event.dataTransfer.files[0]
    if (!file) return

    // Create a synthetic event to reuse validation logic
    const syntheticEvent = {
      target: { files: [file] }
    } as React.ChangeEvent<HTMLInputElement>
    
    handleFileSelect(syntheticEvent)
  }, [handleFileSelect])

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }, [])

  const simulateUploadAndExtraction = async () => {
    updateState({ uploading: true, progress: 0, error: '' })

    try {
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200))
        updateState({ progress: i })
      }

      // Simulate AI extraction
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Mock extracted data
      const mockExtractedData = {
        skills: [
          { name: 'Customer Service', level: 90, category: 'Communication' },
          { name: 'Problem Solving', level: 85, category: 'Analytical' },
          { name: 'Team Leadership', level: 80, category: 'Management' },
          { name: 'Technical Support', level: 75, category: 'Technical' },
          { name: 'Process Improvement', level: 70, category: 'Operations' }
        ],
        experience: [
          {
            title: 'Customer Service Representative',
            company: 'BPO Company',
            duration: '2+ years',
            responsibilities: [
              'Handled customer inquiries and complaints',
              'Maintained high customer satisfaction scores',
              'Trained new team members'
            ]
          }
        ],
        education: [
          {
            degree: 'Bachelor\'s Degree',
            field: 'Business Administration',
            school: 'University'
          }
        ],
        certifications: [
          'Customer Service Excellence',
          'Team Leadership'
        ],
        summary: 'Experienced customer service professional with strong communication and problem-solving skills, ready to transition into tech roles.'
      }

      updateState({ 
        success: true, 
        uploading: false, 
        extractedData: mockExtractedData 
      })

    } catch (error) {
      updateState({ 
        error: 'Upload failed. Please try again.', 
        uploading: false 
      })
    }
  }

  const handleUpload = () => {
    if (!uploadState.file) return
    simulateUploadAndExtraction()
  }

  const handleComplete = () => {
    onComplete({
      resumeUploaded: true,
      fileName: uploadState.file?.name,
      extractedData: uploadState.extractedData,
      uploadedAt: new Date().toISOString()
    })
  }

  const removeFile = () => {
    updateState({ 
      file: null, 
      error: '', 
      success: false, 
      progress: 0, 
      extractedData: null 
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
              <label htmlFor="resume-upload">
                <Button
                  type="button"
                  className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-2"
                  asChild
                >
                  <span>Choose File</span>
                </Button>
              </label>
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

              {/* Upload Progress */}
              {uploadState.uploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {uploadState.progress < 100 ? 'Uploading...' : 'Extracting skills...'}
                    </span>
                    <span className="text-gray-900 font-medium">{uploadState.progress}%</span>
                  </div>
                  <Progress value={uploadState.progress} className="h-2" />
                </div>
              )}

              {/* Success State */}
              {uploadState.success && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="font-semibold text-green-800">Resume processed successfully!</p>
                      <p className="text-sm text-green-700">
                        We extracted {uploadState.extractedData?.skills?.length || 0} skills and your work experience
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Upload Button */}
              {!uploadState.uploading && !uploadState.success && (
                <Button
                  onClick={handleUpload}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-11"
                >
                  Process Resume with AI
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

      {/* Extracted Skills Preview */}
      {uploadState.success && uploadState.extractedData && (
        <Card className="rounded-2xl border border-gray-200">
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Extracted Skills</h3>
            <div className="grid grid-cols-1 gap-3">
              {uploadState.extractedData.skills.slice(0, 5).map((skill: any, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-gray-900">{skill.name}</span>
                    <span className="text-sm text-gray-500 ml-2">({skill.category})</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-2 bg-blue-500 rounded-full transition-all duration-1000"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{skill.level}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Benefits */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
        <h3 className="font-semibold text-blue-800 mb-2">Why upload your resume?</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>✓ AI extracts your transferable skills automatically</li>
          <li>✓ Better career match recommendations</li>
          <li>✓ Personalized learning path based on experience</li>
          <li>✓ Faster profile setup</li>
          <li>✓ Enhanced job placement assistance</li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col space-y-3">
        {uploadState.success ? (
          <Button
            onClick={handleComplete}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-11 font-semibold"
          >
            Continue with Enhanced Profile
          </Button>
        ) : (
          <Button
            onClick={onSkip}
            variant="outline"
            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl h-11 font-semibold"
          >
            Skip for Now
          </Button>
        )}
      </div>

      <p className="text-xs text-gray-500 text-center">
        Your resume is processed securely and never shared without your permission
      </p>
    </div>
  )
}