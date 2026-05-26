"use client"

import { useMemo } from "react"
import { PlayCircle, UserPlus, Heart } from "lucide-react"
import { liveStreams } from "@/lib/featureData"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function LiveFeed() {
  const streams = useMemo(() => liveStreams, [])

  return (
    <section className="space-y-8">
      <div className="rounded-3xl bg-white/90 p-6 shadow-lg shadow-slate-200/50 backdrop-blur-xl">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-600">LikhaLive</p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Live creative sessions, workshops, and flash sales</h2>
            <p className="max-w-2xl text-sm leading-6 text-slate-600">Discover ongoing livestreams, connect with artists in realtime, and join the new Filipino live art economy.</p>
          </div>
          <Button variant="secondary">Start a live stream</Button>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        {streams.map((stream) => (
          <Card key={stream.id} className="overflow-hidden shadow-2xl shadow-slate-200/30 transition hover:-translate-y-1">
            <CardHeader className="p-0">
              <div className="relative h-80 overflow-hidden bg-slate-200">
                <img src={stream.cover} alt={stream.title} className="h-full w-full object-cover transition duration-300 hover:scale-105" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 to-transparent px-4 py-4 text-white">
                  <p className="text-sm uppercase tracking-[0.35em] text-amber-200">{stream.streamType}</p>
                  <h3 className="text-xl font-semibold">{stream.title}</h3>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <CardTitle>{stream.creator}</CardTitle>
                  <p className="text-sm text-slate-500">{stream.category} · {stream.status}</p>
                </div>
                <div className="rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-900">{stream.viewers} viewers</div>
              </div>

              <div className="flex flex-wrap gap-2 text-sm text-slate-600">
                <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-2 text-amber-700"><PlayCircle className="h-4 w-4" /> Watch live</span>
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2"><Heart className="h-4 w-4 text-red-500" /> {stream.likes} likes</span>
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2"><UserPlus className="h-4 w-4" /> Live workshop</span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button variant="default">Join session</Button>
                <Button variant="outline">View pinned artwork</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
