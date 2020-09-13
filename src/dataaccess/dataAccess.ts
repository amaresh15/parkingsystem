import * as Mongoose from "mongoose";
import config = require("config");
import { getLogger } from 'log4js';
const logger = getLogger("Dataccess");
let dbConfig = config.get("database.name");

class DataAccess {
    public static mongooseInstance: any;
    public static mongooseConnection: Mongoose.Connection;

    public static connect(): Mongoose.Connection {
        if (this.mongooseInstance) { return this.mongooseInstance; }

        this.mongooseConnection = Mongoose.connection;
        this.mongooseConnection.once("open", () => {
            logger.debug("Connected to mongodb.");
            console.log("Connected to mongodb.");
        });
        Mongoose.set("debug", true);
        let dbURL;
        if(process.env.pathToMongoDb != null) {
            
            dbURL = process.env.pathToMongoDb;
        } else {
            // dbURL = "mongodb://localhost:27017/" + dbConfig;
            //dbURL = "mongodb://sbr-devp-129:27017/" + dbConfig;
             dbURL = "mongodb://amaresh15:Ami1982#@qadbcluster-shard-00-00-1hsyg.azure.mongodb.net:27017,qadbcluster-shard-00-01-1hsyg.azure.mongodb.net:27017,qadbcluster-shard-00-02-1hsyg.azure.mongodb.net:27017/ParkingSystem?ssl=true&replicaSet=QADBcluster-shard-0&authSource=admin&retryWrites=true&w=majority";
        }
        this.mongooseInstance = Mongoose.connect(dbURL, { useNewUrlParser: true });
        return this.mongooseInstance;
    }
}
DataAccess.connect();
export = DataAccess;
