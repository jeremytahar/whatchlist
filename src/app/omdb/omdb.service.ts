import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Service, inject } from '@angular/core';
import { MovieDetails, SearchResponse, SearchResult } from './omdb';
import { apiKey } from './key';

@Service()
export class OmdbService {
  private readonly http = inject(HttpClient);
  private readonly omdbApiUrl = 'https://www.omdbapi.com/';

  search(query: string): Observable<SearchResult[]> {
    const params = { s: query, apikey: apiKey };

    return this.http
      .get<SearchResponse>(this.omdbApiUrl, { params })
      .pipe(map((r) => r.Search ?? []));
  }

  getDetails(imdbID: string): Observable<MovieDetails> {
    const params = { i: imdbID, apikey: apiKey, plot: 'full' };

    return this.http.get<MovieDetails>(this.omdbApiUrl, { params });
  }
}
