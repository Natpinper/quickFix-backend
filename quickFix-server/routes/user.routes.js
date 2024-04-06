const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/User.model");
const Services = require("../models/Services.model");
const Post = require("../models/Post.model");

//Create new user POST /api/user

router.post("/user", (req,res,next)=>{
    const {email, password, name, location, rating, postId}= req.body

    User.create({email, password, name, location, rating, posts: postId})
    .then((newUser)=>{
        res.json(newUser);
        console.log(newUser)
    })
    .catch((err) => {
        res.json(err)
      });
})

//Retrieves all users GET /api/user

router.get("/user", (req,res,next)=>{
    User.find()
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
      User.findById(userId)
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

module.exports = router;