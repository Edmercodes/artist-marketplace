import type { AISuggestion, CreatorProfile, DiscoveryPost, GalleryTheme, LiveStreamCard } from "@/types/feature"

export const discoveryPosts: DiscoveryPost[] = [
  {
    id: "post-1",
    creatorName: "Maya Santos",
    creatorHandle: "@mayastudio",
    creatorAvatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&q=80",
    title: "Sunset Mural Process",
    description: "A vibrant process clip from my latest mural inspired by Philippine coastlines.",
    media: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    tags: ["#mural", "#process", "#FilipinoArt"],
    likes: 184,
    comments: 24,
    saves: 17,
    views: 12.4,
    createdAt: "2h ago",
  },
  {
    id: "post-2",
    creatorName: "Julian Cruz",
    creatorHandle: "@cruzcraft",
    creatorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80",
    title: "Live Workshop: Woven Textures",
    description: "Designing a Filipino-inspired gallery wall with modern museum lighting.",
    media: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    tags: ["#workshop", "#texture", "#LikhaLive"],
    likes: 210,
    comments: 33,
    saves: 29,
    views: 18.2,
    createdAt: "4h ago",
  },
]

export const liveStreams: LiveStreamCard[] = [
  {
    id: "stream-1",
    title: "Neon Portrait Speedpaint",
    creator: "Ada Reyes",
    category: "Digital Painting",
    status: "live",
    viewers: 1250,
    likes: 167,
    pinnedArtwork: "Neon Sakura Portrait",
    cover: "https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?auto=format&fit=crop&w=1200&q=80",
    streamType: "Live Workshop",
  },
  {
    id: "stream-2",
    title: "Sculpting Bayanihan",
    creator: "Nico Lising",
    category: "Sculpture",
    status: "upcoming",
    viewers: 402,
    likes: 88,
    pinnedArtwork: "Bayanihan Series",
    cover: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
    streamType: "Workshop",
  },
]

export const galleryThemes: GalleryTheme[] = [
  {
    id: "theme-1",
    title: "Minimal Gallery",
    description: "A clean, modern exhibition layout for spotlight artworks.",
    accent: "bg-slate-900 text-white",
    style: "Minimal gallery with soft shadows and elegant spacing.",
    highlight: "Behance-inspired layout",
  },
  {
    id: "theme-2",
    title: "Modern Museum",
    description: "Luxury digital exhibition with polished cards and motion.",
    accent: "bg-black text-yellow-100",
    style: "Premium walls, ambient glows, upscale presentation.",
    highlight: "Museum-grade curation",
  },
  {
    id: "theme-3",
    title: "Filipino Gallery",
    description: "Warm textures, capiz lighting and bayanihan-inspired flow.",
    accent: "bg-amber-100 text-slate-900",
    style: "Tropical Filipino ambiance with handcrafted details.",
    highlight: "Cultural heritage mood",
  },
]

export const aiSuggestions: AISuggestion[] = [
  {
    id: "ai-1",
    title: "Portfolio Caption Booster",
    description: "Upgrade your listing description with evocative Filipino imagery.",
    tag: "Description",
    result: "Energetic mural inspired by Philippine sunsets, tailored for local brands.",
  },
  {
    id: "ai-2",
    title: "Hashtag Trend Finder",
    description: "Suggest viral tags for your creative launch.",
    tag: "Hashtags",
    result: "#LikhaLive #FilipinoArt #BayanihanVibes",
  },
]

export const creatorSuggestions: CreatorProfile[] = [
  {
    id: "creator-1",
    name: "Lina Javier",
    role: "Multimedia Artist",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80",
    headline: "Dreamlike digital portraits with local color.",
    followers: 12400,
    following: 180,
    badge: "Featured Creator",
    isFollowed: false,
  },
  {
    id: "creator-2",
    name: "Rico Dela Cruz",
    role: "Craft & Textile Maker",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=80&q=80",
    headline: "Handcrafted textures grounded in modern Filipino culture.",
    followers: 8700,
    following: 95,
    badge: "Top Curator",
    isFollowed: true,
  },
]
