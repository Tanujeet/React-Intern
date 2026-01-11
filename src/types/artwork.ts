export interface Artwork {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string;
  date_start: number;
  date_end: number;
}

export interface Pagination {
  total: number;
  limit: number;
  current_page: number;
}

export interface ApiResponse {
  data: Artwork[];
  pagination: Pagination;
}
