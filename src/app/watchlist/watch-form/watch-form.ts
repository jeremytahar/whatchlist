import { Component, inject, signal, input, computed, effect } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { WatchlistService } from '../../watch-item/watchlist.service';
import { STATUS_LABELS, TYPE_LABELS, WatchlistItem } from '../../watch-item/watch-item';
import { Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

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

  protected readonly statusLabels = STATUS_LABELS;
  protected readonly typeLabels = TYPE_LABELS;

  protected readonly saving = signal(false);
  protected readonly submitError = signal<string | null>(null);
  protected readonly id = input<string>();

  protected readonly watchlistForm = this.fb.nonNullable.group({
    Title: ['', [Validators.required, Validators.minLength(2)]],
    type: this.fb.nonNullable.control<WatchlistItem['type']>('movie', [Validators.required]),
    status: this.fb.nonNullable.control<WatchlistItem['status']>('planned', [Validators.required]),
    Year: ['', [Validators.pattern(/^\d{4}$/)]],
    Plot: [''],
    Poster: ['', [Validators.pattern(/^https?:\/\/\S+$/)]],
  });

  protected readonly posterUrl = toSignal(this.watchlistForm.controls.Poster.valueChanges, {
    initialValue: '',
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
      Poster: item.Poster && item.Poster !== 'N/A' ? item.Poster : '',
    });

    const fromOMDB = item.imdbId;

    if (fromOMDB) {
      this.watchlistForm.controls.Title.disable();
      this.watchlistForm.controls.Year.disable();
      this.watchlistForm.controls.Plot.disable();
      this.watchlistForm.controls.Poster.disable();
    } else {
      this.watchlistForm.controls.Title.enable();
      this.watchlistForm.controls.Year.enable();
      this.watchlistForm.controls.Plot.enable();
      this.watchlistForm.controls.Poster.enable();
    }
  });

  protected onSubmit(): void {
    if (this.watchlistForm.invalid) {
      this.watchlistForm.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.submitError.set(null);

    const id = this.id();

    const { Title, type, status, Year, Plot, Poster } = this.watchlistForm.getRawValue();

    const request$ =
      id !== undefined
        ? this.watchlistService.updateItem(id, {
            Title,
            type,
            status,
            Year,
            Plot,
            Poster,
          })
        : this.watchlistService.addItem({
            Title,
            type,
            status,
            Year,
            Plot,
            Poster,
            addedAt: new Date().toISOString(),
          });

    request$.subscribe({
      next: () => this.router.navigate(id !== undefined ? ['/watchlist', id] : ['/']),
      error: () => {
        this.saving.set(false);
        this.submitError.set("L'enregistrement a échoué. Vérifie que l'API tourne puis réessaie.");
      },
    });
  }
}
