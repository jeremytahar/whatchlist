import { Service, signal, inject, computed } from '@angular/core';
import { WatchlistItem, Status } from './watch-item';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

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

  readonly countByStatus = computed(() => {
    const counts: Record<Status, number> = { planned: 0, in_progress: 0, done: 0 };
    for (const item of this.watchlistSignal()) {
      counts[item.status]++;
    }
    return counts;
  });
  
  readonly importedImdbIds = computed(
    () => new Set(this.watchlistSignal().flatMap((item) => (item.imdbId ? [item.imdbId] : []))),
  );

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
        this.errorSignal.set("Impossible de charger ta liste. L'API tourne-t-elle ?");
        this.loadingSignal.set(false);
      },
    });
  }

  addItem(newItem: Omit<WatchlistItem, 'id'>): Observable<WatchlistItem> {
    const watchlistItem = { ...newItem, addedAt: new Date().toISOString() };

    return this.http.post<WatchlistItem>(this.apiUrl, watchlistItem).pipe(
        tap((created) => {
          this.watchlistSignal.update((watchlist) => [...watchlist, created]);
        }),
      );
  }

  updateStatus(id: string, status: Status): Observable<WatchlistItem> {
    return this.updateItem(id, { status })
  }

  deleteItem(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
        tap(() => {
            this.watchlistSignal.update((items) => items.filter((item) => (item.id !== id)));
          }),
    );
  }

  updateItem(id: string, changes: Partial<Omit<WatchlistItem, 'id'>>): Observable<WatchlistItem> {
    return this.http.patch<WatchlistItem>(`${this.apiUrl}/${id}`, changes).pipe(
      tap((updated) => {
        this.watchlistSignal.update((items) => items.map((item) => (item.id === id ? updated : item)));
      }),
    );
  }
}
