import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromTrips from './trip.reducer';

export interface AppState {
  trips: fromTrips.TripState;
}

export const reducers: ActionReducerMap<AppState> = {
  trips: fromTrips.tripReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
