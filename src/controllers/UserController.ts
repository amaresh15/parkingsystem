import * as express from "express";
import { getLogger } from 'log4js';
const logger = getLogger("User Controller");
import UserService = require("../service/UserService");

class UserController {

    constructor() {
    
    }

    public createUser(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {
            const user = req.body;
            const userService = new UserService();
            userService.createUserData(user, (error , result) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            console.log("Exception in creating User Data : ", e);
        }
    }

    public getUserById(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {
            const userService = new UserService();
            const userId = req.params.id;
            userService.getUserById(userId, (error , result) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            console.log("Exception in getting all User Data . ", e);
        }
    }

    public getAllUsers(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {
            const userService = new UserService();
            userService.getAllUserData((error , result) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            console.log("Exception in getting all User Data . ", e);
        }
    }

    public searchUsersWithID(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {
            const userService = new UserService();
            let searchText = req.body.searchText;
            userService.searchUsersWithID(searchText, (error , result) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            console.log("Exception in getting all User Data . ", e);
        }
    }

    public updateUser(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {
            const userId = req.params.id;
            const updateBody = req.body;
            const userService = new UserService();
            userService.updateUserData(userId, updateBody, (error , result) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            console.log("Exception in updating User Data : ", e);
        }
    }

    public deleteUserById(req: express.Request, res: express.Response, next: express.NextFunction): void {
        try {
            const userId = req.params.id;
            const userService = new UserService();
            userService.deleteUserById(userId, (error , result) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(result);
                }
            });
        } catch (e) {
            console.log("Exception in deleting User by Id : ", e);
        }
    }
}

export = UserController;
