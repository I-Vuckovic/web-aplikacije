import { Action } from '@ngrx/store';
import { Trip } from '../../models/trip.model';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import * as TripActions from '../actions/trip.actions';

export const adapter: EntityAdapter<Trip> = createEntityAdapter<Trip>();

export interface TripState extends EntityState<Trip> {
    loaded: boolean;
    loading: boolean;
    filterTest: string;
}
const initialState: TripState = adapter.getInitialState({
    loaded: false,
    loading: false,
    filterTest: '',
});

export function tripReducer(state: TripState = initialState, action: TripActions.TripActions): TripState {

    switch (action.type) {
        case TripActions.FETCH_TRIPS:
            return {
                ...state,
                loading: true,
            };

        case TripActions.FETCH_TRIPS_SUCESS:
            const trips = action.payload.map(trip => {
                return {
                    ...trip,
                    time: new Date(trip.timestamp.seconds)
                };
            });

            return adapter.addMany(trips, {
                ...state,
                loaded: true,
                loading: false
            });

        case TripActions.FETCH_TRIPS_FAIL:
            console.log(action.payload);
            return {
                ...state,
                loading: false,
                loaded: false,
            };

        case TripActions.FILTER_TEST:
            console.log(action.payload);
            return {
                ...state,
                filterTest: action.payload
            };

        default:
            return state;
    }
}

const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
} = adapter.getSelectors();


export const getTripsLoading = (state: TripState) => state.loading;
export const getTripsLoaded = (state: TripState) => state.loaded;
export const getTrips = selectAll;
export const getFilterTest = (state: TripState) => state.filterTest;

