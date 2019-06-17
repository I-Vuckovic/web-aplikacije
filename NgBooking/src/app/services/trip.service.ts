import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Trip } from '../models/trip.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TripService {
    private tripCollection: AngularFirestoreCollection<Trip>;
    private trips$: Observable<Trip[]>;

    constructor(private afs: AngularFirestore) { 
        this.trips$ = this.afs.collection<Trip>('trips').valueChanges();
    }

    getTrips() {
        return this.trips$;
    }
}