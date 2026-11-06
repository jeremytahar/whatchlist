import { Routes } from '@angular/router';
import { WatchDetail } from './watchlist/watch-detail/watch-detail';
import { WatchList } from './watchlist/watch-list/watch-list';
import { WatchForm } from './watchlist/watch-form/watch-form';
import { OmdbSearch } from './watchlist/omdb-search/omdb-search';

export const routes: Routes = [
  { path: '', component: WatchList },
  { path: 'watchlist', component: WatchList },
  { path: 'watchlist/new', component: WatchForm },
  { path: 'watchlist/search', component: OmdbSearch },
  { path: 'watchlist/:id', component: WatchDetail },
  { path: 'watchlist/:id/edit', component: WatchForm },
];
