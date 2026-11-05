import { Component, input, inject, computed } from '@angular/core';
import { WatchlistService } from '../../watch-item/watchlist.service';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-watch-detail',
  styleUrl: './watch-detail.css',
  templateUrl: './watch-detail.html',
})
export class WatchDetail {
  id = input.required<string>();
  protected watchlistService = inject(WatchlistService);
  protected readonly loading = this.watchlistService.loading;

  protected readonly item = computed(() =>
    this.watchlistService.watchlist().find((i) => i.id === String(this.id())),
  );
}
