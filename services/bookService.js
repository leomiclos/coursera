// services/bookService.js
const Book = require('../models/book');

async function getAllBooks() {
  try {
    const books = await Book.findAll();
    return books;
  } catch (error) {
    throw error;
  }
}

async function addBook(title, isbn, author, review) {
    try {
      const book = await Book.create({ 
        title: title,
        isbn: isbn,
        author: author,
        review: review
      });
      return book;
    } catch (error) {
      throw error;
    }
  }

async function getBookByISBN(isbn) {
  try {
    const book = await Book.findOne({ where: { isbn: isbn } });
    return book;
  } catch (error) {
    throw error;
  }
}

async function getBooksByAuthor(author) {
  try {
    const books = await Book.findAll({ where: { author: author } });
    return books;
  } catch (error) {
    throw error;
  }
}

async function getBooksByReview(review) {
  try {
    const books = await Book.findAll({
      where: {
        review: {
          [Op.like]: `%${review}%`
        }
      }
    });
    return books;
  } catch (error) {
    throw error;
  }
}

async function addReview(bookId, review) {
    try {
      const book = await Book.findByPk(bookId);
      
      if (!book) {
        throw new Error('Book not found');
      }
  
      book.review = review;
      await book.save();
  
      return book;
    } catch (error) {
      throw error;
    }
  }
  
  async function modifyReview(bookId, newReview) {
    try {
      const book = await Book.findByPk(bookId);
      
      if (!book) {
        throw new Error('Book not found');
      }
  
      book.review = newReview;
      await book.save();
  
      return book;
    } catch (error) {
      throw error;
    }
  }

module.exports = {
  getAllBooks,
  getBookByISBN,
  getBooksByAuthor,
  getBooksByReview,
  addBook,
  modifyReview,
  addReview
};
