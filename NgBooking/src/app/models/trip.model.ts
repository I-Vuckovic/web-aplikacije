export interface Trip {
    id?: string;
    from: string;
    to: string;
    time: Date;
    timestamp?: any;
    distance: number;
    price: number;
    duration: string;
    freeSeats: number;
    seatReserved: boolean;
    extraLuggage: number;
}

export interface TripId extends Trip {
    id: string;
}