import {Schema} from "mongoose";
import RuleCombination = require("../mongoose/RuleCombination");
import DataAccess = require("./../dataAccess");

const mongoose = DataAccess.mongooseInstance;
const mongooseConnection = DataAccess.mongooseConnection;

class RuleCombinationSchema {
    static get schema() {

        const parking = new Schema({
                ruleID: {
                    type: String,
                    unique: true,
                    required: true
                },
                reserveThreshold : {
                    type: Boolean
                },
                reserveEligiblity : {
                    type: Boolean
                },
                reserveAvailiblity : {
                    type: Boolean
                },
                reserveAllotment : {
                    type: Boolean
                },
                bufferTime : {
                    type: Number,
                }
            },
            {
                timestamps: true,
                versionKey: false
            });
        return parking;
    }
}
const ruleCombinationSchema = mongooseConnection.model<RuleCombination>("RuleCombination", RuleCombinationSchema.schema);
export = ruleCombinationSchema;
