import {Schema} from "mongoose";
import Parking = require("../mongoose/Parking");
import DataAccess = require("./../dataAccess");

const mongoose = DataAccess.mongooseInstance;
const mongooseConnection = DataAccess.mongooseConnection;

class ParkingSchema {
    static get schema() {

        const parking = new Schema({
                parkingID: {
                    type: String,
                    unique: true,
                    required: true
                },
                capacity: {
                    type: Number,
                    required: true
                },
                reservedAvailable: {
                    type: Number,
                    required: true
                },
                totalAvailable : {
                    type: Number,
                    required: true
                },
                thresholdStatus : {
                    type: Boolean
                }
            },
            {
                timestamps: true,
                versionKey: false
            });
        return parking;
    }
}
const parkingSchema = mongooseConnection.model<Parking>("Parking", ParkingSchema.schema);
export = parkingSchema;
