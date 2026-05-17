const express = require("express");

const router = express.Router();

const {

  createResume,
  verifyOtp

} = require("../controller/resumeController");

// ================= CREATE RESUME =================

router.post(
  "/create",
  createResume
);

// ================= VERIFY OTP =================

router.post(
  "/verify-otp",
  verifyOtp
);

module.exports = router;