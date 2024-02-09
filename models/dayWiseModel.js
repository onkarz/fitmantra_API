const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const DayWiseSchema = new mongoose.Schema(
  {
    authorId: {
      type: String,
      required: true,
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
