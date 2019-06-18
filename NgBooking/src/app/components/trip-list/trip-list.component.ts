import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromStore from '../../store';
import { Store } from '@ngrx/store';
import { Trip } from 'src/app/models/trip.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent implements OnInit, OnDestroy {
  

  displayedColumns: string[] = ['From', 'To', 'Time'];

  private tripsSubscription: Subscription;
  private trips: Trip[];

  constructor(private store: Store<fromStore.AppState>) { }

  ngOnInit() {

    this.tripsSubscription = this.store.select(fromStore.getFilteredTrips).subscribe( res => {
      this.trips = res;
    })

  }

  ngOnDestroy(): void {
    this.tripsSubscription.unsubscribe();
  }

}
