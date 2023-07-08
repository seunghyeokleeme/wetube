export const locals = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Devtube";
  res.locals.loggedInUser = req.session.user ?? {};
  next();
};
