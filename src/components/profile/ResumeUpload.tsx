'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { useAuth } from '@/hooks/useAuth'
import { userService } from '@/services/userService'
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react'

export function ResumeUpload() {
  const { user, refreshUser } = useAuth()
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    setIsUploading(true)
    setUploadError(null)
    setUploadSuccess(false)
    setUploadProgress(0)

    try {
      await userService.uploadResume(file, (progress) => {
        setUploadProgress(progress)
      })

      await refreshUser()
      setUploadSuccess(true)
      setTimeout(() => setUploadSuccess(false), 3000)
    } catch (error: any) {
      setUploadError(error.message || 'Failed to upload resume')
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }, [refreshUser])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <FileText className="h-5 w-5" />
          <span>Resume Upload</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {user?.resume_file_path && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-md">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm text-green-800">
                Resume uploaded successfully
              </span>
            </div>
          </div>
        )}

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-primary-500 bg-primary-50'
              : 'border-gray-300 hover:border-primary-400'
          }`}
        >
          <input {...getInputProps()} />
          
          {isUploading ? (
            <div className="space-y-4">
              <LoadingSpinner size="lg" className="mx-auto" />
              <div>
                <p className="text-sm text-gray-600">Uploading resume...</p>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">{uploadProgress}%</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <Upload className="h-12 w-12 text-gray-400 mx-auto" />
              <div>
                <p className="text-lg font-medium text-gray-900">
                  {isDragActive ? 'Drop your resume here' : 'Upload your resume'}
                </p>
                <p className="text-sm text-gray-600">
                  Drag and drop your file here, or click to browse
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Supports PDF, DOC, and DOCX files up to 10MB
                </p>
              </div>
            </div>
          )}
        </div>

        {uploadError && (
          <div className="p-4 bg-error-50 border border-error-200 rounded-md">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-error-600" />
              <span className="text-sm text-error-800">{uploadError}</span>
            </div>
          </div>
        )}

        {uploadSuccess && (
          <div className="p-4 bg-success-50 border border-success-200 rounded-md">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-success-600" />
              <span className="text-sm text-success-800">
                Resume uploaded and processed successfully!
              </span>
            </div>
          </div>
        )}

        <div className="text-xs text-gray-500">
          <p>Your resume will be processed to extract relevant information for matching.</p>
          <p>We respect your privacy and only use this data for academic matching purposes.</p>
        </div>
      </CardContent>
    </Card>
  )
}
