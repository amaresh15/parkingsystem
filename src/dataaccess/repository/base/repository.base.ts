import mongoose = require("mongoose");
import IRead = require("./read");
import IWrite = require("./write");

class RepositoryBase<T extends mongoose.Document> implements IRead<T>, IWrite<T> {

  private schemaModel: mongoose.Model<mongoose.Document>;

  constructor(schemaModel: mongoose.Model<mongoose.Document>) {
    this.schemaModel = schemaModel;
  }

  public create(item: T, callback: (error: any, result: any) => void) {
    this.schemaModel.create(item, (error: Error, result: T) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    });

  }

  public retrieve(field: any, callback: (error: any, result: any) => void) {
    this.schemaModel.find(field, (error: Error, result: T) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    });
  }

  public retrieveTop(field: any, option: any, callback: (error: any, result: any) => void) {
    this.schemaModel.find(field, (error: Error, result: T) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    }).sort(option).limit(1);
  }

  public retrieveOne(field: any, callback: (error: any, result: any) => void) {
    this.schemaModel.findOne(field, (error: Error, result: T) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    });
  }
  public retrieveById(useId: any, callback: (error: any, result: any) => void) {
    this.schemaModel.findById(useId, (error: Error, result: T) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    });
  }

  public update(findQuery: any, newObject: any, options: any, callback: (error: any, result: any) => void) {
    this.schemaModel.findOneAndUpdate(findQuery, newObject, options, (error: Error, result: T) => {
      if (error) {
        callback(error, null);
      } else {
        console.log('Updated ::: '+result);
        callback(null, result);
      }
    });
  }

  public updateMany(findQuery: any, newObject: any, options: any, callback: (error: any, result: any) => void) {
    this.schemaModel.updateMany(findQuery, newObject, options, (error: Error, result: T) => {
      if (error) {
        callback(error, null);
      } else {
        console.log('Updated ::: '+result);
        callback(null, result);
      }
    });
  }

  public deleteById(query: any, callback: (error: any, result: any) => void) {
    this.schemaModel.findByIdAndDelete(query, (error: Error, result: T) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    });
  }

  public retrieveWithPopulate(field: any, populateFields: any, callback: (error: any, result: any) => void) {
    this.schemaModel.find(field, (error: Error, result: T) => {
      if (error) {
        callback(error, null);
      } else {
        callback(null, result);
      }
    }).populate(populateFields);
  }

}

export = RepositoryBase;
