import * as express from "express";
import UserRoutes = require("./UserRoutes");
import ParkingRoutes = require("./ParkingRoutes");

const app = express();

class BaseRoutes {
    get routes() {
        app.use("/api/users/", new UserRoutes().routes);
        app.use("/api/parking/", new ParkingRoutes().routes);
        return app;
    }
}
export = BaseRoutes;
