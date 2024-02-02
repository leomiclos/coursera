// models/book.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isbn: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  review: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

Book.sync();

module.exports = Book;
