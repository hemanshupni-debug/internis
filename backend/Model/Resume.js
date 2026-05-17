const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  fullName: String,

  qualification: String,

  experience: String,

  skills: String,

  about: String,

  photo: String,

  resumeUrl: String,

  amount: {
    type: Number,
    default: 50
  },

  paymentStatus: {
    type: Boolean,
    default: false
  },

  otp: String,

  otpVerified: {
    type: Boolean,
    default: false
  }

},
{
  timestamps: true
});

module.exports =
  mongoose.model(
    "Resume",
    resumeSchema
  );