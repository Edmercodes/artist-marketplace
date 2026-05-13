"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { Search, Star, Users } from "lucide-react"

import { artists } from "@/lib/artists"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const categoryOptions = [
  "All",
  ...Array.from(new Set(artists.flatMap((artist) => artist.categories))).sort(),
]

export default function ArtistsPage() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")

  const filteredArtists = useMemo(() => {
    const query = search.trim().toLowerCase()

    return artists.filter((artist) => {
      const matchesQuery =
        !query ||
        artist.name.toLowerCase().includes(query) ||
        artist.title.toLowerCase().includes(query) ||
        artist.location.toLowerCase().includes(query) ||
        artist.categories.some((item) => item.toLowerCase().includes(query))

      const matchesCategory =
        category === "All" || artist.categories.includes(category)

      return matchesQuery && matchesCategory
    })
  }, [search, category])

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 space-y-3 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-500">Artist directory</p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Explore featured Filipino creatives
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-7 text-slate-600">
            Search by artist name, specialty, or category to find the right creative partner.
          </p>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-[1.5fr_0.8fr]">
          <div className="relative rounded-3xl border border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-6">
            <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
              <Search className="h-5 w-5" />
            </div>
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search artists, categories, locations..."
              className="pl-11 pr-4 py-4 text-base"
            />
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-6">
            <label className="block text-sm font-medium text-slate-700">Filter by category</label>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            >
              {categoryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
          <div>
            <p className="text-sm text-slate-500">Showing</p>
            <p className="text-2xl font-semibold text-slate-900">{filteredArtists.length} artists</p>
          </div>
          <div className="inline-flex items-center gap-3 rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-700">
            <Star className="h-4 w-4 text-yellow-500" /> Top-rated favorites
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredArtists.length > 0 ? (
            filteredArtists.map((artist) => (
              <Link key={artist.id} href={`/artists/${artist.id}`} className="group">
                <Card className="overflow-hidden transition hover:-translate-y-1 hover:shadow-xl">
                  <CardHeader className="p-0">
                    <div className="relative h-52 overflow-hidden bg-slate-200">
                      <img
                        src={artist.profileImage}
                        alt={artist.name}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 p-6">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <CardTitle className="text-xl">{artist.name}</CardTitle>
                        <p className="text-sm text-slate-500">{artist.title}</p>
                      </div>
                      <div className="rounded-2xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-900">
                        {artist.location}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {artist.categories.slice(0, 3).map((category) => (
                        <Badge key={category} variant="outline">
                          {category}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <span className="inline-flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" /> {artist.rating}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Users className="h-4 w-4" /> {artist.reviews} reviews
                      </span>
                    </div>

                    <Button className="w-full">View profile</Button>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-full rounded-3xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-600">
              No artists found. Try a different search or category.
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
