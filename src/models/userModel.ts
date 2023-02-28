const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  first_name: {
    type: String,
  },
  last_name: { type: String },
  id: {
    type: Number,
    unique: true,
  },
  is_bot: {
    type: Boolean,
  },
  language_code: {
    type: String,
  },
  username: { type: String },
  userOnStage: {
    stageName: {
      type: String,
      enum: ["NEW", "GIF_PENDING", "WAIT_FOR_INDEX", "GIF_SAVED"],
      default: "NEW",
    },
    details: { type: String },
  },
});

export const User = mongoose.model("User", userSchema);
