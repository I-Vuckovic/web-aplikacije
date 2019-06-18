import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromStore from '../../store';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {
  

  private selectedFromSubscription: Subscription;
  private selectedToSubscription: Subscription;
  private selectedFrom: string;
  private selectedTo: string;
  private selected;
  private toDestinations$: Observable<string[]>;
  private fromDestinations$: Observable<string[]>;

  constructor(private store: Store<fromStore.AppState>) { }

  ngOnInit() {

    this.selectedFromSubscription = this.store.select(fromStore.getFromFilter).subscribe( res => {
      this.selectedFrom = res;
    })
    this.selectedToSubscription = this.store.select(fromStore.getToFilter).subscribe( res => {
      this.selectedTo = res;
    })

    this.fromDestinations$ = this.store.select(fromStore.getFromDestination, this.selectedTo);
    this.toDestinations$ = this.store.select(fromStore.getToDestination, this.selectedFrom);
  }

  ngOnDestroy(): void {
    this.selectedFromSubscription.unsubscribe();
    this.selectedToSubscription.unsubscribe();
  }

  changeToDestination() {
    if (this.selectedTo === undefined) {
      this.selectedTo = '';
    }
    //this.fromDestinations$ = this.store.select(fromStore.getFromDestination, this.selectedTo);
    this.store.dispatch(new fromStore.ChangeToDestination(this.selectedTo));
  }

  changeFromDestination() {
    if (this.selectedFrom === undefined) {
      this.selectedFrom = '';
    }
    //this.toDestinations$ = this.store.select(fromStore.getToDestination, this.selectedFrom);
    this.store.dispatch(new fromStore.ChangeFromDestination(this.selectedFrom));
  }


}
