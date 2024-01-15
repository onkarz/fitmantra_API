
const express = require("express");
const router = express.Router();
const dataSetModel = require("../models/datasetModel");

//Get All DataSets

router.get("/", async (req, res) => {
  try {
    const dataSets = await dataSetModel.find();
    res.status(200).json({
      status: "success",
      dataSets,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get author dataSets by his id

// router.get("/author/:authorId", async (req, res) => {
//   try {
//     const dataSet = await dataSetModel.find({ authorId: req.params.authorId });

//     if (!dataSet) {
//       return res.status(404).json({
//         status: "Failed",
//         message: "dataSet with given Id not found",
//       });
//     } else {
//       res.status(200).json({
//         status: "success",
//         dataSet,
//       });
//     }
//   } catch (err) {
//     throw err;
//   }
// });

//Create new DataSet

router.post("/", async (req, res) => {
  try {
    const { title, description, level } = req.body;

    const { userEmail, checked } = req.body;
    console.log("Body", req.body);

    const dataSet = await dataSetModel.create({
      title,
      description,
      level,
      userEmail,
      checked
    });

    console.log(dataSet);

    //send back response
    res.status(201).json({
      status: "DataSet created successfully.",
      dataSet,
    });
  } catch (err) {
    throw err;
  }
});

//Update dataSet

router.put("/:dataSetId", async (req, res) => {
  try {
    const dataSet = await dataSetModel.findByIdAndUpdate(
      req.params.dataSetId,
      req.body,
      {
        new: true,
      }
    );
    if (!dataSet) {
      return res.status(404).json({ error: "dataSet not found" });
    }
    res.status(200).json({
      status: "dataSet Updated Successfully",
      dataSet,
    });
  } catch (error) {
    res.status(500).json({ error: "Unable to update dataSet" });
  }
});

//get dataSet by its Id
router.get("/:dataSetId", async (req, res) => {
  try {
    const dataSet = await dataSetModel.findById({ _id: req.params.dataSetId });

    if (!dataSet) {
      return res.status(404).json({
        status: "Failed",
        message: "dataSet with given Id not found",
      });
    } else {
      res.status(200).json({
        status: "success",
        dataSet,
      });
    }
  } catch (err) {
    throw err;
  }
});

// Delete dataSet by its Id
router.delete("/:dataSetId", async (req, res) => {
  try {
    const dataSet = await dataSetModel.findByIdAndRemove(req.params.dataSetId);

    if (!dataSet)
      return res.status(404).json({
        status: "Fail",
        message: "dataSet with given Id not found",
      });

    //return deleted dataSet
    res.status(200).json({
      status: "success",
      message: "dataSet deleted successfully",
    });
  } catch (err) {
    throw err;
  }
});


module.exports = router;