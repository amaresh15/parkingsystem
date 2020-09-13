import Parking = require("../dataaccess/mongoose/Parking");
import User = require("../dataaccess/mongoose/user");
import ParkingLot = require("../dataaccess/mongoose/ParkingLot");
import ParkingRequest = require("../dataaccess/mongoose/ParkingRequest");
import ParkingRepository = require("../dataaccess/repository/ParkingRepository");
import UserRepository = require("../dataaccess/repository/UserRepository");
import RuleCombinationRepository = require("../dataaccess/repository/RuleCombinationRepository");
import ParkingLotRepository = require("../dataaccess/repository/ParkingLotRepository");
import ParkingRequestRepository = require("../dataaccess/repository/ParkingRequestRepository");
const schedule = require('node-schedule');
import { getLogger } from 'log4js';
const logger = getLogger("Parking Service");

class ParkingService {

    private parkingRepository: ParkingRepository;
    private parkingLotRepository: ParkingLotRepository;
    private parkingRequestRepository: ParkingRequestRepository;
    private userRepository: UserRepository;
    private ruleCombinationRepository: RuleCombinationRepository;

    constructor() {
        this.parkingRepository = new ParkingRepository();
        this.parkingLotRepository = new ParkingLotRepository();
        this.parkingRequestRepository = new ParkingRequestRepository();
        this.userRepository = new UserRepository();
        this.ruleCombinationRepository = new RuleCombinationRepository();
        schedule.scheduleJob('*/1 * * * *', () => {
            this.allotmentExecuter();
        });
        schedule.scheduleJob('*/1 * * * *', () => {
            this.cancelBooking();
        });
        //this.createMasterData();
    }

    public createParkingData(parking: ParkingLot, callback: (error: any, response: any) => void) {
        this.parkingLotRepository.create(parking, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }

    public getParkingById(parkingId: any, callback: (error: any, response: any) => void) {
        this.parkingLotRepository.retrieveById(parkingId, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }

    public getParkingByUserId(userId: any, callback: (error: any, response: any) => void) {
        let query = { members: { $in: [ userId ] } };
        this.parkingLotRepository.retrieveWithPopulate(query, 'members', (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }

    public getAllParkingData(callback: (error: any, response: any) => void) {
        this.parkingLotRepository.retrieveWithPopulate({}, 'members', (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }

    public updateParkingData(parkingId: any, updatedParking: ParkingLot, callback: (error: any, response: any) => void) {
        const updateQuery = { _id : parkingId };
        this.parkingLotRepository.update(updateQuery, updatedParking, {new: true}, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }

    public deleteParkingById(parkingId: any, callback: (error: any, response: any) => void) {
        const updateQuery = { _id : parkingId };
        this.parkingLotRepository.deleteById(updateQuery, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }

    public getParkingSlotByStatus(status: boolean, callback: (error: any, response: any) => void) {
        this.parkingLotRepository.retrieveWithPopulate({isReserved : status}, 'members', (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                callback(null, result);
            }
        });
    }

    public allotmentRequest(user: any, callback: (error: any, response: any) => void) {
        let searchQuery = { userID : user};
        this.userRepository.retrieveOne(searchQuery, (error, result) => {
            if (error) {
                callback(error, null);
            } else {
                let parkingRequest : any = {
                    "userID": user,
                    "parkingID": "001",
                    "reservationPeriority": result.reservationPeriority,
                    "requestTime": Date.now(),
                    "isProcessed": false
                };
                this.parkingLotRepository.retrieveOne({"allotedTo": user, "parkingID": "001"}, (bookingerror, bokingresult) => {
                    if (bokingresult) {
                        console.log("Booking Exist");
                        callback("Booking Exist", null);
                    } else {
                        this.parkingRequestRepository.retrieveOne({"userID": user, "parkingID": "001", "isProcessed" : false}, (existerror, existresult) => {
                            if (existresult) {
                                console.log("Request already exist");
                                callback("Request already exist", null);
                            } else {
                                this.parkingRequestRepository.create(parkingRequest, (reqerror, reqresult) => {
                                    if (reqerror) {
                                        callback(reqerror, null);
                                    } else {
                                        console.log("request created");
                                        callback(null, reqresult);
                                    }
                                });
                            }
                        });
                    }
              });
                 //callback(null, reqresult);
            }
        });
        
    }

    public allotmentExecuter() {
        //Select Request sorted on time and reservation periority
        let eligibleRequestQuery = { "parkingID" : "001", "isProcessed" : false};
        let option = {"requestTime": 1, "reservationPeriority": -1};
        this.parkingRequestRepository.retrieveTop(eligibleRequestQuery, option, (error, requestData) => {
            if (error) {
                console.log(error);
            } else {
                console.log(requestData);
                //Check parking current status
                if(requestData.length > 0) {
                    let defaultParking = {"parkingID" : requestData[0]._doc.parkingID};
                    this.parkingRepository.retrieveOne(defaultParking, (parkingerror, parkingData) => {
                        if (parkingerror) {
                            console.log(parkingerror);
                        } else {
                            //Selct appropriated rule for user and current parking position
                            let ruleQuery = {
                                "reserveThreshold" : parkingData.thresholdStatus,
                                "reserveEligiblity" : requestData.reservationPeriority = 0 ?  false : true,
                                "reserveAvailiblity": parkingData.reserveAvailiblity = 0 ? false : true,
                            };
                            this.ruleCombinationRepository.retrieveOne(ruleQuery, (ruleerror, ruleData) => {
                                if (ruleerror) {
                                    console.log(ruleerror);
                                } else {
                                    //Allot one reserve or un reserved depending on rule
                                    let slotQuery = {
                                        "parkingID": requestData[0]._doc.parkingID,
                                        "isReserved": ruleData.reserveAllotment,
                                        "status": "AVAILABLE"
                                    };
                                    let updateData = {
                                        "allotedTo": requestData[0]._doc.userID,
                                        "status": "BOOKED",
                                        "bootkedUpTo": Date.now() + ruleData.bufferTime * 60000
                                    };
                                    this.parkingLotRepository.update(slotQuery, updateData, null, (sloterror, slotData) => {
                                        if (sloterror) {
                                             console.log(sloterror);
                                         } else {
                                             this.parkingRequestRepository.update({"_id" : requestData[0]._doc._id}, {"isProcessed" : true}, null, (prError, prData) => {});
                                             //Update parking status
                                            let parkingQuery = {"parkingID" : requestData[0]._doc.parkingID};
                                            let updateParking = {
                                                "totalAvailable" : parkingData.totalAvailable -1,
                                                "reservedAvailable" : ruleData.reserveAllotment ? parkingData.reservedAvailable : parkingData.reservedAvailable -1,
                                                "thresholdStatus" : parkingData.capacity/2 > parkingData.totalAvailable
                                            };
                                            this.parkingRepository.update(parkingQuery, updateParking, null, (updateerror, pData) => {
                                                if (sloterror) {
                                                    console.log(updateerror);
                                                } else {
                                                    console.log("ParkingDataUpdated");
                                                }
                                            });
            
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            }
        });

    }

    public cancelBooking() {
        let expiredBooking : any = {
            "bootkedUpTo" : {$lte : Date.now()},
            "status" : "BOOKED"
        };
        let resetBooking : any = {
            "bootkedUpTo" : "",
            "status" : "AVAILABLE",
            "allotedTo" : ""
        };
        this.parkingLotRepository.update(expiredBooking, resetBooking, null, (error, result) => {
            if (error) {
                console.log(error);
            } else {
                console.log("Booking Reset", result);
            }
        });
    }

    public createMasterData() {
        let parkingLotData : any = {
            "parkingID" : "001",
            "parkingLotID" : "0",
            "status" : "AVAILABLE",
            "isReserved": true
        };
        for (let index = 10; index < 110; index++) {
            parkingLotData.parkingLotID = "0" + index;
            parkingLotData.isReserved = index/50 < 1;
            this.parkingLotRepository.create(parkingLotData, (reqerror, reqresult) => {});
            
        }
    }

}

Object.seal(ParkingService);
export = ParkingService;
