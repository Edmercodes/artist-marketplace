"use client"

import { motion } from "framer-motion"
import { galleryThemes } from "@/lib/featureData"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function GalleryMVP() {
  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-8 shadow-2xl shadow-slate-200/50">
        <div className="space-y-4 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-800">
            LikhaVerse
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">Virtual galleries for Filipino creators</h2>
          <p className="mx-auto max-w-2xl text-sm leading-6 text-slate-600">Preview immersive exhibition walls, spotlight artworks, and theme your gallery with warm Filipino textures and cinematic motion.</p>
        </div>

        <div className="grid gap-6 pt-8 lg:grid-cols-3">
          {galleryThemes.map((theme) => (
            <motion.div
              key={theme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`rounded-[2rem] border border-slate-200 p-6 shadow-xl ${theme.accent}`}>
              <h3 className="text-xl font-semibold">{theme.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-800">{theme.description}</p>
              <div className="mt-5 space-y-2 text-sm text-slate-700">
                <p>{theme.style}</p>
                <p className="font-semibold">{theme.highlight}</p>
              </div>
              <Badge className="mt-5" variant="outline">Theme preview</Badge>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Gallery MVP</p>
            <p className="text-lg font-semibold text-slate-900">Lightweight pseudo-3D motion navigation with spotlit artwork cards.</p>
          </div>
          <Button>Customize your gallery</Button>
        </div>
      </div>
    </section>
  )
}
