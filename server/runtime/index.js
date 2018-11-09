const async = require("async");
const db = require("./db");
const cacheService = require("./cacheService");
/**
 * @description runtime parallel instances.
 * @since 1.0.0
 * @param {*} next
 */
module.exports.init = next => {
  async.parallel([db.init, cacheService.init], next);
};
