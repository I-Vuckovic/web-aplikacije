import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { Reservation } from '../models/reservation.model';


@Injectable({
    providedIn: 'root'
})
export class ReservationService {

    constructor(private afs: AngularFirestore) {

    }

    getReservation(id: string) {
        return this.afs.collection('reservations').doc(id).get()
            .pipe(
                map(document => {
                    if (document.exists) {
                        const data = document.data() as Reservation;
                        const id = document.id;
                        return { id, ...data };
                    } else {
                        throw new Error(`Couldn't find reservation with id ${id}`)
                    }
                })
            )
    }


    reserveSeat(reservation: Reservation) {
        return this.afs.collection('reservations').add(reservation);
    }
}