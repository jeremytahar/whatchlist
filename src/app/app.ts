import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WatchlistService } from './watch-item/watchlist.service';

@Component({
  imports: [RouterOutlet],
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
