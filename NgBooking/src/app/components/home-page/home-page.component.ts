import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromStore from '../../store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  private selectedFrom: string;
  private selectedTo: string;
  private selected;
  private toDestinations$: Observable<string[]>;
  private fromDestinations$: Observable<string[]>;

  constructor(private store: Store<fromStore.AppState>) { }

  ngOnInit() {
    this.selectedFrom = '';
    this.selectedTo = '';
    
    this.fromDestinations$ = this.store.select(fromStore.getFromDestination, this.selectedTo);
    this.toDestinations$ = this.store.select(fromStore.getToDestination, this.selectedFrom);

    $(document).ready(() => {

      ($('.carousel.carousel-slider') as any).carousel({
        fullWidth: true,
        indicators: true
      });
    });

  }

  ngOnDestroy(): void {
    
  }

  changeToDestination(){
    if (this.selectedTo === undefined){
      this.selectedTo = '';
    }
    this.fromDestinations$ = this.store.select(fromStore.getFromDestination, this.selectedTo);
    
  }

  changeFromDestination(){
    if ( this.selectedFrom === undefined){
      this.selectedFrom = '';
    }
    //this.toDestinations$ = this.store.select(fromStore.getToDestination, this.selectedFrom);
    this.store.dispatch(new fromStore.FilterTest(this.selectedFrom));
  }

  navigateToTripList(){
    
  }


}
