const express = require("express");
const router = express.Router();

const Paint = require("../models/paint.model");

// Route to get all paints
router.get("/", async (req, res) => {
  try {
    const paints = await Paint.find();
    res.json(paints);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch paints" });
  }
});

// Route to add a new paint
// router.post("/add", async (req, res) => {
//   try {
//     const { color, status, quantity, createdBy, lastModifiedBy } = req.body;
//     const newPaint = new Paint({
//       color,
//       status,
//       quantity,
//       createdBy,
//       lastModifiedBy,
//     });
//     await newPaint.save();
//     res.json({ message: "Paint added successfully" });
//   } catch (error) {
//     res.status(400).json({ error: "Failed to add paint" });
//   }
// });

// Route to get a paint by ID
router.get("/:id", async (req, res) => {
  try {
    const paint = await Paint.findById(req.params.id);
    if (!paint) {
      return res.status(400).json({ error: "Paint not found" });
    }
    res.json(paint);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch paint" });
  }
});

// Route to update a paint by ID
router.put("/update/:id", async (req, res) => {
  try {
    const { color, status, quantity, createdBy, lastModifiedBy } = req.body;
    const paint = await Paint.findById(req.params.id);

    if (!paint) {
      return res.status(400).json({ error: "Paint not found" });
    }

    paint.color = color;
    paint.status = status;
    paint.quantity = quantity;
    paint.createdBy = createdBy;
    paint.lastModifiedBy = lastModifiedBy;

    await paint.save();
    res.json({ message: "Paint updated successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to update paint" });
  }
});

module.exports = router;
