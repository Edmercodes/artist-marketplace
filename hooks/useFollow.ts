"use client"

import { useState } from "react"

export function useFollow(initialState = false) {
  const [followed, setFollowed] = useState(initialState)
  const toggleFollow = () => setFollowed((prev) => !prev)
  return { followed, toggleFollow }
}
