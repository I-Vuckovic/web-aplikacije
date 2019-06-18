import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Trip } from '../../models/trip.model';

export const FETCH_TRIPS = '[TRIP] Fetch trips';
export const FETCH_TRIPS_FAIL = '[TRIP] Fetch trips failed';
export const FETCH_TRIPS_SUCESS = '[TRIP] Fetch trips sucess';
export const FILTER_TEST = 'FILTER_TEST';

export class FetchTrips implements Action{
    readonly type = FETCH_TRIPS;
}

export class FetchTripsFail implements Action{
    readonly type = FETCH_TRIPS_FAIL;
    constructor(public payload: any){}
}

export class FetchTripsSucess implements Action{
    readonly type = FETCH_TRIPS_SUCESS;
    constructor(public payload: Trip[]){}
}

export class FilterTest implements Action{
    readonly type = FILTER_TEST;
    constructor(public payload: string){}
}

export type TripActions = FetchTrips | FetchTripsFail | FetchTripsSucess | FilterTest;
