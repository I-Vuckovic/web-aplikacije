import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip } from './models/trip.model';
import { Store } from '@ngrx/store';
import * as fromStore from './store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  private trips$: Observable<Trip[]>;
  title = 'NgBooking';

  constructor(private store: Store<fromStore.AppState>) {
  }

  ngOnInit(): void {

    this.trips$ = this.store.select(fromStore.getTrips);
    this.store.dispatch(new fromStore.FetchTrips());
  }
}