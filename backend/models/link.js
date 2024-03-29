const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema(
  {
    createdAt: { type: Date, expires: 172800, default: Date.now },
    originalURL: {
      type: String,
      required: true,
    },
    shortURL: {
      type: String,
      required: true,
      unique: true,
    },
    code: {
      type: String,
      require: true,
      unique: true,
    },
    visited: {
      type: Number,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Link = mongoose.model("Link", linkSchema);

module.exports = Link;
