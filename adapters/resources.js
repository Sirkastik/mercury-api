const mongoose = require("mongoose");
const { Schema } = mongoose;

const Resource = mongoose.model(
  "resources",
  new Schema(
    {
      name: { type: String, required: true },
      fields: [
        { type: mongoose.SchemaTypes.ObjectId, required: true, ref: "fields" },
      ],
    },
    {
      timestamps: true,
    }
  )
);

const Field = mongoose.model(
  "fields",
  new Schema(
    {
      name: { type: String, required: true },
      type: {
        type: String,
        enum: ["string", "number", "boolean", "date", "object"],
        required: true,
      },
      array: { type: Boolean, default: false },
      required: { type: Boolean, default: false },
      ref: { type: String, required: false },
    },
    {
      timestamps: true,
    }
  )
);

module.exports = { fetchResources, Resource, Field };

async function fetchResources() {
  return Resource.find().populate("fields");
}
