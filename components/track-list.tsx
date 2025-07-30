'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface Track {
  id: string
  name: string
  artist: string
  duration: number
  url: string
}

interface TrackListProps {
  tracks: Track[]
  currentTrack?: string
  onTrackSelect: (track: Track) => void
  className?: string
}

export function TrackList({ tracks, currentTrack, onTrackSelect, className }: TrackListProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {tracks.map((track) => (
        <div
          key={track.id}
          className={cn(
            'flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-accent transition-colors',
            currentTrack === track.id && 'bg-accent'
          )}
          onClick={() => onTrackSelect(track)}
        >
          <div className="flex-1">
            <h3 className="font-medium text-sm">{track.name}</h3>
            <p className="text-xs text-muted-foreground">{track.artist}</p>
          </div>
          <span className="text-xs text-muted-foreground">
            {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
          </span>
        </div>
      ))}
      {tracks.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          No tracks found. Upload some MP3 files to get started.
        </div>
      )}
    </div>
  )
}