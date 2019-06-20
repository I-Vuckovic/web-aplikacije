import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as tripActions from '../actions/trip.actions';
import * as fromServices from '../../services';
import * as reservationActions from '../actions/reservation.actions';


@Injectable()
export class TripEffects {
    constructor(private actions$: Actions,
        private tripService: fromServices.TripService
    ) { }

    @Effect()
    loadTrips$ = this.actions$.pipe(
        ofType(tripActions.FETCH_TRIPS),
        switchMap(() =>
            this.tripService
                .getTrips()
                .pipe(
                    map(trips => new tripActions.FetchTripsSucess(trips)),
                    catchError(error => of(new tripActions.FetchTripsFail(error))),
                )
        )
    )

    @Effect()
    reserveSeat$ = this.actions$.pipe(
        ofType(reservationActions.RESERVE_SEAT),
        switchMap((action: reservationActions.ReserveSeat) =>
            this.tripService.reserveSeat(action.payload, action.seatsLeft)
                .then(() => new reservationActions.ReserveSeatSucess(action.payload, action.seatsLeft))
                .catch(() => new reservationActions.ReserveSeatFail())
        ),
    )
}