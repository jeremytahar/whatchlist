import { Component, input, inject, computed } from '@angular/core';
import { DatePipe } from '@angular/common';
import { WatchlistService } from '../../watch-item/watchlist.service';
import { RouterLink } from '@angular/router';
import { StarRating } from '../../shared/star-rating/star-rating';
import { STATUS_LABELS, TYPE_LABELS } from '../../watch-item/watch-item';

@Component({
  imports: [RouterLink, StarRating, DatePipe],
  selector: 'app-watch-detail',
  styleUrl: './watch-detail.css',
  templateUrl: './watch-detail.html',
})
export class WatchDetail {
  id = input.required<string>();
  protected watchlistService = inject(WatchlistService);
  protected readonly loading = this.watchlistService.loading;
  protected readonly statusLabels = STATUS_LABELS;
  protected readonly typeLabels = TYPE_LABELS;

  protected readonly item = computed(() =>
    this.watchlistService.watchlist().find((i) => i.id === String(this.id())),
  );

  protected readonly hasPoster = computed(() => {
    const poster = this.item()?.Poster;
    return !!poster && poster !== 'N/A';
  });

  onRate(rating: number): void {
    this.watchlistService.updateItem(this.id(), { rating }).subscribe();
  }
}
