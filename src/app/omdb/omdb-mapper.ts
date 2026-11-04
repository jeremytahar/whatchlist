import { MovieDetails } from './omdb';
import { WatchlistItem } from '../watch-item/watch-item';

export function toWatchlistItem(details: MovieDetails): Omit<WatchlistItem, 'id'> {
  return {
    Title: details.Title,
    Year: details.Year,
    Plot: details.Plot,
    imdbRating: details.imdbRating,
    imdbId: details.imdbID,
    status: 'planned',
    addedAt: new Date().toISOString(),
    type: details.Type === 'series' ? 'series' : 'movie',
    Poster: details.Poster !== 'N/A' ? details.Poster : undefined,
  };
}
