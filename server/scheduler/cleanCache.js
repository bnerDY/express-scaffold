const schedule = require("node-schedule");
const logger = require("../logger");
const cacheService = require("../runtime/cacheService");
const HttpClient = require("../http/HttpClient");
const config = require("../config");

/**
 * @since 1.0.0
 * @module scheduler/cleanCache
 * @description cache clean schedule
 */
module.exports.schedule = () => {
  schedule.scheduleJob("0 0 0 0 0 *", cleanAllCache);
  schedule.scheduleJob("0 0 0 * * *", updateCache);
  schedule.scheduleJob("0 0 0 * * *", seriesStaleCacheClean);
};

/**
 * @since 1.0.0
 * @description Clean all cache data.
 */
const cleanAllCache = () => {
  logger.info("Start Clean All cache.");
  cacheService.resetCache();
};

/**
 * @since 1.0.0
 * @description Clean chart series data.
 */
const seriesStaleCacheClean = () => {
  logger.info("Start clean series stale cache.");
  let key = cacheService.getStaleKey();
  if (key && key.indexOf("seriesData") > -1) {
    cacheService.removeKey(key);
  }
  logger.info(`Clean series ${key} finished`);
};

/**
 * @since 1.0.0
 * @description Update meta cache data.
 */
const updateCache = async () => {
  logger.info("Start Update cache.");
  let keyList = cacheService.getAllKeys();
  for (let key of keyList) {
    if (key.indexOf("getMeta") > -1) {
      let cache = cacheService.getCache(key);
      try {
        const data = await HttpClient.post(
          config.metric.url + "metrics",
          cache.query
        );
        if (data) {
          let cacheResult = {
            query: cache.query,
            data: data
          };
          cacheService.insertCache(key, cacheResult);
          logger.info(`Update ${key} finished`);
        }
      } catch (e) {
        logger.error(e);
      }
    }
    // if (key.indexOf("seriesData")) {
    //   let cache = cacheService.getCache(key);
    //   try {
    //     const data = await HttpClient.post(
    //       config.metric.url + "series",
    //       cache.query
    //     );
    //     if (data) {
    //       let cacheResult = {
    //         query: cache.query,
    //         data: data
    //       };
    //       cacheService.insertCache(key, cacheResult);
    //       logger.info(`Update ${key} finished`);
    //     }
    //   } catch (e) {
    //     logger.error(e);
    //   }
    // }
  }
  logger.info("Finish Update cache.");
};
