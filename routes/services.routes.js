const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/User.model");
const Post = require("../models/Post.model");
const Service = require("../models/Services.model");


//Get all services GET /api/services and Filter

router.get("/services", (req,res,next)=>{
    Service.find(req.query)
    .populate({path:"posts", select: "-user"})
    .then((filteredServices)=>{
        res.json(filteredServices)
    })
    .catch((err) => {
        res.json(err);
      });
})



module.exports = router;