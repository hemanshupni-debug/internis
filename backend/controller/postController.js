const Post = require("../Model/Post"); 

// ================= CREATE POST =================
exports.createPost = async (req, res) => {
    try {
        const post = new Post({
            user: req.user._id,          // logged-in user
            content: req.body.content,
            mediaUrl: req.body.mediaUrl
        });

        await post.save();

        res.status(201).json({
            message: "Post created successfully",
            post
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ================= LIKE POST =================
exports.likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // duplicate like avoid
        if (!post.likes.includes(req.user._id)) {
            post.likes.push(req.user._id);
        }

        await post.save();

        res.json({
            message: "Post liked successfully",
            post
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ================= COMMENT POST =================
exports.commentPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        post.comments.push({
            user: req.user._id,
            text: req.body.text
        });

        await post.save();

        res.json({
            message: "Comment added successfully",
            post
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ================= SHARE POST =================
exports.sharePost = async (req, res) => {
    try {
        const originalPost = await Post.findById(req.params.id);

        if (!originalPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        const newPost = new Post({
            user: req.user._id,
            content: originalPost.content,
            mediaUrl: originalPost.mediaUrl
        });

        await newPost.save();

        res.json({
            message: "Post shared successfully",
            newPost
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};