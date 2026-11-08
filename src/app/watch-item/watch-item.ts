export type Status = 'planned' | 'in_progress' | 'done';
export type MediaType = 'movie' | 'series' | 'anime' | 'game';

export interface WatchlistItem {
    id: string,
    Title: string,
    type: MediaType,
    status: Status,
    imdbRating?: string,
    addedAt: string,
    imdbId?: string,
    Year?: string,
    Poster?: string,
    Plot?: string,
    rating?: number
}
export const STATUS_LABELS: Record<Status, string> = {
  planned: 'À voir',
  in_progress: 'En cours',
  done: 'Terminé',
};

export const TYPE_LABELS: Record<MediaType, string> = {
  movie: 'Film',
  series: 'Série',
  anime: 'Animé',
  game: 'Jeu',
};
