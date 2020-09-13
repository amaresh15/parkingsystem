import {Schema} from "mongoose";
import ParkingRequest = require("../mongoose/ParkingRequest");
import DataAccess = require("./../dataAccess");

const mongoose = DataAccess.mongooseInstance;
const mongooseConnection = DataAccess.mongooseConnection;

class ParkingRequestSchema {
    static get schema() {

        const parkingRequest = new Schema({
                userID: {
                    type: String,
                    required: true
                },
                parkingID: {
                    type: String,
                    required: true
                },
                requestTime: {
                    type: Number,
                    required: true
                },
                reservationPeriority: {
                    type: Number,
                },
                isProcessed : {
                    type: Boolean
                }
            },
            {
                timestamps: true,
                versionKey: false
            });
        return parkingRequest;
    }
}
const parkingRequestSchema = mongooseConnection.model<ParkingRequest>("ParkingRequest", ParkingRequestSchema.schema);
export = parkingRequestSchema;
