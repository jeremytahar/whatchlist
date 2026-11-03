export type Status = 'planned' | 'in_progress' | 'done';
export type MediaType = 'movie' | 'series' | 'anime' | 'game';

export interface watchItem {
    id: string,
    title: string,
    type: MediaType,
    status: Status,
    rating: number,
    addedAt: string,
    imdbId?: string,
    year?: string,
    poster?: string,
    plot?: string
}