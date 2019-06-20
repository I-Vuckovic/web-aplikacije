import { Action } from '@ngrx/store';
import { Trip } from '../../models/trip.model';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import * as Actions from '../actions';
import { Update } from '@ngrx/entity';
import { SafeMethodCall } from '@angular/compiler';

export const adapter: EntityAdapter<Trip> = createEntityAdapter<Trip>();

export interface TripState extends EntityState<Trip> {
    loaded: boolean;
    loading: boolean;
}
const initialState: TripState = adapter.getInitialState({
    loaded: false,
    loading: false,

});

export function tripReducer(state: TripState = initialState, 
                            action: Actions.TripActions | Actions.ReservationActions): TripState {

    switch (action.type) {
        case Actions.FETCH_TRIPS:
            return {
                ...state,
                loading: true,
            };

        case Actions.FETCH_TRIPS_SUCESS:
            const trips = action.payload.map(trip => {
                return {
                    ...trip,
                    time: new Date(trip.timestamp.seconds * 1000)
                };
            });
            return adapter.addMany(trips, {
                ...state,
                loaded: true,
                loading: false
            });

        case Actions.FETCH_TRIPS_FAIL:
            console.log(action.payload);
            return {
                ...state,
                loading: false,
                loaded: false,
            };

        case Actions.RESERVE_SEAT_SUCESS:
            return adapter.updateOne({ id: action.payload, changes: { freeSeats: action.seatsLeft, seatReserved: true } }, {
                ...state
            })

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
export const getSelectedTrip = selectIds;
