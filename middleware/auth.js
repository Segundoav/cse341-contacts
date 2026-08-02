const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'No autorizado. Debes iniciar sesión primero.' });
};

module.exports = isAuthenticated;