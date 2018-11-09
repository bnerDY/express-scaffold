const cacheService = require("../../runtime/cacheService");

/**
 * @module biz/cacheResult
 * @since 1.0.0
 */

module.exports.get = {
  method: "get",
  middlewares: [
    (req, res, next) => {
      const { key } = req.query;
      let cache = cacheService.getCache(key);
      res.$locals.writeData({ ...cache });
      next();
    }
  ]
};

/**
 * @since 1.0.0
 * @static
 * @method getAll
 * @description get
 */
module.exports.getAll = {
  method: "get",
  middlewares: [
    (req, res, next) => {
      res.$locals.writeData({ cache: cacheService.getAllCache() });
      next();
    }
  ]
};

/**
 * @since 1.0.0
 * @static
 * @method insert
 * @description post
 */
module.exports.insert = {
  method: "post",
  middlewares: [
    (req, res, next) => {
      cacheService.insertCache(req.body.key, req.body.value);
      res.$locals.writeData({
        success: true
      });
      next();
    }
  ]
};

/**
 * @since 1.0.0
 * @static
 * @method find
 * @description get
 */
module.exports.find = {
  method: "get",
  middlewares: [
    (req, res, next) => {
      const { key, search } = req.query;
      let cache = cacheService.getCache(key);
      let output = [];
      let keySearch = search.split(" ");
      for (let item of cache.data.metrics) {
        if (
          keySearch.every(el => {
            return (
              item.id.unique_str.toUpperCase().indexOf(el.toUpperCase()) !== -1
            );
          })
        ) {
          if (output.length < 10) {
            let tmpObj = {};
            tmpObj.id = item.id;
            tmpObj.tags = item.tags;
            output.push(tmpObj);
          }
        }
      }
      res.$locals.writeData({ res: output });
      next();
    }
  ]
};

/**
 * @since 1.0.0
 * @static
 * @method keys
 * @description get
 */
module.exports.keys = {
  method: "get",
  middlewares: [
    (req, res, next) => {
      let keys = cacheService.getAllKeys();
      res.$locals.writeData({ res: keys });
      next();
    }
  ]
};
