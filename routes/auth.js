const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/github', (req, res, next) => {
  console.log('✅ Petición recibida en /auth/github');
  next();
}, passport.authenticate('github', { scope: ['user:email'] }));

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/api-docs');
  }
);

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.json({ message: 'Sesión cerrada correctamente.' });
  });
});

router.get('/status', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ loggedIn: true, user: req.user.username });
  } else {
    res.json({ loggedIn: false });
  }
});

module.exports = router;