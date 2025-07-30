import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Track {
  id: string
  title: string
  artist?: string
  duration: number
  url: string
  coverUrl?: string
}

export interface Playlist {
  id: string
  name: string
  tracks: Track[]
}

interface PlayerState {
  currentTrack: Track | null
  isPlaying: boolean
  volume: number
  tracks: Track[]
  playlists: Playlist[]
  setCurrentTrack: (track: Track | null) => void
  setIsPlaying: (isPlaying: boolean) => void
  setVolume: (volume: number) => void
  addTrack: (track: Track) => void
  removeTrack: (trackId: string) => void
  addPlaylist: (playlist: Playlist) => void
  removePlaylist: (playlistId: string) => void
  addTrackToPlaylist: (playlistId: string, track: Track) => void
  removeTrackFromPlaylist: (playlistId: string, trackId: string) => void
}

export const useStore = create<PlayerState>()(
  persist(
    (set) => ({
      currentTrack: null,
      isPlaying: false,
      volume: 1,
      tracks: [],
      playlists: [],
      setCurrentTrack: (track) => set({ currentTrack: track }),
      setIsPlaying: (isPlaying) => set({ isPlaying }),
      setVolume: (volume) => set({ volume }),
      addTrack: (track) => set((state) => ({ tracks: [...state.tracks, track] })),
      removeTrack: (trackId) =>
        set((state) => ({
          tracks: state.tracks.filter((t) => t.id !== trackId),
        })),
      addPlaylist: (playlist) =>
        set((state) => ({ playlists: [...state.playlists, playlist] })),
      removePlaylist: (playlistId) =>
        set((state) => ({
          playlists: state.playlists.filter((p) => p.id !== playlistId),
        })),
      addTrackToPlaylist: (playlistId, track) =>
        set((state) => ({
          playlists: state.playlists.map((p) =>
            p.id === playlistId
              ? { ...p, tracks: [...p.tracks, track] }
              : p
          ),
        })),
      removeTrackFromPlaylist: (playlistId, trackId) =>
        set((state) => ({
          playlists: state.playlists.map((p) =>
            p.id === playlistId
              ? { ...p, tracks: p.tracks.filter((t) => t.id !== trackId) }
              : p
          ),
        })),
    }),
    {
      name: 'mp3-player-storage',
    }
  )
)