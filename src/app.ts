import * as express from "express";
//import * as socketio from "socket.io";
import Middlewares = require("./dataaccess/middlewares/base/MiddlewaresBase");
import BaseRoutes = require("./routes");
import { configure, getLogger } from 'log4js';
const logger = getLogger();
/**
 * Import Controllers (route handlers).
 */

/**
 * Create Express server.
 */
const app = express();

configure({
    "appenders": {
        'console': { type: 'console' },
        "debug" : {
            "type": "dateFile",
            "filename": "logs/application",
            "pattern": "-yyyy-MM-dd.log",
            "alwaysIncludePattern": true    
        }
    },
    "categories": { "default": { "appenders": ["debug"], "level": "debug" } }
});

app.set("port", process.env.PORT || 8080);


let http = require("http").Server(app);
// set up socket.io and bind it to our
// http server.
let io = require("socket.io")(http);

//SocketIO connection Event
//io.on("connection",(socket:any)=>{
//   console.log("A SocketIO client got Connected!");
//})

/**
 * Start Express server.
 */
app.all("/*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.use(Middlewares.configuration);
app.use(new BaseRoutes().routes);

app.listen(app.get("port"), () => {
    console.log("server started at http://localhost:" + app.get("port"));
    logger.debug("server started at http://localhost:" + app.get("port"));
});

module.exports = app;
