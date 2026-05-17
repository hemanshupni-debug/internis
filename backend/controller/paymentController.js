const Razorpay = require("razorpay");
const Subscription = require("../Model/Subscription");

// ================= RAZORPAY INSTANCE =================

const razorpay = new Razorpay({
  key_id: "RAZORPAY_KEY_ID",
  key_secret: "RAZORPAY_SECRET",
});

// ================= CREATE PAYMENT =================

exports.createPayment = async (req, res) => {

  try {

    // ================= TEMP USER =================

    const userId =
      "665f1b2c8f1a2b3c4d5e6f70";

    const plan = "BRONZE";

    // ================= TIME =================

    const hour = new Date().getHours();

    // TEMP COMMENT FOR TESTING

    
    if (hour < 10 || hour >= 11) {

      return res.status(403).json({
        message:
          "Payments allowed only between 10AM and 11AM IST"
      });
    }
    

    // ================= PLAN LOGIC =================

    let amount = 0;

    let internshipLimit = 1;

    if (plan === "BRONZE") {

      amount = 100;

      internshipLimit = 3;
    }

    else if (plan === "SILVER") {

      amount = 300;

      internshipLimit = 5;
    }

    else if (plan === "GOLD") {

      amount = 1000;

      internshipLimit = Infinity;
    }

    // ================= DEMO ORDER =================

    const order = {
      id: "demo_order_id"
    };

    // ================= SAVE SUBSCRIPTION =================

    await Subscription.create({

      user: userId,

      plan,

      internshipLimit,

      amount,

      endDate: new Date(
        Date.now() +
        30 * 24 * 60 * 60 * 1000
      )
    });

    // ================= RESPONSE =================

    res.json({

      message:
        "Payment order created",

      order
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message
    });
  }
};