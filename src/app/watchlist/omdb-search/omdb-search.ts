import { Component, inject } from '@angular/core';
import { OmdbService } from '../../omdb/omdb.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, of, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { WatchlistService } from '../../watch-item/watchlist.service';
import { toWatchlistItem } from '../../omdb/omdb-mapper';
import { SearchResult } from '../../omdb/omdb';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-omdb-search',
  styleUrl: './omdb-search.css',
  templateUrl: './omdb-search.html',
})
export class OmdbSearch {
  private readonly omdbService = inject(OmdbService);
  protected readonly searchControl = new FormControl('', { nonNullable: true });
  private readonly watchlistService = inject(WatchlistService);

  protected readonly results = toSignal(
    this.searchControl.valueChanges.pipe(
      debounceTime(400),
      map((query) => query.trim()),
      distinctUntilChanged(),
      switchMap((query) => {
        if (query.length >= 3) {
          return this.omdbService.search(query);
        }
        return of([]);
      }),
    ),
    {
      initialValue: [],
    },
  );

  addMovieToWatchlist(result: SearchResult): void {
    this.omdbService
      .getDetails(result.imdbID)
      .pipe(
        map(toWatchlistItem),
        switchMap((item) => this.watchlistService.addItem(item)),
      )
      .subscribe();
  }
}
