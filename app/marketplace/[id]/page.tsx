import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Camera, Star } from "lucide-react"

import { listings, getListingById } from "@/lib/marketplace"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export async function generateStaticParams() {
  return listings.map((listing) => ({ id: listing.id }))
}

export default function ListingPage({ params }: { params: { id: string } }) {
  const listing = getListingById(params.id)
  if (!listing) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex items-center justify-between gap-4">
          <Link href="/marketplace" className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900">
            <ArrowLeft className="h-4 w-4" /> Back to marketplace
          </Link>
          <Badge variant="secondary">Commission</Badge>
        </div>

        <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="rounded-3xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900">{listing.artist}</div>
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700">
                  <Star className="h-4 w-4 text-yellow-500" /> {listing.rating}
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700">
                  {listing.reviews} reviews
                </div>
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl font-semibold text-slate-900">{listing.title}</h1>
                <p className="text-slate-600">{listing.description}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {listing.tags.map((tag) => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {listing.gallery.map((item) => (
                <div key={item.title} className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
                  <img src={item.image} alt={item.title} className="h-60 w-full object-cover" />
                  <div className="p-4">
                    <p className="font-semibold text-slate-900">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-900">Commission options</h2>
              <div className="space-y-4">
                {listing.commissionOptions.map((option) => (
                  <Card key={option.label} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                    <CardHeader className="p-0">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <CardTitle className="text-xl">{option.label}</CardTitle>
                          <p className="text-sm text-slate-500">{option.description}</p>
                        </div>
                        <div className="rounded-2xl bg-white px-4 py-3 text-lg font-semibold text-slate-900 shadow-sm">
                          {option.price}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-0 pt-4">
                      <div className="flex items-center gap-3 text-sm text-slate-600">
                        <Camera className="h-4 w-4" /> Delivery in {option.deliveryDays} days
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <Card className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <CardHeader className="p-0">
                <CardTitle className="text-2xl">Listing details</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <div className="space-y-4 text-slate-600">
                  <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Starting price</p>
                    <p className="mt-2 text-3xl font-semibold text-slate-900">{listing.priceFrom}</p>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Delivery</p>
                    <p className="mt-2 text-base text-slate-700">Fast commissioning workflow with clear milestone options.</p>
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.25em] text-slate-500">Ready to order</p>
                    <Button className="mt-3 w-full">Request commission</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <CardHeader className="p-0">
                <CardTitle className="text-2xl">Quick tags</CardTitle>
              </CardHeader>
              <CardContent className="p-0 pt-4">
                <div className="flex flex-wrap gap-2">
                  {listing.tags.map((tag) => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>
        </section>
      </div>
    </main>
  )
}
