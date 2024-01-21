const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const DayWiseSchema = new mongoose.Schema(
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    authorEmail: {
      type: String,
      required: true,
    },
    dayWiseWorkout: [{ type: ObjectId, ref: "DataSet" }],
  },
  { timestamps: true }
);

const DayWise = mongoose.model("DayWise", DayWiseSchema);
module.exports = DayWise;
