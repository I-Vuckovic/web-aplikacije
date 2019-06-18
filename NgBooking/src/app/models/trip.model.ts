export interface Trip {
    id?: string;
    from: string;
    to: string;
    time: Date;
    timestamp?: any;
}

export interface TripId extends Trip {
    id: string;
}