import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one review per student
    },

    // Placement details
    placedAs: {
      type: String,
      required: true,
      trim: true,
    },
    placedAt: {
      type: String,
      required: true,
      trim: true,
    },

    // Review content
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      required: true,
      trim: true,
      minlength: 20, // minimum meaningful review
      maxlength: 1000, // prevent essays
    },
    language: {
      type: String,
      enum: ["english", "hindi", "bengali", "other"],
      default: "english",
    },

    // Optional proof
    offerLetterImage: {
      type: String, // cloudinary url
      default: null,
    },

    // Moderation
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    adminNote: {
      type: String, // rejection reason
      default: null,
    },

    // Edit tracking
    isEdited: {
      type: Boolean,
      default: false,
    },
    editedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Index for faster queries
reviewSchema.index({ status: 1 });
reviewSchema.index({ language: 1 });
reviewSchema.index({ rating: 1 });

export const Review = mongoose.model("Review", reviewSchema);
