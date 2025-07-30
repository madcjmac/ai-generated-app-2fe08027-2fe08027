import Link from 'next/link'
import { HomeIcon, LibraryIcon, ListMusicIcon } from 'lucide-react'
import ThemeToggle from './theme-toggle'

export default function Navbar() {
  return (
    <nav className="glass-morphism sticky top-0 z-50 border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <HomeIcon className="h-6 w-6" />
            <span className="font-bold">Home</span>
          </Link>
          <Link href="/library" className="flex items-center space-x-2">
            <LibraryIcon className="h-6 w-6" />
            <span className="font-bold">Library</span>
          </Link>
          <Link href="/playlists" className="flex items-center space-x-2">
            <ListMusicIcon className="h-6 w-6" />
            <span className="font-bold">Playlists</span>
          </Link>
        </div>
        <ThemeToggle />
      </div>
    </nav>
  )
}