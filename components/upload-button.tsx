'use client'

import React, { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'

interface UploadButtonProps {
  onUpload: (files: FileList) => void
  className?: string
}

export function UploadButton({ onUpload, className }: UploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      onUpload(files)
    }
  }

  return (
    <>
      <Button onClick={handleClick} className={className}>
        <Upload className="w-4 h-4 mr-2" />
        Upload MP3
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/mp3,audio/mpeg"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  )
}