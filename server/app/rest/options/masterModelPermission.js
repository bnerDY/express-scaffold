const preWrite = function(req, res, next) {
  if (req.$session.getStaffRef()) {
    next();
  } else {
    next(new Error("authentication failed"));
  }
};

module.exports = options => {
  if (options && options.allowCreation) {
    return {
      preUpdate: preWrite,
      preDelete: preWrite
    };
  } else {
    return {
      preCreate: preWrite,
      preUpdate: preWrite,
      preDelete: preWrite
    };
  }
};
