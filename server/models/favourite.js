const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const collectionTypes = require("./enum/collectionTypes");

/**
 * @class models/favourite
 * @since 1.0.0
 * @description favourite model for spider.
 */
let schema = Schema(
  {
    sourceRef: { type: Schema.Types.ObjectId, ref: "user" },
    targetRef: { type: Schema.Types.ObjectId, refPath: "targetCollection" }, // _id of chart/alert/report
    targetCollection: String // chart/alert/application/
  },
  {
    timestamps: true
  }
);

schema.pre("save", next => {
  this.targetCollection = collectionTypes.toCollectionName(
    this.targetCollection
  );
  next();
});

module.exports = mongoose.model("favourite", schema);
