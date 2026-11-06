import { Component, input, inject, computed } from '@angular/core';
import { WatchlistService } from '../../watch-item/watchlist.service';
import { RouterLink } from '@angular/router';
import { StarRating } from '../../shared/star-rating/star-rating';

@Component({
  imports: [RouterLink, StarRating],
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

  onRate(rating: number): void {
    this.watchlistService.updateItem(this.id(), {rating}).subscribe();
  }
}
