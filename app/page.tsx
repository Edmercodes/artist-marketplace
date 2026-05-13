"use client"

import { motion } from "framer-motion"
import { Search, Star, Users, Palette, Camera, PenTool, Music, Code, Heart, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const categories = [
  { name: "Digital Art", icon: Palette, color: "bg-purple-500" },
  { name: "Photography", icon: Camera, color: "bg-blue-500" },
  { name: "Illustration", icon: PenTool, color: "bg-green-500" },
  { name: "Music", icon: Music, color: "bg-red-500" },
  { name: "Design", icon: Code, color: "bg-orange-500" },
]

const featuredArtists = [
  {
    name: "Maria Santos",
    specialty: "Digital Portrait Artist",
    rating: 4.9,
    reviews: 127,
    avatar: "/api/placeholder/64/64",
    location: "Manila, PH",
    startingPrice: "₱500"
  },
  {
    name: "Juan dela Cruz",
    specialty: "Graphic Designer",
    rating: 4.8,
    reviews: 89,
    avatar: "/api/placeholder/64/64",
    location: "Cebu, PH",
    startingPrice: "₱300"
  },
  {
    name: "Ana Reyes",
    specialty: "Illustrator",
    rating: 5.0,
    reviews: 156,
    avatar: "/api/placeholder/64/64",
    location: "Davao, PH",
    startingPrice: "₱400"
  },
  {
    name: "Carlos Mendoza",
    specialty: "Photographer",
    rating: 4.7,
    reviews: 203,
    avatar: "/api/placeholder/64/64",
    location: "Quezon City, PH",
    startingPrice: "₱600"
  }
]

const trendingCreatives = [
  { name: "Filipino Street Art", trend: "+45% this week" },
  { name: "Traditional Weaving", trend: "+32% this week" },
  { name: "Digital Animation", trend: "+28% this week" },
  { name: "Ceramic Pottery", trend: "+22% this week" }
]

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative container mx-auto px-4 py-20 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl sm:text-6xl font-bold mb-6 leading-tight">
              Discover Filipino
              <span className="block text-yellow-300">Creative Talent</span>
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-orange-100">
              From digital art to traditional crafts, find your perfect creative collaborator
            </p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-2xl mx-auto mb-8"
            >
              <div className="flex gap-2 bg-white rounded-full p-2 shadow-lg">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Search for artists, services, or styles..."
                    className="pl-12 pr-4 py-3 text-lg border-0 focus:ring-0 bg-transparent"
                  />
                </div>
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 rounded-full px-8">
                  Search
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4 text-sm"
            >
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                10,000+ Artists
              </span>
              <span className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                4.8 Average Rating
              </span>
              <span className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                50,000+ Happy Clients
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Explore Categories</h2>
            <p className="text-gray-600 text-lg">Find the perfect artist for your project</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
              >
                <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                  <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <category.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg">{category.name}</h3>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artists Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Featured Artists</h2>
            <p className="text-gray-600 text-lg">Meet our top-rated Filipino creatives</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredArtists.map((artist, index) => (
              <motion.div
                key={artist.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={artist.avatar} alt={artist.name} />
                        <AvatarFallback>{artist.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{artist.name}</CardTitle>
                        <CardDescription>{artist.location}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3">{artist.specialty}</p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{artist.rating}</span>
                        <span className="text-sm text-gray-500">({artist.reviews})</span>
                      </div>
                      <Badge variant="secondary">Starting at {artist.startingPrice}</Badge>
                    </div>
                    <Button className="w-full">View Profile</Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Creatives Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Trending Creatives</h2>
            <p className="text-gray-600 text-lg">What's hot in the Filipino creative scene</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingCreatives.map((trend, index) => (
              <motion.div
                key={trend.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                  <TrendingUp className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{trend.name}</h3>
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    {trend.trend}
                  </Badge>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Start Your Creative Journey?
            </h2>
            <p className="text-xl mb-8 text-orange-100">
              Join thousands of Filipinos connecting through creativity
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-orange-500 hover:bg-gray-100">
                Become an Artist
              </Button>
              <Button size="lg" className="bg-transparent border-2 border-white hover:bg-white hover:text-orange-500">
                Find Talent
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
