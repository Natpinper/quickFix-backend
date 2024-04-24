const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required."],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
  name: {
    type: String,
    required: [true, "Name is required."],
  },
  location: {
    type: String,
  },
  rating: {
    type: Number,
    min: 0,
  },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});

const User = model("User", userSchema);

module.exports = User;