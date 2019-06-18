import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromTrips from './trip.reducer';
import { Trip } from 'src/app/models/trip.model';

export interface AppState {
  trips: fromTrips.TripState;
}

export const reducers: ActionReducerMap<AppState> = {
  trips: fromTrips.tripReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

export const selectTripState = createFeatureSelector<AppState, fromTrips.TripState>('trips');

export const getTrips = createSelector(selectTripState, fromTrips.getTrips);
export const getTripsLoading = createSelector(selectTripState, fromTrips.getTripsLoading);
export const getTripsLoaded = createSelector(selectTripState, fromTrips.getTripsLoaded);
export const getFilterTest = createSelector(selectTripState, fromTrips.getFilterTest);

export const getFromDestination = createSelector(getTrips, (tripEntities: Trip[], props: string) =>
  tripEntities.filter(trip => trip.to === props || props === '')
    .map(trip => trip.from)
    .filter((x, i, a) => a.indexOf(x) === i));

// export const getToDestination = createSelector(getTrips, (tripEntities: Trip[], props: string) =>
//   tripEntities.filter(trip => trip.from === props || props === '')
//     .map(trip => trip.to)
//     .filter((x, i, a) => a.indexOf(x) === i));

export const getToDestination = createSelector(getTrips, getFilterTest, (trips, filter) =>
  trips.filter(trip => trip.from === filter || filter === '')
    .map(trip => trip.to)
    .filter((x, i, a) => a.indexOf(x) === i));

