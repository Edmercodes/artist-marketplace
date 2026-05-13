import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Globe2, Mail, Star } from "lucide-react"

import { artists, getArtistById } from "@/lib/artists"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export async function generateStaticParams() {
  return artists.map((artist) => ({ id: artist.id }))
}

function socialIcon(platform: string) {
  switch (platform) {
    case "instagram":
      return Globe2
    case "website":
      return Globe2
    case "email":
      return Mail
    default:
      return Globe2
  }
}

export default function ArtistProfilePage({ params }: { params: { id: string } }) {
  const artist = getArtistById(params.id)
  if (!artist) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex items-center justify-between gap-4">
          <Link href="/artists" className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900">
            <ArrowLeft className="h-4 w-4" /> Back to artists
          </Link>
          <Badge variant="secondary">Top rated</Badge>
        </div>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center">
              <div className="h-32 w-32 overflow-hidden rounded-3xl bg-slate-100">
                <img src={artist.profileImage} alt={artist.name} className="h-full w-full object-cover" />
              </div>
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-4xl font-semibold text-slate-900">{artist.name}</h1>
                  <Badge variant="default">{artist.title}</Badge>
                </div>
                <p className="text-slate-600">{artist.location}</p>
                <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">
                    <Star className="h-4 w-4 text-yellow-500" /> {artist.rating} rating
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">
                    {artist.reviews} reviews
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2">
                    {artist.hourlyRate}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-900">About</h2>
              <p className="text-slate-600 leading-7">{artist.bio}</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-900">Categories</h2>
              <div className="flex flex-wrap gap-3">
                {artist.categories.map((category) => (
                  <Badge key={category} variant="outline">
                    {category}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-900">Portfolio gallery</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {artist.portfolio.map((item) => (
                  <div key={item.title} className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
                    <img src={item.image} alt={item.title} className="h-56 w-full object-cover transition hover:scale-105" />
                    <div className="p-4">
                      <h3 className="font-semibold text-slate-900">{item.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <Card className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <CardHeader className="space-y-3 p-0">
                <CardTitle className="text-2xl">Contact & social</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-0 pt-4">
                <div className="space-y-3">
                  {artist.social.map((item) => {
                    const Icon = socialIcon(item.platform)
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 transition hover:bg-slate-100"
                      >
                        <Icon className="h-5 w-5 text-slate-600" />
                        <span>{item.label}</span>
                      </a>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <CardHeader className="space-y-3 p-0">
                <CardTitle className="text-2xl">Client reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-0 pt-4">
                {artist.testimonials.map((review) => (
                  <div key={review.name} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-3 text-slate-700">
                      <div>
                        <p className="font-semibold text-slate-900">{review.name}</p>
                        <p className="text-sm text-slate-500">{review.date}</p>
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                        <Star className="h-4 w-4" /> {review.rating}
                      </span>
                    </div>
                    <p className="mt-3 text-slate-600">{review.review}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 text-slate-700 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Ready to book?</p>
                  <h3 className="mt-2 text-xl font-semibold text-slate-900">Start a project</h3>
                </div>
                <Button className="whitespace-nowrap">Send inquiry</Button>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  )
}
