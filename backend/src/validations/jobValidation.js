import { body } from "express-validator";

export const jobValidation = [
  body("title")
    .notEmpty().withMessage("Job title is required")
    .isLength({ min: 3 }).withMessage("Job title must be at least 3 characters long"),

  body("description")
    .notEmpty().withMessage("Job description is required")
    .isLength({ min: 20 }).withMessage("Description must be at least 20 characters long"),

  body("salary")
    .notEmpty().withMessage("Salary is required")
    .isNumeric().withMessage("Salary must be a number")
    .custom((value) => value >= 0).withMessage("Salary cannot be negative"),

  body("jobType")
    .notEmpty().withMessage("Job type is required")
    .isIn(["Full-Time", "Part-Time", "Internship", "Contract"])
    .withMessage("Job type must be one of: Full-Time, Part-Time, Internship, Contract"),

  body("location")
    .notEmpty().withMessage("Location is required"),

  body("company")
    .notEmpty().withMessage("Company ID is required")
    .isMongoId().withMessage("Invalid Company ID format"),
];
