import type { CreatorProfile } from "@/types/feature"
import { creatorSuggestions } from "@/lib/featureData"

export async function getCreatorSuggestions(): Promise<CreatorProfile[]> {
  return Promise.resolve(creatorSuggestions)
}
