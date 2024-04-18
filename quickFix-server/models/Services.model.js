const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const servicesSchema = new Schema({
  category: {
    type: String,
    enum: ["Childcare", "Pets", "Property & Maintenance", "Health & Beauty", "Motoring", "Tuition & Classes"],
    required: [true, "Select a category."],
  },
  subcategory: {
    type: String,
    enum:["Nannies", "Babysitting", "Petsitting", "Training", "Vets", "Cleaners", "Housekeepers", "Interior Design", "TV & Internet connection","Plumber", "Carpenter","Electrician", "Rubbish removal", "House renovation", "Gardener", "Painter", "Massages", "Hairdressing", "Beauty treatments", "Personal trainer", "Make Up Artist", "Nail care", "Nutrition", "Car repair and Mechanical services", "Car wash", "MOT Testing", "Language", "Music", "Driving lessons", "Academic"],
    required: [true, "Select a category."],
  },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
});

const Service = model("Service", servicesSchema);

module.exports = Service;
