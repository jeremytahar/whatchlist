export type Status = 'planned' | 'in_progress' | 'done';
export type MediaType = 'movie' | 'series' | 'anime' | 'game';

export interface WatchlistItem {
    id: string,
    Title: string,
    type: MediaType,
    status: Status,
    imdbRating: string,
    addedAt: string,
    imdbId?: string,
    Year?: string,
    Poster?: string,
    Plot?: string
}