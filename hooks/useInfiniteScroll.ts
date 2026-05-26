"use client"

import { useEffect, useState } from "react"

export function useInfiniteScroll(initialPage = 1) {
  const [page, setPage] = useState(initialPage)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      if (loading) return
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 600) {
        setLoading(true)
      }
    }

    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [loading])

  useEffect(() => {
    if (!loading) return
    const timer = window.setTimeout(() => {
      setPage((value) => value + 1)
      setLoading(false)
    }, 600)
    return () => window.clearTimeout(timer)
  }, [loading])

  return { page, loading, setLoading }
}
