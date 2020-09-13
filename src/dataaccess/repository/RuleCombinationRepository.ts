import RuleCombinationSchema = require("../schemas/ruleCombinationSchema");
import RuleCombination = require("./../mongoose/RuleCombination");

import RepositoryBase = require("./base/repository.base");

class RuleCombinationRepository extends RepositoryBase<RuleCombination> {

  constructor() {
    super(RuleCombinationSchema);
  }

}

Object.seal(RuleCombinationRepository);
export = RuleCombinationRepository;
