const mongoose = require("mongoose");

//define schema for user data
const DSetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const DataSet = mongoose.model("DataSet", DSetSchema);
module.exports = DataSet;
