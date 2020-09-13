import {Schema} from "mongoose";
import ParkingLot = require("../mongoose/ParkingLot");
import DataAccess = require("./../dataAccess");

const mongoose = DataAccess.mongooseInstance;
const mongooseConnection = DataAccess.mongooseConnection;

class ParkingLotSchema {
    static get schema() {

        const parkingLot = new Schema({
                parkingLotID: {
                    type: String,
                    required: true
                },
                parkingID: {
                    type: String,
                    required: true
                },
                bootkedUpTo: {
                    type: String,
                },
                allotedTo : {
                    type: String,
                },
                status : {
                    type: String,
                },
                isReserved : {
                    type: Boolean
                }
            },
            {
                timestamps: true,
                versionKey: false
            });
        return parkingLot;
    }
}
const parkingLotSchema = mongooseConnection.model<ParkingLot>("ParkingLot", ParkingLotSchema.schema);
export = parkingLotSchema;
