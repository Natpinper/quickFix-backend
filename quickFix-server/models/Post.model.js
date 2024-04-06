const mongoose = require("mongoose");
const { Schema, model } = mongoose;


const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            min: 0,
        },
        user: {type: Schema.Types.ObjectId, ref: "User"}
    }
)

const Post = model("Post", postSchema);

module.exports = Post;