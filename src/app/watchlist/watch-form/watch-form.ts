import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { WatchlistService } from '../../watch-item/watchlist.service';
import { WatchlistItem } from '../../watch-item/watch-item';
import { Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-watch-form',
  styleUrl: './watch-form.css',
  templateUrl: './watch-form.html',
})
export class WatchForm {
  private readonly fb = inject(FormBuilder);
  private readonly watchlistService = inject(WatchlistService);
  protected readonly types = signal<WatchlistItem['type'][]>(['movie', 'series', 'anime', 'game']);
  protected readonly statuses = signal<WatchlistItem['status'][]>([
    'planned',
    'in_progress',
    'done',
  ]);
  private readonly router = inject(Router);

  protected readonly saving = signal(false);
  protected readonly submitError = signal<string | null>(null);

  protected readonly watchlistForm = this.fb.nonNullable.group({
    Title: ['', [Validators.required, Validators.minLength(2)]],
    type: this.fb.nonNullable.control<WatchlistItem['type']>('movie', [Validators.required]),
    status: this.fb.nonNullable.control<WatchlistItem['status']>('planned', [Validators.required]),
    Year: ['', [Validators.pattern(/^\d{4}$/)]],
    Plot: [''],
  });

  protected onSubmit(): void {
    if (this.watchlistForm.invalid) {
      this.watchlistForm.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.submitError.set(null);

    const { Title, type, status, Year, Plot } = this.watchlistForm.getRawValue();

    this.watchlistService
      .addItem({
        Title,
        type,
        status,
        Year,
        Plot,
        addedAt: new Date().toISOString(),
      })
      .subscribe({
        next: () => this.router.navigate(['/']),
        error: () => {
          this.saving.set(false);
          this.submitError.set('Could not save the item. Please try again.');
        },
      });
  }
}
