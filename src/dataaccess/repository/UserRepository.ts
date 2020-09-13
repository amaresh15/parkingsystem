import UserSchema = require("../schemas/userSchema");
import User = require("./../mongoose/User");

import RepositoryBase = require("./base/repository.base");

class UserRepository extends RepositoryBase<User> {

  constructor() {
    super(UserSchema);
  }

}

Object.seal(UserRepository);
export = UserRepository;
