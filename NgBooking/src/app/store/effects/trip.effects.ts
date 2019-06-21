import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

import * as tripActions from '../actions/trip.actions';
import * as fromServices from '../../services';
import * as reservationActions from '../actions/reservation.actions';
import { Trip } from 'src/app/models/trip.model';
import { MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { PaymentComponent } from 'src/app/components/payment/payment.component';
import { ReservationCodeComponent } from 'src/app/components/reservation-code/reservation-code.component';
import { ReservationService } from 'src/app/services/reservation.service';


@Injectable()
export class TripEffects {
    constructor(private actions$: Actions,
        private tripService: fromServices.TripService,
        public dialog: MatDialog,
        private reservationService: ReservationService
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
    reserveSeatSucess = this.actions$.pipe(
        ofType(reservationActions.RESERVE_SEAT_SUCESS),
        switchMap((action: reservationActions.ReserveSeatSucess) =>
            this.tripService.updateFreeSeats(action.payload, action.freeSeats)
                .then(() => new tripActions.UpdateFreeSeats(action.payload, action.freeSeats))
        )
    )
}