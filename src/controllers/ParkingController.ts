import * as express from "express";
import { getLogger } from 'log4js';
const mongoose = require('mongoose'); 
const logger = getLogger("Team Controller");
import ParkingService = require("../service/ParkingService");

class ParkingController {
    
    constructor() {

    }
    
    public getAllParkings(req: express.Request, res: express.Response, next: express.NextFunction): void {
        const parkingService = new ParkingService();
        try {
            parkingService.getAllParkingData((error , result) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            console.log("Exception in getting all Parking Data . ", e);
        }
    }

    public getAllAvailableParkings(req: express.Request, res: express.Response, next: express.NextFunction): void {
        const parkingService = new ParkingService();
        try {
            parkingService.getParkingSlotByStatus(false, (error , result) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            console.log("Exception in getting Available Parking Data . ", e);
        }
    }

    public getAllOccupiedParkings(req: express.Request, res: express.Response, next: express.NextFunction): void {
        const parkingService = new ParkingService();
        try {
            parkingService.getParkingSlotByStatus(true, (error , result) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            console.log("Exception in getting Occupied Parking Data . ", e);
        }
    }
    
    public bookingRequest(req: express.Request, res: express.Response, next: express.NextFunction): void {
        const user = req.body;
        console.log("RequestBody ", user);
        const parkingService = new ParkingService();
        try {
            parkingService.allotmentRequest(user.userID, (error , result) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            console.log("Exception in getting Occupied Parking Data . ", e);
        }
    }
}

export = ParkingController;
