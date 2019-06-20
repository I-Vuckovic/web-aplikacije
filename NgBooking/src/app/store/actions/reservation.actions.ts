import { Action } from '@ngrx/store';
import { Reservation } from 'src/app/models/reservation.model';

export const RESERVE_SEAT = '[RESERVATION] Reserve seat';
export const RESERVE_SEAT_SUCESS = '[RESERVATION] Reserve seat sucess';
export const RESERVE_SEAT_FAIL = '[RESERVATION] Reserve seat fail';

export class ReserveSeat implements Action{
    readonly type = RESERVE_SEAT;
    constructor(public payload: Reservation, public freeSeats: number){}
}

export class ReserveSeatSucess implements Action{
    readonly type = RESERVE_SEAT_SUCESS;
    constructor(public payload: string, public freeSeats: number){}
}

export class ReserveSeatFail implements Action{
    readonly type = RESERVE_SEAT_FAIL;
}

export type ReservationActions = ReserveSeat | ReserveSeatSucess | ReserveSeatFail;
