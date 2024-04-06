const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const servicesSchema = new Schema(
    {
        category: {
            type: String,
            required: [true, "Select a category."]
        },
        subcategory: {
            type: String,
            required:  [true, "Select a category."]
        },
        posts: [{ type: Schema.Types.ObjectId, ref: "Post" }]
    }
)
 
const Service = model("Service", servicesSchema);

module.exports = Service;