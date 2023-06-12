const mongoose = require("mongoose");

const { Schema } = mongoose;

const paintSchema = new Schema(
  {
    color: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    lastModifiedBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Paint = mongoose.model("Paint", paintSchema);

module.exports = Paint;
