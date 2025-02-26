const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema({
  nickname: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  likes: { type: Number, default: 0 },
  color: { type: String, required: true },
  breed: { type: String, required: true },
  isForSale: { type: Boolean, default: false },
  publicId: { type: String, required: true },
  url: { type: String, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Pet", PetSchema);
