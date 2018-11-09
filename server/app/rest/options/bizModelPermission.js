const User = require("../../../models/user");

/**
 * @static contentxt filter and deletion control.
 * @since 1.0.0
 * @param {*} staffFilter
 * @param {*} nonStaffFilter
 */
module.exports = (staffFilter, nonStaffFilter) => {
  return {
    // contextFilter: (model, req, done) => {
    //   if (req.$session.getStaffRef()) {
    //     if (staffFilter) {
    //       model = staffFilter(model, req);
    //     }
    //     return done(model);
    //   } else {
    //     if (nonStaffFilter) {
    //       model = nonStaffFilter(model, req);
    //     }
    //     return done(
    //       model.find({
    //         userRef: req.$session.getUserRef()
    //       })
    //     );
    //   }
    // },
    preDelete: (req, res, next) => {
      User.findOne(req.user, (err, item) => {
        if (item) {
          next();
        } else {
          next(new Error("Not allowed deletion on Stranger!"));
        }
      });
    },
    postDelete: (req, res, next) => {
      res.json({ delete: true });
    }
  };
};
