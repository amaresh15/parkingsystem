import * as mongoose from "mongoose";
import ruleCombinationModel = require("./../models/RuleCombination");

interface IRuleCombination extends ruleCombinationModel, mongoose.Document {
    _id: string;
}
export = IRuleCombination;
