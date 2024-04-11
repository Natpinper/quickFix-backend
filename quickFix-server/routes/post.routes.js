const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/User.model");
const Service = require("../models/Services.model");
const Post = require("../models/Post.model");



// Retrieves all posts  GET /api/post

router.get("/post", (req, res, next) => {
  Post.find()
    .populate("user")
    .then((allPosts) => {
      res.json(allPosts);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Retrieves one specific post by its id GET /api/post/:postId

router.get("/post/:postId", (req, res, next) => {
  const { postId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Post.findById(postId)
    .populate("user")
    .then((onePost) => {
      res.status(200).json(onePost);
    })
    .catch((err) => {
      res.json(err);
    });
});

//Updates one specific post PUT /api/post/:postId

router.put("/post/:postId", (req, res, next) => {
  const { postId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Post.findByIdAndUpdate(postId, req.body, { new: true })
    .then((updatedPost) => {
      res.json(updatedPost);
    })
    .catch((err) => {
      res.json(err);
    });
});

//Deletes a specific post by its id DELETE /api/post/:postId

router.delete("/post/:postId", (req, res, next) => {
  const { postId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Post.findByIdAndDelete(postId)
    .then(() => {
      res.json({
        message: `Post with ${postId} id has been removed succesfully`,
      });
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
