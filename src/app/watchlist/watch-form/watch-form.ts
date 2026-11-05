import { Component, inject, signal, input, computed, effect } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { WatchlistService } from '../../watch-item/watchlist.service';
import { WatchlistItem } from '../../watch-item/watch-item';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
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
  protected readonly id = input<string>();

  protected readonly watchlistForm = this.fb.nonNullable.group({
    Title: ['', [Validators.required, Validators.minLength(2)]],
    type: this.fb.nonNullable.control<WatchlistItem['type']>('movie', [Validators.required]),
    status: this.fb.nonNullable.control<WatchlistItem['status']>('planned', [Validators.required]),
    Year: ['', [Validators.pattern(/^\d{4}$/)]],
    Plot: [''],
  });

  protected readonly isEditMode = computed(() => this.id() !== undefined);

  protected readonly item = computed(() =>
    !this.id()
      ? undefined
      : this.watchlistService.watchlist().find((i) => i.id === String(this.id())),
  );

  private readonly syncFormWithItem = effect(() => {
    const item = this.item();

    if (!item) {
      return;
    }
    this.watchlistForm.patchValue({
      Title: item.Title,
      Year: item.Year ?? '',
      status: item.status,
      type: item.type,
      Plot: item.Plot ?? '',
    });
  });

  protected onSubmit(): void {
    if (this.watchlistForm.invalid) {
      this.watchlistForm.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.submitError.set(null);

    const id = this.id();

    const { Title, type, status, Year, Plot } = this.watchlistForm.getRawValue();

    const request$ =
      id !== undefined
        ? this.watchlistService.updateItem(id, {
            Title,
            type,
            status,
            Year,
            Plot,
          })
        : this.watchlistService.addItem({
            Title,
            type,
            status,
            Year,
            Plot,
            addedAt: new Date().toISOString(),
          });

    request$.subscribe({
      next: () => this.router.navigate(id !== undefined ? ['/watchlist', id] : ['/']),
      error: () => {
        this.saving.set(false);
        this.submitError.set('Could not save the item. Please try again.');
      },
    });
  }
}
