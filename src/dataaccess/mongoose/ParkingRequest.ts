import * as mongoose from "mongoose";
import parkingRequestModel = require("./../models/ParkingRequest");

interface IParkingRequest extends parkingRequestModel, mongoose.Document {
    _id: string;
}
export = IParkingRequest;
