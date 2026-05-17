const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  plan: {
    type: String,
    enum: [
      "FREE",
      "BRONZE",
      "SILVER",
      "GOLD"
    ],
    default: "FREE",
  },

  internshipLimit: {
    type: Number,
    default: 1,
  },

  usedApplications: {
    type: Number,
    default: 0,
  },

  amount: {
    type: Number,
    default: 0,
  },

  startDate: {
    type: Date,
    default: Date.now,
  },

  endDate: {
    type: Date,
  },

},
{
  timestamps: true
});

module.exports = mongoose.model(
  "Subscription",
  subscriptionSchema
);