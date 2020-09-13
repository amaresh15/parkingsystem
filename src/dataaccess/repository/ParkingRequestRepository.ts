import ParkingRequestSchema = require("../schemas/parkingRequestSchema");
import ParkingRequest = require("./../mongoose/ParkingRequest");

import RepositoryBase = require("./base/repository.base");

class ParkingRequestRepository extends RepositoryBase<ParkingRequest> {

  constructor() {
    super(ParkingRequestSchema);
  }

}

Object.seal(ParkingRequestRepository);
export = ParkingRequestRepository;
