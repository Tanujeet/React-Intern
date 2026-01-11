import type { ApiResponse } from "../types/artwork";

export async function fetchArtworks(page: number): Promise<ApiResponse> {
  const res = await fetch(`https://api.artic.edu/api/v1/artworks?page=${page}`);
  return res.json();
}
