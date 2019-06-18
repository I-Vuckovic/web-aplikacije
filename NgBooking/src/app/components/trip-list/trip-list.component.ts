import { Component, OnInit } from '@angular/core';
import * as fromStore from '../../store';
import { Store } from '@ngrx/store';
import { Trip } from 'src/app/models/trip.model';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.scss']
})
export class TripListComponent implements OnInit {

  displayedColumns: string[] = ['From', 'To', 'Time'];

  private trips: Trip[];

  constructor(private store: Store<fromStore.AppState>) { }

  ngOnInit() {

    this.store.select(fromStore.getTrips).subscribe(res => {
      this.trips = res;
    });

  }

}
