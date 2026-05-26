"use client"

import { useState } from "react"
import { Sparkles, Zap } from "lucide-react"
import { aiSuggestions } from "@/lib/featureData"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AIAssistantPanel() {
  const [query, setQuery] = useState("")
  const [output, setOutput] = useState("")

  const handleGenerate = () => {
    const prompt = query.trim() || "Create a creative caption for a Filipino digital portrait."
    setOutput(`AI suggests: ${prompt} — crafted for clarity, local culture, and gallery-ready presentation.`)
  }

  return (
    <section className="space-y-8">
      <div className="rounded-[2rem] bg-white/95 p-8 shadow-lg shadow-slate-200/50">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-amber-700">AI Creator Tools</p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">AI assistant for portfolio, pricing, and gallery curation</h2>
          </div>
          <Button variant="secondary">Open AI lab</Button>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="space-y-4 rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
            <label className="text-sm font-semibold text-slate-900">Prompt the AI</label>
            <textarea
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Generate a gallery caption, recommend pricing, or suggest hashtags"
              className="min-h-[160px] w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-amber-500"
            />
            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={handleGenerate}>Generate insight</Button>
              <span className="text-sm text-slate-500">Powered by the LikhaPinas AI assistant</span>
            </div>
          </div>

          <div className="space-y-4">
            <Card className="rounded-[2rem] border border-slate-200 bg-white">
              <CardHeader className="p-6">
                <CardTitle>AI suggestion</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <p className="text-sm text-slate-600">{output || "Send a prompt to generate descriptions, hashtags, or pricing recommendations."}</p>
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm text-amber-900">
                  <Zap className="h-4 w-4" /> Smart creator boost
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4 rounded-[2rem] border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-semibold text-slate-900">Quick AI helpers</p>
              {aiSuggestions.map((item) => (
                <div key={item.id} className="rounded-3xl border border-slate-200 bg-white p-4">
                  <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                  <p className="mt-3 text-sm text-amber-700">{item.result}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
