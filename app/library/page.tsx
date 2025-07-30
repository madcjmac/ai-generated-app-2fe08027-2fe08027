'use client'

import { useEffect, useState } from 'react'
import { useStore } from '@/lib/store'
import TrackList from '@/components/track-list'
import UploadButton from '@/components/upload-button'

export default function Library() {
  const { tracks } = useStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="space-y-8 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Library</h1>
        <UploadButton />
      </div>

      <div className="glass-morphism rounded-lg p-6">
        <TrackList tracks={tracks} />
      </div>
    </div>
  )
}