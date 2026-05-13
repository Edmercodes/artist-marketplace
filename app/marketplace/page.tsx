import Link from "next/link"
import { ArrowRight, Tag, Star } from "lucide-react"

import { listings } from "@/lib/marketplace"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function MarketplacePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-4 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
            <Tag className="h-4 w-4" /> Marketplace listings
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Commission your next creative project
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-7 text-slate-600">
            Browse live marketplace offers with pricing, galleries, tags, and commission packages for Filipino artists.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          {listings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
              <CardHeader className="p-0">
                <div className="relative h-72 overflow-hidden bg-slate-200">
                  <img
                    src={listing.thumbnail}
                    alt={listing.title}
                    className="h-full w-full object-cover transition duration-300 hover:scale-105"
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-5 p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl">{listing.title}</CardTitle>
                    <p className="text-sm text-slate-500">{listing.artist} · {listing.location}</p>
                  </div>
                  <div className="rounded-3xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-900">
                    {listing.priceFrom}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {listing.tags.map((tag) => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>

                <p className="text-slate-600">{listing.description}</p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">
                    <Star className="h-4 w-4 text-yellow-500" /> {listing.rating} rating
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">
                    {listing.reviews} reviews
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  {listing.features.map((feature) => (
                    <Badge key={feature} variant="secondary">{feature}</Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between gap-4">
                  <Button asChild>
                    <Link href={`/marketplace/${listing.id}`}>View offer</Link>
                  </Button>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
                    <ArrowRight className="h-4 w-4" /> See commissioning options
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  )
}
