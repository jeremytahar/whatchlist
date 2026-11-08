import { Component, signal, computed, input, output } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-star-rating',
  styleUrl: './star-rating.css',
  templateUrl: './star-rating.html',
})
export class StarRating {
  rating = input(0);
  max = input(5);
  ratingChange = output<number>();

  stars = computed(() => Array.from({ length: this.max() }, (_, i) => i + 1));

  protected readonly hovered = signal(0);

  rate(value: number): void {
    this.ratingChange.emit(value === this.rating() ? 0 : value);
  }
}
