import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WatchlistService } from './watch-item/watchlist.service';
import { OmdbSearch } from './watchlist/omdb-search/omdb-search';
import { WatchList } from './watchlist/watch-list/watch-list';

@Component({
  imports: [RouterOutlet, OmdbSearch, WatchList],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('whatchlist');
  private readonly watchlistService = inject(WatchlistService);
  protected readonly watchlist = this.watchlistService.watchlist;
  protected readonly loading = this.watchlistService.loading;
  protected readonly error = this.watchlistService.error;
}
