import ParkingLotSchema = require("../schemas/parkingLotSchema");
import ParkingLot = require("./../mongoose/ParkingLot");

import RepositoryBase = require("./base/repository.base");

class ParkingLotRepository extends RepositoryBase<ParkingLot> {

  constructor() {
    super(ParkingLotSchema);
  }

}

Object.seal(ParkingLotRepository);
export = ParkingLotRepository;
