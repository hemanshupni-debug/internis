const Resume = require("../Model/Resume");

// ================= CREATE RESUME =================

exports.createResume = async (req, res) => {

  try {

    const {

      fullName,
      qualification,
      experience,
      skills,
      about,
      photo

    } = req.body;

    // TEMP USER

    const userId =
      "665f1b2c8f1a2b3c4d5e6f70";

    // ================= OTP =================

    const otp =
      Math.floor(
        100000 + Math.random() * 900000
      ).toString();

    console.log("OTP =>", otp);

    // ================= SAVE =================

    const resume =
      await Resume.create({

        user: userId,

        fullName,

        qualification,

        experience,

        skills,

        about,

        photo,

        otp
      });

    res.json({

      message:
        "OTP sent successfully",

      resume
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });
  }
};
// ================= VERIFY OTP =================

exports.verifyOtp = async (req, res) => {

  try {

    const {
      resumeId,
      otp
    } = req.body;

    const resume =
      await Resume.findById(resumeId);

    if (!resume) {

      return res.status(404).json({
        message: "Resume not found"
      });
    }

    // ================= CHECK OTP =================

    if (resume.otp !== otp) {

      return res.status(400).json({
        message: "Invalid OTP"
      });
    }

    // ================= VERIFY =================

    resume.otpVerified = true;

    await resume.save();

    res.json({

      message:
        "OTP verified successfully",

      resume
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });
  }
};