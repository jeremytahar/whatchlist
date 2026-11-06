import { Component, input, output } from '@angular/core';
import { WatchlistItem, Status } from '../../watch-item/watch-item';
import { RouterLink } from '@angular/router';
import { StarRating } from '../../shared/star-rating/star-rating';

@Component({
  imports: [RouterLink, StarRating],
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
}
