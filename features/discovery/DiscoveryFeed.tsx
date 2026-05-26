"use client"

import { useMemo } from "react"
import { Heart, MessageCircle, Save, Sparkles } from "lucide-react"
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll"
import { discoveryPosts } from "@/lib/featureData"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function DiscoveryFeed() {
  const { page, loading } = useInfiniteScroll()
  const posts = useMemo(() => discoveryPosts.slice(0, page * 2), [page])

  return (
    <section className="space-y-8">
      <div className="grid gap-4 md:grid-cols-[1.5fr_0.9fr]">
        <div className="space-y-4 rounded-3xl bg-white/90 p-6 shadow-lg shadow-slate-200/50 backdrop-blur-xl">
          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
              <Sparkles className="h-4 w-4" /> Trending discovery
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Social discovery for Filipino art and live creative moments</h2>
            <p className="max-w-2xl text-sm leading-6 text-slate-600">Scroll through creative drops, short streams, portfolio highlights, and rising creators all in one feed.</p>
          </div>

          <div className="space-y-6">
            {posts.map((post) => (
              <article key={post.id} className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 shadow-sm">
                <div className="relative h-72 overflow-hidden bg-slate-200">
                  <img src={post.media} alt={post.title} className="h-full w-full object-cover transition duration-300 hover:scale-105" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent px-4 py-4 text-white">
                    <h3 className="text-lg font-semibold">{post.title}</h3>
                    <p className="text-sm text-slate-200 line-clamp-2">{post.description}</p>
                  </div>
                </div>
                <div className="space-y-4 p-5">
                  <div className="flex items-center gap-3">
                    <img src={post.creatorAvatar} alt={post.creatorName} className="h-10 w-10 rounded-full object-cover" />
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900">{post.creatorName}</p>
                      <p className="text-sm text-slate-500">{post.creatorHandle} · {post.createdAt}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                    <span className="inline-flex items-center gap-1"><Heart className="h-4 w-4 text-orange-500" /> {post.likes} likes</span>
                    <span className="inline-flex items-center gap-1"><MessageCircle className="h-4 w-4" /> {post.comments} comments</span>
                    <span className="inline-flex items-center gap-1"><Save className="h-4 w-4" /> {post.saves} saves</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="flex justify-center">
            <Button variant="secondary" size="sm" className="w-full sm:w-auto">
              {loading ? "Loading more..." : "Load more inspiration"}
            </Button>
          </div>
        </div>

        <aside className="space-y-6 rounded-3xl bg-slate-950/95 p-6 text-white shadow-lg shadow-slate-900/30">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.35em] text-amber-200/90">Discovery Pulse</p>
            <h3 className="text-2xl font-semibold">Featured creators this week</h3>
            <p className="text-sm text-slate-300">A fresh selection of Filipino creators on the rise — ready for collaborations, commissions and live stages.</p>
          </div>
          <div className="space-y-4">
            {discoveryPosts.slice(0, 3).map((post) => (
              <div key={post.id} className="rounded-3xl bg-slate-900/80 p-4">
                <p className="text-sm font-semibold text-amber-200">{post.creatorName}</p>
                <p className="text-sm text-slate-300 line-clamp-2">{post.title}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                  <Sparkles className="h-3.5 w-3.5" /> {post.views}k views
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  )
}
