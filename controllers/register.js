// controllers/authController.js
const express = require('express');
const passport = require('../services/authentication');
const router = express.Router();

router.post('/register', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
