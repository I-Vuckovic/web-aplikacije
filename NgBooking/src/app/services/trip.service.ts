import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentChangeAction } from 'angularfire2/firestore';
import { Trip, TripId } from '../models/trip.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TripService {
    private tripCollection: AngularFirestoreCollection<Trip>;
    private trips$: Observable<TripId[]>;

    constructor(private afs: AngularFirestore) {

        this.tripCollection = this.afs.collection<Trip>('trips');
        this.trips$ = this.tripCollection.snapshotChanges().pipe(
            map(actions => actions.map (a => {
                const data = a.payload.doc.data() as Trip;
                const id = a.payload.doc.id;
                return {id, ...data};
            }))
        )
    }

    getTrips() {
        return this.trips$;
    }
}