export interface SearchResult {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface SearchResponse {
  Search: SearchResult[];
  totalResults: string;
  Response: string;
  Error?: string;
}

export interface MovieDetails {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Plot: string;
  Response: string;
  Error?: string;
}
