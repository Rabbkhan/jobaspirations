import { Review } from "./review.model.js";
import { User } from "#modules/auth/user.model.js";
import AppError from "#utils/AppError.js";
import { uploadToCloud } from "#utils/uploadToCloud.js";

// ── Public ──────────────────────────────────────────

export const getApprovedReviews = async ({ language, rating, page = 1, limit = 10 }) => {
  const filter = { status: "approved" };

  if (language && language !== "all") filter.language = language;
  if (rating) filter.rating = Number(rating);

  const skip = (page - 1) * limit;

  const [reviews, total] = await Promise.all([
    Review.find(filter)
      .populate("student", "fullname profile.profilePhoto")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Review.countDocuments(filter),
  ]);

  return {
    reviews,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / limit),
  };
};

export const getReviewStats = async () => {
  const stats = await Review.aggregate([
    { $match: { status: "approved" } },
    {
      $group: {
        _id: null,
        totalReviews: { $sum: 1 },
        averageRating: { $avg: "$rating" },
        fiveStar: { $sum: { $cond: [{ $eq: ["$rating", 5] }, 1, 0] } },
        fourStar: { $sum: { $cond: [{ $eq: ["$rating", 4] }, 1, 0] } },
        threeStar: { $sum: { $cond: [{ $eq: ["$rating", 3] }, 1, 0] } },
        twoStar: { $sum: { $cond: [{ $eq: ["$rating", 2] }, 1, 0] } },
        oneStar: { $sum: { $cond: [{ $eq: ["$rating", 1] }, 1, 0] } },
      },
    },
  ]);

  const totalPlaced = await User.countDocuments({ isPlaced: true });

  return {
    ...stats[0],
    averageRating: stats[0]?.averageRating ? Math.round(stats[0].averageRating * 10) / 10 : 0,
    totalPlaced,
  };
};

// ── Student ──────────────────────────────────────────

export const submitReview = async (userId, reviewData, file) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError("User not found", 404);

  // only placed students can review
  if (!user.isPlaced) {
    throw new AppError("Only placed students can submit a review", 403);
  }

  // one review per student
  if (user.hasReviewed) {
    const existing = await Review.findOne({ student: userId });
    if (existing && existing.status !== "rejected") {
      throw new AppError("You have already submitted a review", 400);
    }
  }

  // handle offer letter upload
  let offerLetterImage = null;
  if (file) {
    const uploaded = await uploadToCloud(file, "image");
    offerLetterImage = uploaded.url;
  }

  // if rejected before — update existing
  const existingRejected = await Review.findOne({
    student: userId,
    status: "rejected",
  });

  if (existingRejected) {
    existingRejected.placedAs = reviewData.placedAs;
    existingRejected.placedAt = reviewData.placedAt;
    existingRejected.rating = reviewData.rating;
    existingRejected.review = reviewData.review;
    existingRejected.language = reviewData.language;
    existingRejected.offerLetterImage = offerLetterImage || existingRejected.offerLetterImage;
    existingRejected.status = "pending";
    existingRejected.adminNote = null;
    existingRejected.isEdited = true;
    existingRejected.editedAt = new Date();
    await existingRejected.save();
    return existingRejected;
  }

  // create new review
  const review = await Review.create({
    student: userId,
    ...reviewData,
    offerLetterImage,
    status: "pending",
  });

  // mark user as reviewed
  user.hasReviewed = true;
  await user.save();

  return review;
};

export const getMyReview = async (userId) => {
  const review = await Review.findOne({ student: userId });
  if (!review) throw new AppError("No review found", 404);
  return review;
};

// ── Admin ──────────────────────────────────────────

export const getAllReviews = async (status) => {
  const filter = {};
  if (status && status !== "all") filter.status = status;

  return await Review.find(filter)
    .populate("student", "fullname email profile.profilePhoto isPlaced")
    .sort({ createdAt: -1 });
};

export const approveReview = async (reviewId) => {
  const review = await Review.findById(reviewId);
  if (!review) throw new AppError("Review not found", 404);

  review.status = "approved";
  review.adminNote = null;
  await review.save();

  return await review.populate("student", "fullname email");
};

export const rejectReview = async (reviewId, reason) => {
  const review = await Review.findById(reviewId);
  if (!review) throw new AppError("Review not found", 404);

  review.status = "rejected";
  review.adminNote = reason || "Your review did not meet our guidelines";
  await review.save();

  // allow student to resubmit
  await User.findByIdAndUpdate(review.student, {
    hasReviewed: false,
  });

  return await review.populate("student", "fullname email");
};

export const deleteReview = async (reviewId) => {
  const review = await Review.findById(reviewId);
  if (!review) throw new AppError("Review not found", 404);

  // reset student flag
  await User.findByIdAndUpdate(review.student, {
    hasReviewed: false,
  });

  await review.deleteOne();
  return { message: "Review deleted successfully" };
};

export const markStudentAsPlaced = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new AppError("User not found", 404);
  if (user.role !== "student") throw new AppError("User is not a student", 400);

  user.isPlaced = true;
  user.placedAt = new Date();
  await user.save();

  return user;
};
