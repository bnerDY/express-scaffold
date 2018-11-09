const mongoose = require("mongoose");
const async = require("async");

mongoose.Promise = Promise;

const config = require("../config");
/**
 * @static init db runtime.
 * @since 1.0.0
 * @param {*} next
 */
module.exports.init = next => {
  const db = config.db;
  const url = `mongodb://${db.url}:${db.port}/${db.schema}`;
  console.log("DB started at:" + url);
  module.exports.url = url;

  mongoose.connect(
    url,
    {
      server: {
        poolSize: db.poolSize,
        socketOptions: {
          keepAlive: 256
        }
      }
    },
    next
  );
};
