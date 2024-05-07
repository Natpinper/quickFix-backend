const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/User.model");
const Services = require("../models/Services.model");
const Post = require("../models/Post.model");


const fileUploader = require("../config/cloudinary.config")
//Creates a new User POST /api/user

router.post("/user", (req, res, next) => {
  const { email, password, name, location, imageUrl } = req.body;

  User.create({ email, password, name, location, imageUrl })
    .then((newUser) => {
      res.json(newUser);
      console.log(newUser);
    })
    .catch((err) => {
      res.json(err);
    });
});

// POST "/api/upload" => Route that receives the image, sends it to Cloudinary via the fileUploader and returns the image URL
router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
  // console.log("file is: ", req.file)
 
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  
  // Get the URL of the uploaded file and send it as a response.
  // 'fileUrl' can be any name, just make sure you remember to use the same when accessing it on the frontend
  
  res.json({ fileUrl: req.file.path });
});
//Retrieves all users GET /api/user

router.get("/user", (req, res, next) => {
  User.find()
    .select("-password -email")
    .populate("posts")
    .then((allUsers) => {
      res.json(allUsers);
    })
    .catch((err) => {
      res.json(err);
    });
});

//Retrieves one user by its id GET /api/user/:userId

router.get("/user/:userId", (req, res, next) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  User.findById(userId)
    .select("-password")
    .populate({path:"posts", populate: {path: "service"}})
    .then((oneUser) => {
      res.status(200).json(oneUser);
      console.log(oneUser);
    })
    .catch((err) => {
      res.json(err);
    });
});

//Updates one specific user PUT  /api/user/:userId

router.put("/user/:userId", (req, res, next) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  User.findByIdAndUpdate(userId, req.body, { new: true })
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      res.json(err);
    });
});

//Deletes user by its id DELETE /api/user/:userId

router.delete("/user/:userId", (req, res, next) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  User.findByIdAndDelete(userId).then(() => {
    res.json({
      message: `User with ${userId} id has been removed succesfully`,
    });
  });
});

module.exports = router;

//User profile GET  a post /:userId/profile/posts/:postId

router.get("/:userId/profile/posts/:postId", (req,res,next)=>{
  const { postId } = req.params
  if (!mongoose.Types.ObjectId.isValid(postId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Post.findById(postId)
  .populate({ path: "service", select: "-posts" })
  .then((onePost) => {
    res.status(200).json(onePost);
  })
  .catch((err) => {
    res.json(err);
  });
})