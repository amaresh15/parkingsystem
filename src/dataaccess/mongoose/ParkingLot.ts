import * as mongoose from "mongoose";
import parkingLotModel = require("./../models/parkingLot");

interface IParkingLot extends parkingLotModel, mongoose.Document {
    _id: string;
}
export = IParkingLot;
