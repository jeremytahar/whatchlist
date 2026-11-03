import { Service, signal, inject } from '@angular/core';
import { WatchlistItem } from './watch-item';
import { HttpClient } from '@angular/common/http';

@Service()
export class WatchlistService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3001/watchlist';

  private readonly watchlistSignal = signal<WatchlistItem[]>([]);
  private readonly loadingSignal = signal(true);
  private readonly errorSignal = signal<string | null>(null);

  readonly watchlist = this.watchlistSignal.asReadonly();
  readonly loading = this.loadingSignal.asReadonly();
  readonly error = this.errorSignal.asReadonly();

  constructor() {
    this.loadItems();
  }

  loadItems(): void {
    this.loadingSignal.set(true);
    this.errorSignal.set(null);

    this.http.get<WatchlistItem[]>(this.apiUrl).subscribe({
      next: (watchlistitem) => {
        this.watchlistSignal.set(watchlistitem);
        this.loadingSignal.set(false);
      },
      error: () => {
        this.errorSignal.set('Could not load your watchlist. Is the API running?');
        this.loadingSignal.set(false);
      },
    });
  }
}
