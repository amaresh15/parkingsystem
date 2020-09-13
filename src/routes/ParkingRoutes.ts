import express = require("express");
import ParkingController = require("../controllers/ParkingController");
const router = express.Router();

class ParkingRoutes {

    private parkingController: ParkingController;

    constructor() {
        this.parkingController = new ParkingController();
    }

    get routes(): express.Router {
        router.get("/", this.parkingController.getAllParkings);
        router.get("/available", this.parkingController.getAllAvailableParkings);
        router.get("/occupied", this.parkingController.getAllOccupiedParkings);
        router.put("/reserve", this.parkingController.bookingRequest);
        return router;
    }
}

Object.seal(ParkingRoutes);
export = ParkingRoutes ;
