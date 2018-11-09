const async = require('async')

module.exports = (req, res, next) => {
  if (req.$injection.staff) {
    next()
  } else {
    next(new Error('Login as Staff is required.'))
  }
}
