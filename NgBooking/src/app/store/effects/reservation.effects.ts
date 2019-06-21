import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as tripActions from '../actions/trip.actions';
import * as fromServices from '../../services';
import * as reservationActions from '../actions/reservation.actions';
import { ReservationCodeComponent } from 'src/app/components/reservation-code/reservation-code.component';
import { MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { ReservationService } from 'src/app/services/reservation.service';

@Injectable()
export class ReservationEffects {
    constructor(private actions$: Actions, private reservationService: ReservationService, public dialog: MatDialog,
    ) { }

    @Effect()
    getReservation$ = this.actions$.pipe(
        ofType(reservationActions.FETCH_RESERVATION),
        switchMap((action: reservationActions.FetchReservation) => 
            this.reservationService.getReservation(action.payload).pipe(
                map(reservation => new reservationActions.FetchReservationSucess(reservation)),
                catchError( () => of(new reservationActions.FetchReservationFail()))
            ))
    )

    @Effect()
    reserveSeat$ = this.actions$.pipe(
        ofType(reservationActions.RESERVE_SEAT),
        switchMap((action: reservationActions.ReserveSeat) =>
            this.reservationService.reserveSeat(action.payload)
                .then(ref => this.dialog.open(ReservationCodeComponent, {data: ref.id}))
                .then(() => new reservationActions.ReserveSeatSucess(action.payload.tripId, action.freeSeats))
                .catch(() => new reservationActions.ReserveSeatFail())
        ),
    )
}