const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/User.model");
const Services = require("../models/Services.model");
const Post = require("../models/Post.model");
const Service = require("../models/Services.model");


//Get all services GET /api/services

router.get("/services", (req,res,next)=>{
    Service.find()
    .populate("posts")
    .then((allServices)=>{
        res.json(allServices)
    })
    .catch((err) => {
        res.json(err);
      });
})

//Get services based on its category GET /api/services/:category

router.get("/services/category", async (req,res)=>{
   
    const categories= req.query.category ? req.query.category.split(','):[]
    const filteredByCategories = categories.length > 0 ? {category: {$in: categories}}:{}

    Service.find(filteredByCategories)
    .populate('posts')
    .then((categoryServices)=>{
        res.json(categoryServices)
    })
    .catch((err)=>{
        res.json(err)
    })
})

module.exports = router;