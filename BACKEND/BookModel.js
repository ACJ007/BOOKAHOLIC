const mongoose = require("mongoose");

const { Schema } = mongoose;

const bookSchema = new Schema({
  isbn: {
    type: String,
    unique: true,
    required: true,
  },
  bookname: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  borrowedBy: [
    {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  pic: {
    type: String,
  },
  publicationYear: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ["Available", "Rented"],
    default: "Available",
  },
});

const bookModel = mongoose.model("books", bookSchema);

module.exports = bookModel;
