const moment = require("moment");
const momentTz = require("moment-timezone");

module.exports.formatToUnix = time => {
  return new moment(time).format("x");
};

module.exports.isAfter = (t1, t2) => {
  return moment(t1).isAfter(moment(t2));
};
