const mongoose = require("mongoose");

const loginHistorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    browser: String,

    os: String,

    device: String,

    ipAddress: String,

    loginTime: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "LoginHistory",
  loginHistorySchema
);