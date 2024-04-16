const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/User.model");
const Services = require("../models/Services.model");
const Post = require("../models/Post.model");




//Retrieves all users GET /api/user

router.get("/user", (req,res,next)=>{
    User.find().select("-password -email")
    .populate("posts")
    .then((allUsers)=>{
        res.json(allUsers)
    })
    .catch((err) => {
        res.json(err);
      });
})


//Retrieves one user by its GET id /api/user/:userId

router.get("/user/:userId", (req,res,next)=>{
    const {userId} = req.params

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
      }
      User.findById(userId).select("-password -email")
      .populate("posts")
      .then((oneUser) => {
        res.status(200).json(oneUser);
      })
      .catch((err) => {
        res.json(err);
      });
})

//Updates one specific user PUT  /api/user/:userId

router.get("/user/:userId", (req,res,next)=>{
    const {userId} = req.params

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
      }
      User.findByIdAndUpdate(userId, req.body, {new: true})
      .then((updatedUser)=>{
        res.json(updatedUser)
      })
      .catch((err)=>{
        res.json(err)
      })
})

//Deletes user by its id DELETE /api/user/:userId

router.delete("/user/:userId", (req,res,next)=>{
    const {userId} = req.params

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(400).json({ message: "Specified id is not valid" });
        return;
      }
      User.findByIdAndDelete(userId)
      .then(()=>{
        res.json({ message: `User with ${userId} id has been removed succesfully` });
      })
})

//Create a new Post - POST /api/post

router.post("/post", (req, res, next) => {
  const { title, serviceId, description, price, userId } = req.body;

  Post.create({ title, service: serviceId, description, price, user: userId })
    .then((newPost) => {
      Service.findByIdAndUpdate(serviceId, {
        $push: { posts: newPost._id },
      }).then((updatedService) => {
        res.json(newPost);
        console.log(newPost);
      });
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