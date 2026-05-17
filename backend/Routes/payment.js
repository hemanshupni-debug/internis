const express = require("express");

const router = express.Router();

const {
  createPayment
} = require("../controller/paymentController");

// TEST ROUTE

router.get(
  "/create-payment",
  createPayment
);

module.exports = router;