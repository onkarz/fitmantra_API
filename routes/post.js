const express = require("express");
const router = express.Router();
const PostModel = require("../models/postModel");

//Get All Posts

router.get("/", async (req, res) => {
  try {
    const posts = await PostModel.find();
    res.status(200).json({
      status: "success",
      posts,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get author posts by his id

router.get("/author/:authorId", async (req, res) => {
  try {
    const post = await PostModel.find({ authorId: req.params.authorId });

    if (!post) {
      return res.status(404).json({
        status: "Failed",
        message: "Post with given Id not found",
      });
    } else {
      res.status(200).json({
        status: "success",
        post,
      });
    }
  } catch (err) {
    throw err;
  }
});

//Create new post

router.post("/", async (req, res) => {
  try {
    const { title, description, postImage } = req.body;
    console.log("Body", req.body);
    let { authorName, authorEmail, authorId } = req.body;

    const post = await PostModel.create({
      title,
      description,
      authorEmail,
      authorName,
      postImage,
      authorId,
    });

    console.log(post);

    //send back response
    res.status(201).json({
      status: "Post created successfully.",
      post,
    });
  } catch (err) {
    throw err;
  }
});

//Update Post

router.put("/:postId", async (req, res) => {
  try {
    const post = await PostModel.findByIdAndUpdate(
      req.params.postId,
      req.body,
      {
        new: true,
      }
    );
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json({
      status: "Post Updated Successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({ error: "Unable to update post" });
  }
});

//get post by its Id
router.get("/:postId", async (req, res) => {
  try {
    const post = await PostModel.findById({ _id: req.params.postId });

    if (!post) {
      return res.status(404).json({
        status: "Failed",
        message: "Post with given Id not found",
      });
    } else {
      res.status(200).json({
        status: "success",
        post,
      });
    }
  } catch (err) {
    throw err;
  }
});

// Delete post by its Id
router.delete("/:postId", async (req, res) => {
  try {
    const post = await PostModel.findByIdAndRemove(req.params.postId);

    if (!post)
      return res.status(404).json({
        status: "Fail",
        message: "Post with given Id not found",
      });

    //return deleted post
    res.status(200).json({
      status: "success",
      message: "Post deleted successfully",
    });
  } catch (err) {
    throw err;
  }
});


router.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
   });


module.exports = router;