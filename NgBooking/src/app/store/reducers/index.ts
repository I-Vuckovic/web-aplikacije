import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromTrips from './trip.reducer';
import * as fromFilter from './filter.reducer';

export interface AppState {
  trips: fromTrips.TripState;
  filter: fromFilter.FilterState;
}

export const reducers: ActionReducerMap<AppState> = {
  trips: fromTrips.tripReducer,
  filter: fromFilter.filterReducer
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

export const selectTripState = createFeatureSelector<AppState, fromTrips.TripState>('trips');
export const getTrips = createSelector(selectTripState, fromTrips.getTrips);
export const getTripsLoading = createSelector(selectTripState, fromTrips.getTripsLoading);
export const getTripsLoaded = createSelector(selectTripState, fromTrips.getTripsLoaded);

export const selectFilterState = createFeatureSelector<AppState, fromFilter.FilterState>('filter');
export const getFromFilter = createSelector(selectFilterState, fromFilter.getFromDestination);
export const getToFilter = createSelector(selectFilterState, fromFilter.getToDestination);
export const getStartDateFilter = createSelector(selectFilterState, fromFilter.getStartDate);
export const getEndDateFilter = createSelector(selectFilterState, fromFilter.getEndDate);

export const getToDestination = createSelector(getTrips, getFromFilter, (trips, filter) =>
  trips.filter(trip => trip.from === filter || filter === '')
    .map(trip => trip.to)
    .filter((x, i, a) => a.indexOf(x) === i));

export const getFromDestination = createSelector(getTrips, getToFilter, (trips, filter) =>
  trips.filter(trip => trip.to === filter || filter === '')
    .map(trip => trip.from)
    .filter((x, i, a) => a.indexOf(x) === i));


export const getFilteredTrips = createSelector(getTrips, selectFilterState, (trips, filter) =>
  trips.filter(trip => (trip.from === filter.from || filter.from === '') &&
    (trip.to === filter.to || filter.to === ''))
)
