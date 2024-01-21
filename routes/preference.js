const express = require("express");
const router = express.Router();
const preferenceModel = require("../models/preferenceModel");

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const preferences = await preferenceModel.findOne({ userId });
  res.json(preferences || { checkboxValues: [] });
});

// Save or update user preferences
router.post("/:userId", async (req, res) => {
  const userId = req.params.userId;
  const { checkboxValues } = req.body;

  let preferences = await preferenceModel.findOne({ userId });

  if (!preferences) {
    preferences = new preferenceModel({ userId, checkboxValues });
  } else {
    preferences.checkboxValues = checkboxValues;
  }

  await preferences.save();
  res.json(preferences);
});


module.exports = router;
  