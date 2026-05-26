export interface DiscoveryPost {
  id: string
  creatorName: string
  creatorHandle: string
  creatorAvatar: string
  title: string
  description: string
  media: string
  tags: string[]
  likes: number
  comments: number
  saves: number
  views: number
  createdAt: string
}

export interface LiveStreamCard {
  id: string
  title: string
  creator: string
  category: string
  status: "live" | "upcoming" | "recorded"
  viewers: number
  likes: number
  pinnedArtwork: string
  cover: string
  streamType: string
}

export interface GalleryTheme {
  id: string
  title: string
  description: string
  accent: string
  style: string
  highlight: string
}

export interface AISuggestion {
  id: string
  title: string
  description: string
  tag: string
  result: string
}

export interface CreatorProfile {
  id: string
  name: string
  role: string
  avatar: string
  headline: string
  followers: number
  following: number
  badge: string
  isFollowed: boolean
}
