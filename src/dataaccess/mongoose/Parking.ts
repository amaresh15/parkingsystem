import * as mongoose from "mongoose";
import parkingModel = require("./../models/parking");

interface IParking extends parkingModel, mongoose.Document {
    _id: string;
}
export = IParking;
