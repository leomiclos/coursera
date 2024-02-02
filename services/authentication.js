// services/authentication.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const { comparePasswords } = require('./encryption');

passport.use(new LocalStrategy(
  async function (username, password, done) {
    try {
      const user = await User.findOne({ where: { username: username } });

      if (!user) {
        return done(null, false, { message: 'Usuário não existe' });
      }

      const passwordMatch = await comparePasswords(password, user.password);

      if (!passwordMatch) {
        return done(null, false, { message: 'Senha incorreta' });
      }

      return done(null, user);  
    } catch (err) {
      return done(err);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
