const UAParser = require("ua-parser-js");
const LoginHistory = require("../Model/LoginHistory");

const User = require("../Model/User");

exports.forgotPassword = async (req, res) => {

  try {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const today = new Date().toDateString();

    if (
      user.lastPasswordReset &&
      new Date(user.lastPasswordReset).toDateString() === today
    ) {
      return res.status(400).json({
        message: "You can use this option only once per day"
      });
    }

    function generatePassword(length = 8) {

      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

      let password = "";

      for (let i = 0; i < length; i++) {

        password += chars.charAt(
          Math.floor(Math.random() * chars.length)
        );

      }

      return password;
    }

    const newPassword = generatePassword();

    user.password = newPassword;

    user.lastPasswordReset = new Date();

    await user.save();

    res.json({
      message: "Password reset successful",
      newPassword
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });

  }
};