'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Music, Play } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Playlist {
  id: string
  name: string
  description: string
  trackCount: number
  thumbnail?: string
}

interface PlaylistGridProps {
  playlists: Playlist[]
  onPlaylistSelect: (playlist: Playlist) => void
  className?: string
}

export function PlaylistGrid({ playlists, onPlaylistSelect, className }: PlaylistGridProps) {
  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4', className)}>
      {playlists.map((playlist) => (
        <Card
          key={playlist.id}
          className="cursor-pointer hover:shadow-md transition-shadow group"
          onClick={() => onPlaylistSelect(playlist)}
        >
          <CardHeader className="pb-3">
            <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center mb-3 relative overflow-hidden">
              {playlist.thumbnail ? (
                <img src={playlist.thumbnail} alt={playlist.name} className="w-full h-full object-cover" />
              ) : (
                <Music className="w-8 h-8 text-primary" />
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Play className="w-6 h-6 text-white" />
              </div>
            </div>
            <CardTitle className="text-base">{playlist.name}</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <p className="text-sm text-muted-foreground mb-2">{playlist.description}</p>
            <p className="text-xs text-muted-foreground">
              {playlist.trackCount} track{playlist.trackCount !== 1 ? 's' : ''}
            </p>
          </CardContent>
        </Card>
      ))}
      {playlists.length === 0 && (
        <div className="col-span-full text-center py-12 text-muted-foreground">
          <Music className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No playlists yet. Create your first playlist!</p>
        </div>
      )}
    </div>
  )
}