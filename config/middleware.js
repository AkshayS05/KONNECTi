module.exports.setFlash = function (req, res, next) {
  // find out the flash in the req and set in up in to the locals
  res.locals.flash = {
    success: req.flash('success'),
    error: req.flash('error'),
  };
  next();
};
