const async = require("async"),
  _ = require("lodash");

// permisssions control on business models.
const bizModelPermission = require("./options/bizModelPermission");
const masterModelPermission = require("./options/masterModelPermission");

const _mergeOptions = (...optionsArr) => {
  const merged = {};
  optionsArr.forEach(options => {
    for (let key in options) {
      let value = options[key];
      if (key.indexOf("pre") === 0 || key.indexOf("post") === 0) {
        merged[key] = merged[key] || [];
        merged[key].push(value);
      } else {
        merged[key] = value;
      }
    }
  });
  for (let key in merged) {
    let value = merged[key];
    if (key.indexOf("pre") === 0 || key.indexOf("post") === 0) {
      (() => {
        merged[key] = (req, res, next) => {
          async.series(
            value.map(middleware => {
              return next => {
                middleware(req, res, next);
              };
            }),
            next
          );
        };
      })(value);
    }
  }
  return merged;
};

/**
 * @description export related interfaces by model. Add relavant model permission.
 * @since 1.0.0
 * @returns restful interfaces by models
 */
module.exports = {
  user: {
    model: require("../../models/user"),
    options: _mergeOptions(bizModelPermission())
  },
  script: {
    model: require("../../models/script"),
    options: _mergeOptions(bizModelPermission())
  },
  alert: {
    model: require("../../models/alert"),
    options: _mergeOptions(bizModelPermission())
  },
  favourite: {
    model: require("../../models/favourite"),
    options: _mergeOptions(bizModelPermission())
  },
  chart: {
    model: require("../../models/chart"),
    options: _mergeOptions(bizModelPermission())
  },
  application: {
    model: require("../../models/application"),
    options: _mergeOptions(bizModelPermission())
  },
  metric: {
    model: require("../../models/metric"),
    options: _mergeOptions(bizModelPermission())
  }
};
