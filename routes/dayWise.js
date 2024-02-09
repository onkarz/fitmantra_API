const express = require("express");
const router = express.Router();
const dayWiseModel = require("../models/dayWiseModel");

//Get All dayWise

// router.get("/", async (req, res) => {
//   try {
//     const dataSets = await dayWiseModel.find();
//     res.status(200).json({
//       status: "success",
//       dataSets,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// get author daywise workout details by his id

router.get("/author/:authorId", async (req, res) => {
  try {
    const { authorId } = req.body;

    const dayWise = await dayWiseModel.find({ authorId: req.params.authorId });
    
    if (!dayWise) {
      return res.status(404).json({
        status: "Failed",
        message: "Day Wise Workout with given Id is not found",
      });
    } else {
      res.status(200).json({
        status: "success",
        dayWise,      
      });
    }
  } catch (err) {
    throw err;
  }
});

//Create new Daywise Workout Report

router.post("/", async (req, res) => {
  try {
    const { authorId, authorEmail, dayWiseWorkout } = req.body;

    console.log("Body", req.body);

    const dayWiseWorkoutDetails = await dayWiseModel.create({
      authorId,
      authorEmail,
      dayWiseWorkout,
    });

    console.log(dayWiseWorkoutDetails);

    //send back response
    res.status(201).json({
      status: "DataWise Workout created successfully.",
      dayWiseWorkoutDetails,
    });
  } catch (err) {
    throw err;
  }
});

//Update dataSet

// router.put("/:dataSetId", async (req, res) => {
//   try {
//     const dataSet = await dataSetModel.findByIdAndUpdate(
//       req.params.dataSetId,
//       req.body,
//       {
//         new: true,
//       }
//     );
//     if (!dataSet) {
//       return res.status(404).json({ error: "dataSet not found" });
//     }
//     res.status(200).json({
//       status: "dataSet Updated Successfully",
//       dataSet,
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Unable to update dataSet" });
//   }
// });





module.exports = router;
