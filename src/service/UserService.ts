const bcrypt = require('bcryptjs');
const config = require('config');
import { getLogger } from 'log4js';
const logger = getLogger("User Service");
import User = require("../dataaccess/mongoose/User");
import UserRepository = require("../dataaccess/repository/UserRepository");

class UserService {

    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    public createUserData(user: User, callback: (error: any, response: any) => void) {
        const salt = bcrypt.genSaltSync(config.get('saltRounds'));
        const hash = bcrypt.hashSync(user.password, salt);
        user.password = hash;
        logger.debug('user.password : '+user.password);
        this.userRepository.create(user, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }

    public getUserById(userId: any, callback: (error: any, response: any) => void) {
        this.userRepository.retrieveById(userId, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }

    public getAllUserData(callback: (error: any, response: any) => void) {
        this.userRepository.retrieve({}, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }

    public searchUsersWithID(searchText: string, callback: (error: any, response: any) => void) {
        let searchQuery = { email : {$regex : "^" + searchText} };
        this.userRepository.retrieve(searchQuery, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }

    public updateUserData(userId: any, updatedUser: User, callback: (error: any, response: any) => void) {
        const updateQuery = { _id : userId };
        this.userRepository.update(updateQuery, updatedUser, {new: true}, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }

    public deleteUserById(userId: any, callback: (error: any, response: any) => void) {
        const updateQuery = { _id : userId };
        this.userRepository.deleteById(updateQuery, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }
}

Object.seal(UserService);
export = UserService;
