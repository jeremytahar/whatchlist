import { Component, computed, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Status, STATUS_LABELS, TYPE_LABELS, WatchlistItem } from '../../watch-item/watch-item';
import { StarRating } from '../../shared/star-rating/star-rating';

@Component({
  imports: [RouterLink, StarRating, DatePipe],
  selector: 'app-watch-card',
  styleUrl: './watch-card.css',
  templateUrl: './watch-card.html',
})
export class WatchCard {
  item = input.required<WatchlistItem>();
  statusChange = output<Status>();
  remove = output<void>();
  rate = output<number>();

  protected readonly statuses: Status[] = ['planned', 'in_progress', 'done'];
  protected readonly statusLabels = STATUS_LABELS;
  protected readonly typeLabel = computed(() => TYPE_LABELS[this.item().type]);
  protected readonly hasPoster = computed(() => !!this.item().Poster && this.item().Poster !== 'N/A');
}
