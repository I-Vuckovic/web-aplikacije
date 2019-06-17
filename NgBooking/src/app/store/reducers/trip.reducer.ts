import { Action } from '@ngrx/store';
import { Trip } from '../../models/trip.model';
import * as TripActions from '../actions/trip.actions';

export interface TripState {
    trips: Trip[];
    loaded: boolean;
    loading: boolean;
}

const initialState: TripState = {
    trips: [],
    loaded: false,
    loading: false,
}

export function tripReducer( state : TripState = initialState, action: TripActions.TripActions) : TripState {

    switch(action.type){
        case TripActions.FETCH_TRIPS:
            return{
                ...state,
                loading: true,
            };
        case TripActions.FETCH_TRIPS_SUCESS:
            const trips = action.payload.map( trip => {
                return {
                    ...trip,
                    time: new Date(trip.timestamp.seconds)
                };
            });
            return{
                ...state,
                loading: false,
                loaded: true,
                trips
            };
        case TripActions.FETCH_TRIPS_FAIL:
            console.log(action.payload);
            return{
                ...state,
                loading: false,
                loaded: false,
            };

        default:
            return state;
    }
}

