class ParkingRequest {
    public userID: string;
    public parkingID: string;
    public requestTime: number;
    public reservationPeriority: number;
    public isProcessed: boolean;

    constructor() {}
}
export = ParkingRequest;
