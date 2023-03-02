const mongoose2 = require("mongoose");

const gifSchema = new mongoose2.Schema(
  {
    gifId: {
      type: String,
      required: [true, "Gif must have gifId"],
    },
    gifUniqueId: {
      type: String,
      required: [true, "Gif must have uniqueGifId"],
    },

    userObjectId: {
      type: mongoose2.Schema.ObjectId,
      ref: "User",
      required: [true, "Gif must belong to a user"],
    },
    userId: {
      type: Number,
      required: [true, "Gif must belong to a userId"],
    },
    key: [String],
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
gifSchema.index({ userObjectId: 1, key: 1, gifId: 1 });

// gifSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "user",
//     select: "name photo",
//   });
//   next();
// });

export const Gif = mongoose2.model("Gif", gifSchema);
