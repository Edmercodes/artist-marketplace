export type UserRole = "creator" | "client" | "admin"

export interface Profile {
  id: string
  auth_id: string
  email: string
  full_name?: string
  username?: string
  avatar_url?: string
  role: UserRole
  location?: string
  bio?: string
  created_at: string
}

export interface CreatorProfile {
  id?: string
  user_id: string
  categories: string[]
  pricing?: string
  availability?: string
  portfolio?: Array<{ title: string; url: string; description?: string }>
  created_at?: string
  updated_at?: string
}

export interface Listing {
  id: string
  creator_id: string
  title: string
  description: string
  price: number
  images: string[]
  tags: string[]
  created_at: string
}

export interface Commission {
  id: string
  client_id: string
  creator_id: string
  status: string
  revisions: number
  reference_images: string[]
  created_at: string
}
