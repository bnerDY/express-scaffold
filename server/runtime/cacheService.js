const LRU = require("lrucache");
const config = require("../config");

/**
 * Cache Service
 * @since 1.0.0
 * @param {*} next
 */
let cache;

module.exports.init = next => {
  cache = LRU(config.cache);
  next();
};

module.exports.getAllCache = () => {
  return cache.info();
};

module.exports.getAllKeys = () => {
  return cache.keys();
};

module.exports.hasKey = key => {
  return cache.has(key);
};

module.exports.insertCache = (key, value) => {
  cache.set(key, value);
};

module.exports.getCache = key => {
  return cache.get(key);
};

module.exports.resetCache = () => {
  cache.removeAll();
};

module.exports.getStaleKey = () => {
  return cache.staleKey();
};

module.exports.removeKey = key => {
  cache.remove(key);
};
