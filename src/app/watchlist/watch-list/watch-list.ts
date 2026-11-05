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

  protected readonly tabs : { value: Status | 'all'; label: string } [] = [
    { value: 'all', label: 'Tous' },
    { value: 'in_progress', label: 'En cours' },
    { value: 'planned', label: 'Prévu' },
    { value: 'done', label: 'Terminé' }
  ];

  protected readonly filteredWatchlist = computed(() => {
    if (this.activeTab() === 'all') {
      return this.watchlist();
    }
    return this.watchlist().filter(
      (movie: WatchlistItem) => movie.status === this.activeTab(),
    );
  });

  onReload(): void {
    this.watchlistService.loadItems();
  }



}
