'use client'

import { useEffect, useRef, useState } from 'react'
import { useStore } from '@/lib/store'
import { PlayIcon, PauseIcon, SkipBackIcon, SkipForwardIcon } from 'lucide-react'
import { Slider } from './ui/slider'

export default function Player() {
  const { currentTrack, isPlaying, volume, setIsPlaying } = useStore()
  const [progress, setProgress] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, currentTrack])

  if (!currentTrack) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 glass-morphism border-t">
      <div className="container mx-auto flex h-24 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <img
            src={currentTrack.coverUrl || '/default-cover.jpg'}
            alt={currentTrack.title}
            className="h-16 w-16 rounded-lg object-cover"
          />
          <div>
            <h3 className="font-bold">{currentTrack.title}</h3>
            <p className="text-sm text-gray-400">{currentTrack.artist}</p>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-2">
          <div className="flex items-center space-x-4">
            <button className="rounded-full p-2 hover:bg-gray-700">
              <SkipBackIcon className="h-6 w-6" />
            </button>
            <button
              className="rounded-full p-3 hover:bg-gray-700"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <PauseIcon className="h-8 w-8" />
              ) : (
                <PlayIcon className="h-8 w-8" />
              )}
            </button>
            <button className="rounded-full p-2 hover:bg-gray-700">
              <SkipForwardIcon className="h-6 w-6" />
            </button>
          </div>
          <Slider
            value={[progress]}
            max={100}
            step={1}
            className="w-96"
            onValueChange={(value) => {
              if (audioRef.current) {
                const time = (value[0] / 100) * audioRef.current.duration
                audioRef.current.currentTime = time
                setProgress(value[0])
              }
            }}
          />
        </div>

        <Slider
          value={[volume * 100]}
          max={100}
          step={1}
          className="w-32"
          onValueChange={(value) => {
            const newVolume = value[0] / 100
            if (audioRef.current) {
              audioRef.current.volume = newVolume
            }
          }}
        />

        <audio
          ref={audioRef}
          src={currentTrack.url}
          onTimeUpdate={(e) => {
            const target = e.target as HTMLAudioElement
            setProgress((target.currentTime / target.duration) * 100)
          }}
          onEnded={() => setIsPlaying(false)}
        />
      </div>
    </div>
  )
}