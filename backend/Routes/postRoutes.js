const express = require("express");
const router = express.Router();

const {
    createPost,
    likePost,
    commentPost,
    sharePost
} = require("../controller/postController");

const postLimit = require("../middleware/postLimit");

// ================= ROUTES =================

// CREATE POST
router.post("/", postLimit, createPost);

// LIKE POST
router.post("/like/:id", likePost);

// COMMENT POST
router.post("/comment/:id", commentPost);

// SHARE POST
router.post("/share/:id", sharePost);

module.exports = router;