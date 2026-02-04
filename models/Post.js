const mongoose = require("mongoose");
// Post
const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  text: {
    type: String,
    default: ""
  },

  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: []
  },

  comments: {
    type: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        text: {
          type: String,
          required: true
        },
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    default: []
  }

}, );

module.exports = mongoose.model("Post", PostSchema);
