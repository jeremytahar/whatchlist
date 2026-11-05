import { Component, input } from '@angular/core';
import { WatchlistItem } from '../../watch-item/watch-item';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-watch-card',
  styleUrl: './watch-card.css',
  templateUrl: './watch-card.html',
})
export class WatchCard {
  item = input.required<WatchlistItem>();
}
