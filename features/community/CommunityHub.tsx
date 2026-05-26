"use client"

import { Bell, Star } from "lucide-react"
import { useState } from "react"
import { creatorSuggestions } from "@/lib/featureData"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function CommunityHub() {
  const [creators, setCreators] = useState(creatorSuggestions)

  const toggleFollow = (id: string) => {
    setCreators((prev) => prev.map((creator) => creator.id === id ? { ...creator, isFollowed: !creator.isFollowed } : creator))
  }

  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] bg-white/95 p-8 shadow-lg shadow-slate-200/50">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Community</p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Creator follow system and collector connections</h2>
            <p className="max-w-2xl text-sm leading-6 text-slate-600">Build your community with creator badges, featured collectors, and live engagement trends.</p>
          </div>
          <div className="inline-flex items-center gap-3 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900">
            <Bell className="h-4 w-4 text-amber-700" /> New activity feed
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="rounded-[2rem] border border-slate-200 bg-slate-50">
            <CardHeader className="p-6">
              <CardTitle>Followed creators</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              {creators.map((creator) => (
                <div key={creator.id} className="flex items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center gap-4">
                    <img src={creator.avatar} alt={creator.name} className="h-12 w-12 rounded-full object-cover" />
                    <div>
                      <p className="font-semibold text-slate-900">{creator.name}</p>
                      <p className="text-sm text-slate-500">{creator.role}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-right">
                    <p className="text-sm text-slate-500">{creator.followers.toLocaleString()} followers</p>
                    <Button variant={creator.isFollowed ? "outline" : "default"} size="sm" onClick={() => toggleFollow(creator.id)}>
                      {creator.isFollowed ? "Following" : "Follow"}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border border-slate-200 bg-slate-50">
            <CardHeader className="p-6">
              <CardTitle>Community spotlight</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="rounded-3xl bg-gradient-to-br from-orange-100 via-amber-100 to-slate-50 p-5 shadow-lg">
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl bg-slate-900 p-3 text-white">
                    <Star className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Creator Drops</p>
                    <p className="mt-2 text-sm text-slate-700">Limited-time artwork releases and open studio sessions curated for collectors.</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white p-4">
                <p className="text-sm font-semibold text-slate-900">Collector profile highlight</p>
                <p className="mt-2 text-sm text-slate-600">Showcase your purchased artwork, artist collaborations, and achievement badges with a dedicated collector profile.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
