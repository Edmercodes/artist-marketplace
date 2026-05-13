export interface CommissionOption {
  label: string
  price: string
  description: string
  deliveryDays: number
}

export interface MarketplaceListing {
  id: string
  title: string
  artist: string
  location: string
  rating: number
  reviews: number
  priceFrom: string
  tags: string[]
  gallery: { title: string; image: string }[]
  description: string
  commissionOptions: CommissionOption[]
  features: string[]
  thumbnail: string
}

export const listings: MarketplaceListing[] = [
  {
    id: "digital-portrait-commision",
    title: "Digital Portrait Commission",
    artist: "Maria Santos",
    location: "Manila, PH",
    rating: 4.9,
    reviews: 128,
    priceFrom: "₱2,500",
    tags: ["Portrait", "Digital", "Colorful", "Character"],
    thumbnail: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
    gallery: [
      {
        title: "Portrait Set",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Studio Mockup",
        image: "https://images.unsplash.com/photo-1517511620798-cec17d428bc0?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Color Study",
        image: "https://images.unsplash.com/photo-1549237517-08521a6eb426?auto=format&fit=crop&w=900&q=80",
      },
    ],
    description:
      "Custom digital portraits with Filipino-inspired palettes, hand-painted textures, and a polished finish perfect for gifts, profiles, and brand storytelling.",
    commissionOptions: [
      {
        label: "Express Sketch",
        price: "₱2,500",
        deliveryDays: 2,
        description: "Single character black and white portrait with basic background.",
      },
      {
        label: "Standard Color",
        price: "₱4,200",
        deliveryDays: 5,
        description: "Full color portrait with refined shading and simple background.",
      },
      {
        label: "Premium Illustration",
        price: "₱7,800",
        deliveryDays: 9,
        description: "Detailed scene or character portrait with custom environment and premium styling.",
      },
    ],
    features: ["Personalized revisions", "Source file included", "Print-ready export"],
  },
  {
    id: "branding-pack-design",
    title: "Branding + Collateral Pack",
    artist: "Juan Dela Cruz",
    location: "Cebu, PH",
    rating: 4.8,
    reviews: 79,
    priceFrom: "₱3,500",
    tags: ["Branding", "Logo", "Print", "Identity"],
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    gallery: [
      {
        title: "Logo Concepts",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Collateral Mockup",
        image: "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=900&q=80",
      },
      {
        title: "Packaging Design",
        image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=900&q=80",
      },
    ],
    description:
      "Complete branding packages for startups and small businesses, including logo design, stationery, and social media-ready visual assets.",
    commissionOptions: [
      {
        label: "Logo Only",
        price: "₱3,500",
        deliveryDays: 5,
        description: "Logo concept with up to 2 revisions and color variations.",
      },
      {
        label: "Brand Starter",
        price: "₱6,800",
        deliveryDays: 8,
        description: "Logo plus basic stationery and brand guidelines.",
      },
      {
        label: "Full Identity",
        price: "₱11,500",
        deliveryDays: 12,
        description: "Logo, stationery, social kit, and a full brand story document.",
      },
    ],
    features: ["Brand strategy consult", "Editable source files", "Social templates"],
  },
]

export function getListingById(id: string) {
  return listings.find((listing) => listing.id === id)
}
