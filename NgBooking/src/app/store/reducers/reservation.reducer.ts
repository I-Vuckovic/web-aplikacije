import * as ReservationActions from '../actions/reservation.actions';
import { Reservation } from 'src/app/models/reservation.model';

export interface ReservationState {
    reservation: Reservation;
    processing: boolean;
    processed: boolean;
}

const initialState: ReservationState = {
    reservation: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
    },
    processing: false,
    processed: false,
}

export function reservationReducer(state: ReservationState = initialState,
                                   action: ReservationActions.ReservationActions): ReservationState {

    switch (action.type) {

        case ReservationActions.RESERVE_SEAT:
            return {
                ...state,
                processing: true,
                processed: false,
            }

        case ReservationActions.RESERVE_SEAT_SUCESS:
            return {
                ...state,
                processing: false,
                processed: true,
            }

        case ReservationActions.RESERVE_SEAT_FAIL:
            return{
                ...state,
                processing: false,
                processed: false,
            }

        default:
            return state;
    }
}
