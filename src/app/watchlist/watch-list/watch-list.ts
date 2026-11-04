import { Component, inject } from '@angular/core';
import { WatchlistService } from '../../watch-item/watchlist.service';
import { WatchCard } from '../watch-card/watch-card';

@Component({
  imports: [WatchCard],
  selector: 'app-watch-list',
  styleUrl: './watch-list.css',
  templateUrl: './watch-list.html',
})
export class WatchList {
  protected watchlistService = inject(WatchlistService);
  protected readonly watchlist = this.watchlistService.watchlist;
  protected readonly loading = this.watchlistService.loading;
  protected readonly error = this.watchlistService.error;
}
