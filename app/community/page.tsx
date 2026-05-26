import { CommunityHub } from "@/features/community/CommunityHub"

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-background px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <CommunityHub />
      </div>
    </main>
  )
}
