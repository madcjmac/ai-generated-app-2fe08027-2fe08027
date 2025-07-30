import FeaturedTracks from '@/components/featured-tracks'
import RecentTracks from '@/components/recent-tracks'
import UploadButton from '@/components/upload-button'

export default function Home() {
  return (
    <div className="space-y-8 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold">Welcome to MP3 Player</h1>
        <UploadButton />
      </div>
      
      <FeaturedTracks />
      <RecentTracks />
    </div>
  )
}