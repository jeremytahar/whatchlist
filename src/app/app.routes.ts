import { Routes } from '@angular/router';
import { WatchDetail } from './watchlist/watch-detail/watch-detail';
import { WatchList } from './watchlist/watch-list/watch-list';

export const routes: Routes = [
  { path: '', component: WatchList },
  { path: 'watchlist', component: WatchList },
  { path: 'watchlist/:id', component: WatchDetail },
];
