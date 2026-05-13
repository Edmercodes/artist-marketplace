export interface ArtistReview {
  name: string
  rating: number
  review: string
  date: string
}

export interface ArtistSocialLink {
  label: string
  href: string
  platform: "instagram" | "website" | "email" | "facebook"
}

export interface Artist {
  id: string
  name: string
  title: string
  location: string
  rating: number
  reviews: number
  categories: string[]
  social: ArtistSocialLink[]
  bio: string
  portfolio: { title: string; image: string }[]
  testimonials: ArtistReview[]
  hourlyRate: string
  profileImage: string
}

export const artists: Artist[] = [
  {
    id: "maria-santos",
    name: "Maria Santos",
    title: "Digital Portrait Artist",
    location: "Manila, PH",
    rating: 4.9,
    reviews: 127,
    categories: ["Digital Art", "Portraits", "Branding"],
    hourlyRate: "₱1,200/hr",
    profileImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
    bio: "Merging Filipino color palettes and digital polish, Maria crafts portraits that feel alive and familiar. She works with brands, startups, and local communities to create visual stories with emotional depth.",
    portfolio: [
      {
        title: "Neon Street Portrait",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Modern Kultura Branding",
        image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Soft Pastel Character",
        image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80",
      },
    ],
    social: [
      { label: "Instagram", href: "https://instagram.com/mariasantos.art", platform: "instagram" },
      { label: "Portfolio", href: "https://mariasantos.ph", platform: "website" },
      { label: "Email", href: "mailto:maria@artisanph.ph", platform: "email" },
    ],
    testimonials: [
      {
        name: "Jessa P.",
        rating: 5,
        review: "Maria captured the soul of our brand in a single portrait. Communication was smooth and the final artwork exceeded expectations.",
        date: "Apr 2026",
      },
      {
        name: "Alvin S.",
        rating: 4,
        review: "Great styling and fast delivery. The concept was very creative and felt uniquely Filipino.",
        date: "Mar 2026",
      },
    ],
  },
  {
    id: "juan-delacruz",
    name: "Juan Dela Cruz",
    title: "Graphic Designer & Illustrator",
    location: "Cebu, PH",
    rating: 4.8,
    reviews: 89,
    categories: ["Illustration", "Brand Design", "Print"],
    hourlyRate: "₱950/hr",
    profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    bio: "A multidisciplinary designer rooted in Filipino visual culture. Juan blends crisp layouts, hand-drawn texture, and thoughtful user experiences for modern creative businesses.",
    portfolio: [
      {
        title: "Local Cafe Branding",
        image: "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Event Poster Series",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Custom Sticker Pack",
        image: "https://images.unsplash.com/photo-1512499617640-c2f9992cf681?auto=format&fit=crop&w=900&q=80",
      },
    ],
    social: [
      { label: "Instagram", href: "https://instagram.com/juandelacruz.design", platform: "instagram" },
      { label: "Portfolio", href: "https://juandelacruz.ph", platform: "website" },
      { label: "Email", href: "mailto:juan@artisanph.ph", platform: "email" },
    ],
    testimonials: [
      {
        name: "Mia R.",
        rating: 5,
        review: "Juan’s visual system gave our product launch a strong edge. He is a true collaborator and very responsive.",
        date: "May 2026",
      },
      {
        name: "Kyle T.",
        rating: 5,
        review: "Fantastic illustration work and a smooth revision process. Highly recommended for creative branding.",
        date: "Feb 2026",
      },
    ],
  },
]

export function getArtistById(id: string) {
  return artists.find((artist) => artist.id === id)
}
