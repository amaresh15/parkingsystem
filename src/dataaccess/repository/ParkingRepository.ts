import ParkingSchema = require("../schemas/parkingSchema");
import Parking = require("./../mongoose/Parking");

import RepositoryBase = require("./base/repository.base");

class ParkingRepository extends RepositoryBase<Parking> {

  constructor() {
    super(ParkingSchema);
  }

}

Object.seal(ParkingRepository);
export = ParkingRepository;
