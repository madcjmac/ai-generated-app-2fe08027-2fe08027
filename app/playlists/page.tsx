'use client'

import { useEffect, useState } from 'react'
import { useStore } from '@/lib/store'
import PlaylistGrid from '@/components/playlist-grid'
import CreatePlaylistButton from '@/components/create-playlist-button'

export default function Playlists() {
  const { playlists } = useStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="space-y-8 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Playlists</h1>
        <CreatePlaylistButton />
      </div>

      <div className="glass-morphism rounded-lg p-6">
        <PlaylistGrid playlists={playlists} />
      </div>
    </div>
  )
}