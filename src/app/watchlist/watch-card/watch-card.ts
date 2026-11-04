import { Component, input } from '@angular/core';
import { WatchlistItem } from '../../watch-item/watch-item';

@Component({
  imports: [],
  selector: 'app-watch-card',
  styleUrl: './watch-card.css',
  templateUrl: './watch-card.html',
})
export class WatchCard {
  item = input.required<WatchlistItem>();

}
