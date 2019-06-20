import * as ReservationActions from '../actions/reservation.actions';

export interface ReservationState {
    tripId: string;
    reserved: boolean;
}

const initialState: ReservationState = {
    tripId: '',
    reserved: false
}

export function reservationReducer(state: ReservationState = initialState,
                                   action: ReservationActions.ReservationActions): ReservationState {

    switch (action.type) {

        case ReservationActions.RESERVE_SEAT:
            return {
                ...state,
                tripId: action.payload,
                reserved: false,
            }

        case ReservationActions.RESERVE_SEAT_SUCESS:
            return {
                ...state,
                tripId: '',
                reserved: true
            }

        case ReservationActions.RESERVE_SEAT_FAIL:
            return{
                ...state,
                tripId: 'error',
                reserved: false
            }

        default:
            return state;
    }
}
