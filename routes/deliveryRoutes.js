// routes/deliveryRoutes.js
const express = require("express");
const router = express.Router();

// Dummy delivery slots (later use DB to fetch dynamically)
const deliverySchedule = {
  "2025-04-01": ["6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM"],
  "2025-04-02": ["5:30 PM", "6:00 PM", "7:00 PM"],
};

router.get("/slots", (req, res) => {
  const date = req.query.date;
  const slots = deliverySchedule[date] || [];
  res.json(slots);
});

module.exports = router;
