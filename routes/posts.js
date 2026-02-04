const express = require("express");
const Post = require("../models/Post");
const User = require("../models/User");  
const router = express.Router();

// Create A Post
router.post("/create", async (req, res) => {
  try {
    const {username,text} = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });
    const newPost = new Post({
      user: user._id,
      text ,
      });

    await newPost.save();
    res.status(201).json({
      message: "Post created successfully",
      
    });
  } catch (error) {
    console.error("Create Post Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});
// Display all posts
router.get("/feed", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username");

    res.json(
      posts.map((p) => ({
        _id: p._id,
        username: p.user.username,
        text: p.text,
       
       likes: p.likes.length,
        comments: p.comments.length,
        commentsData: p.comments.map((c) => ({
          username: c.user.username,
          text: c.text,
        })),
       
      }))
    );
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


  // LIKE POST 
  router.put("/like/:id", async (req, res) => {
    try {
      const { username } = req.body;   
      const user = await User.findOne({ username });
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ message: "Post not found" });
  
      
      const alreadyLiked = post.likes.some(
        (id) => id.equals(user._id)
      );
      if (!alreadyLiked) {
        post.likes.push(user._id);
        await post.save();
      }
  
      res.json({ message: "Post liked" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  });
  
//Add a comment 
router.post("/comment/:id", async (req, res) => {
  try {
    const { username, text } = req.body; 
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const post = await Post.findById(req.params.id)
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.comments.push({
      user: user._id,
      text,
    });

    await post.save();
    res.json({ message: "Comment added" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


  module.exports = router;
  
