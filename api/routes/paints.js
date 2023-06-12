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
    const { updatedPaint } = req.body;
    console.log(updatedPaint);
    const paint = await Paint.findById(req.params.id);
    
    if (!paint) {
      return res.status(400).json({ error: "Paint not found" });
    }

    paint.color = updatedPaint.color;
    paint.status = updatedPaint.status;
    paint.quantity = updatedPaint.quantity;

    await paint.save();
    res.json({ message: "Paint updated successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to update paint" });
  }
});

router.put("/update/quantity/:id", async (req, res) => {
  try {
    const { quantity } = req.body;
    const paint = await Paint.findById(req.params.id);
    
    if (!paint) {
      return res.status(400).json({ error: "Paint not found" });
    }

    paint.quantity = quantity;

    await paint.save();
    res.json({ message: "Paint quantity updated successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to update paint" });
  }
});

router.put("/update/status/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const paint = await Paint.findById(req.params.id);
    
    if (!paint) {
      return res.status(400).json({ error: "Paint not found" });
    }

    paint.status = status;

    await paint.save();
    res.json({ message: "Paint quantity updated successfully" });
  } catch (error) {
    res.status(400).json({ error: "Failed to update paint" });
  }
});

module.exports = router;
