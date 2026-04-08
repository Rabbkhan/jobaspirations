import {
  getApprovedReviews,
  getReviewStats,
  submitReview,
  getMyReview,
  getAllReviews,
  approveReview,
  rejectReview,
  deleteReview,
  markStudentAsPlaced,
} from "./review.service.js";

import {
  sendPlacementEmail,
  sendReviewApprovedEmail,
  sendReviewRejectedEmail,
} from "#config/email/email.service.js";

// ── Public ──────────────────────────────────────────

export const getApprovedReviewsController = async (req, res, next) => {
  try {
    const { language, rating, page, limit } = req.query;
    const data = await getApprovedReviews({ language, rating, page, limit });
    res.json({ success: true, ...data });
  } catch (err) {
    next(err);
  }
};

export const getReviewStatsController = async (req, res, next) => {
  try {
    const stats = await getReviewStats();
    res.json({ success: true, stats });
  } catch (err) {
    next(err);
  }
};

// ── Student ──────────────────────────────────────────

export const submitReviewController = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const file = req.file;
    const review = await submitReview(userId, req.body, file);
    res.status(201).json({
      success: true,
      message: "Review submitted successfully, pending admin approval",
      review,
    });
  } catch (err) {
    next(err);
  }
};

export const getMyReviewController = async (req, res, next) => {
  try {
    const review = await getMyReview(req.user._id);
    res.json({ success: true, review });
  } catch (err) {
    next(err);
  }
};

// ── Admin ──────────────────────────────────────────

export const getAllReviewsController = async (req, res, next) => {
  try {
    const { status } = req.query;
    const reviews = await getAllReviews(status);
    res.json({ success: true, reviews });
  } catch (err) {
    next(err);
  }
};

export const approveReviewController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await approveReview(id);

    // email trigger — notify student
    await sendReviewApprovedEmail(review.student.email, review.student.fullname).catch((err) =>
      console.error("Review approved email failed:", err)
    );

    res.json({
      success: true,
      message: "Review approved successfully",
      review,
    });
  } catch (err) {
    next(err);
  }
};

export const rejectReviewController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;
    const review = await rejectReview(id, reason);

    // email trigger — notify student with reason
    await sendReviewRejectedEmail(review.student.email, review.student.fullname, reason).catch(
      (err) => console.error("Review rejected email failed:", err)
    );

    res.json({
      success: true,
      message: "Review rejected",
      review,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteReviewController = async (req, res, next) => {
  try {
    const result = await deleteReview(req.params.id);
    res.json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};

export const markStudentAsPlacedController = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await markStudentAsPlaced(userId);

    // email trigger — notify student they are placed
    await sendPlacementEmail(user.email, user.fullname).catch((err) =>
      console.error("Placement email failed:", err)
    );

    res.json({
      success: true,
      message: "Student marked as placed",
      user,
    });
  } catch (err) {
    next(err);
  }
};
