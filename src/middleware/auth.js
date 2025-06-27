export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({
    success: false,
    message: 'Unauthorized: Please log in'
  });
};

export const isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user.isAdmin) {
    return next();
  }
  res.status(403).json({
    success: false,
    message: 'Forbidden: Admin access required'
  });
};

export const isGuildMember = (req, res, next) => {
  if (req.isAuthenticated() && req.user.isGuildMember) {
    return next();
  }
  res.status(403).json({
    success: false,
    message: 'Forbidden: Guild membership required'
  });
};