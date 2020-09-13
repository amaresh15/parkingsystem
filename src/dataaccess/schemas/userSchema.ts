import {Schema} from "mongoose";
import User = require("../mongoose/User");
import DataAccess = require("./../dataAccess");

const mongoose = DataAccess.mongooseInstance;
const mongooseConnection = DataAccess.mongooseConnection;

class UserSchema {
    static get schema() {

        const user = new Schema({
                userID: {
                    type: String,
                    unique: true,
                    required: true
                },
                firstName: {
                    type: String,
                    required: true
                },
                lastName: {
                    type: String,
                    required: true
                },
                password : {
                    type: String,
                    required: true
                },
                reservationPeriority : {
                    type: Number
                },
                reservationCategory : {
                    type: String,
                    required: true
                }
            },
            {
                timestamps: true,
                versionKey: false
            });
        return user;
    }
}
const userSchema = mongooseConnection.model<User>("User", UserSchema.schema);
export = userSchema;
