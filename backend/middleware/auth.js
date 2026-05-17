const jwt = require("jsonwebtoken");
const User = require("../Model/User");

const auth = async (req, res, next) => {
  try {

    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({
        message: "No token found"
      });
    }

    const decoded = jwt.verify(token, "SECRET_KEY");

    // ================= ADMIN CHECK =================

    if (decoded.name === "Admin") {

      req.user = {
        _id: decoded.id,
        name: "Admin"
      };

      return next();
    }

    // ================= NORMAL USER =================

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    req.user = user;

    next();

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

module.exports = auth;