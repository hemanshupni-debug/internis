const Post = require("../Model/Post"); 

const postLimit = async (req, res, next) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(401).json({ message: "User not authenticated" });
        }

        const friendCount = user.friends.length;

        if (friendCount === 0) {
            return res.status(403).json({ message: "Add friends to create post" });
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const postCount = await Post.countDocuments({
            user: user._id,
            createdAt: { $gte: today }
        });

        if (friendCount === 1 && postCount >= 1) {
            return res.status(403).json({ message: "Limit reached: 1 post per day" });
        }

        if (friendCount === 2 && postCount >= 2) {
            return res.status(403).json({ message: "Limit reached: 2 posts per day" });
        }

        if (friendCount > 10) {
            return next();
        }

        next();

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = postLimit;s