import { Component, inject, signal, computed } from '@angular/core';
import { WatchlistService } from '../../watch-item/watchlist.service';
import { WatchCard } from '../watch-card/watch-card';
import { Status, WatchlistItem } from '../../watch-item/watch-item';
import { RouterLink } from '@angular/router';

@Component({
  imports: [WatchCard, RouterLink],
  selector: 'app-watch-list',
  styleUrl: './watch-list.css',
  templateUrl: './watch-list.html',
})
export class WatchList {
  protected watchlistService = inject(WatchlistService);
  protected readonly watchlist = this.watchlistService.watchlist;
  protected readonly loading = this.watchlistService.loading;
  protected readonly error = this.watchlistService.error;

  protected readonly activeTab = signal<Status | 'all'>('all');

  protected readonly tabs: { value: Status | 'all'; label: string }[] = [
    { value: 'all', label: 'Tous' },
    { value: 'planned', label: 'Prévu' },
    { value: 'in_progress', label: 'En cours' },
    { value: 'done', label: 'Terminé' },
  ];

  protected readonly sortBy = signal<'date' | 'rating'>('date');

  protected readonly sortOptions: { value: 'date' | 'rating'; label: string }[] = [
    { value: 'date', label: 'Date' },
    { value: 'rating', label: 'Note' },
  ];

  protected readonly filteredWatchlist = computed(() => {
    if (this.activeTab() === 'all') {
      return this.watchlist();
    }
    return this.watchlist().filter((movie: WatchlistItem) => movie.status === this.activeTab());
  });

  protected readonly sortedWatchlist = computed(() => {
    const list = [...this.filteredWatchlist()];

    if (this.sortBy() === 'rating') {
      return list.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0) || b.addedAt.localeCompare(a.addedAt));
    }

    return list.sort((a,b) => b.addedAt.localeCompare(a.addedAt))
  });

  onReload(): void {
    this.watchlistService.loadItems();
  }

  onStatusChange(id: string, status: Status) {
    this.watchlistService.updateStatus(id, status).subscribe();
  }

  onRemove(id: string) {
    this.watchlistService.deleteItem(id).subscribe();
  }

  onRate(id: string, rating: number) {
    this.watchlistService.updateItem(id, { rating }).subscribe();
  }
}
