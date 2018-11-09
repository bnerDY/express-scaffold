const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * @class models/user
 * @since 1.0.0
 * @description user config for spider.
 */
let schema = Schema(
  {
    displayName: String,
    mail: String,
    department: String,
    title: String,
    username: String,
    memberOf: [String],
    isSuperUser: Boolean,
    isAdmin: Boolean
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("user", schema);
