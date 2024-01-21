const mongoose = require("mongoose");

//define schema for user data
const PreferenceSchema = new mongoose.Schema(
  {
    userId: String,
    checkboxValues: [String],
  },
  { timestamps: true }
);

const Preference = mongoose.model("Preference", PreferenceSchema);
module.exports = Preference;
