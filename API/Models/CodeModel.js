const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    encryptCode: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Code = mongoose.model("Code", codeSchema);
module.exports = Code;
