import { Component, OnInit, OnDestroy } from '@angular/core';
import { Trip } from 'src/app/models/trip.model';
import { Router, ActivatedRoute } from '@angular/router';
import * as fromStore from '../../store';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class PaymentComponent implements OnInit, OnDestroy {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  private trip: Trip;
  private tripSubscription: Subscription;

  constructor(private store: Store<fromStore.AppState>, private route: ActivatedRoute,
              private formBuilder: FormBuilder) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('tripId');

    this.tripSubscription = this.store.select(fromStore.getSelectedTrip, id).subscribe(res => {
      this.trip = res;
    })

    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      
    });
  }

  ngOnDestroy(): void {
    this.tripSubscription.unsubscribe();
  }

}
