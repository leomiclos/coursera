// app.js
const express = require('express');
const session = require('express-session');
const passport = require('./services/authentication');
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const bookController = require('./controllers/bookController');
const reviewController = require('./controllers/reviewController'); // Adicionado

const User = require('./models/user');
const Book = require('./models/book');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authController);
app.use('/user', userController);
app.use('/book', bookController);
app.use('/review', reviewController); // Adicionado


app.get('/', (req, res) => {
  res.send('Home Page');
});

app.get('/dashboard', isAuthenticated, (req, res) => {
  res.send('Dashboard Page');
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


User.sync().then(() => {
    console.log('Database connected successfully!');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});
