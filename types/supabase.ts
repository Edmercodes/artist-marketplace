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

export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          auth_id: string
          email: string
          full_name?: string | null
          username?: string | null
          avatar_url?: string | null
          role: UserRole
          location?: string | null
          bio?: string | null
          phone_number?: string | null
          is_phone_verified?: boolean | null
          created_at: string
        }
        Insert: {
          id?: string
          auth_id: string
          email: string
          full_name?: string | null
          username?: string | null
          avatar_url?: string | null
          role: UserRole
          location?: string | null
          bio?: string | null
          phone_number?: string | null
          is_phone_verified?: boolean | null
          created_at?: string
        }
        Update: {
          id?: string
          auth_id?: string
          email?: string
          full_name?: string | null
          username?: string | null
          avatar_url?: string | null
          role?: UserRole
          location?: string | null
          bio?: string | null
          phone_number?: string | null
          is_phone_verified?: boolean | null
          created_at?: string
        }
      }
      creator_profiles: {
        Row: {
          id: string
          user_id: string
          categories: string[]
          pricing?: string | null
          availability?: string | null
          portfolio?: Array<{ title: string; url: string; description?: string | null }> | null
          created_at?: string | null
          updated_at?: string | null
        }
        Insert: {
          id?: string
          user_id: string
          categories: string[]
          pricing?: string | null
          availability?: string | null
          portfolio?: Array<{ title: string; url: string; description?: string | null }> | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          categories?: string[]
          pricing?: string | null
          availability?: string | null
          portfolio?: Array<{ title: string; url: string; description?: string | null }> | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in string]: never
    }
    Functions: {
      [_ in string]: never
    }
    Enums: {
      [_ in string]: never
    }
  }
}
