import { body } from "express-validator";

/* ================================
   CREATE JOB VALIDATION
================================ */
export const createJobValidation = [
  body("title")
    .notEmpty()
    .withMessage("Job title is required")
    .isLength({ min: 3 })
    .withMessage("Job title must be at least 3 characters long"),

  body("description")
    .notEmpty()
    .withMessage("Job description is required")
    .isLength({ min: 20 })
    .withMessage("Description must be at least 20 characters long"),

  body("salary.min")
    .notEmpty()
    .withMessage("Minimum salary is required")
    .isInt({ min: 0 })
    .withMessage("Minimum salary must be >= 0"),

  body("salary.max")
    .notEmpty()
    .withMessage("Maximum salary is required")
    .isInt({ min: 0 })
    .withMessage("Maximum salary must be >= 0")
    .custom((value, { req }) => value >= req.body.salary.min)
    .withMessage("Maximum salary must be greater than or equal to minimum salary"),

  body("experience.min")
    .notEmpty()
    .withMessage("Minimum experience is required")
    .isInt({ min: 0 })
    .withMessage("Minimum experience must be in months"),

  body("experience.max")
    .notEmpty()
    .withMessage("Maximum experience is required")
    .isInt({ min: 0 })
    .withMessage("Maximum experience must be in months")
    .custom((value, { req }) => value >= req.body.experience.min)
    .withMessage("Maximum experience must be >= minimum experience"),

  body("jobType")
    .notEmpty()
    .withMessage("Job type is required")
    .isIn(["Full-Time", "Part-Time", "Internship", "Contract"])
    .withMessage("Invalid job type"),

  body("location").notEmpty().withMessage("Location is required"),

  body("company")
    .notEmpty()
    .withMessage("Company ID is required")
    .isMongoId()
    .withMessage("Invalid Company ID"),
];

export const updateJobValidation = [
  body("title")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Job title must be at least 3 characters"),

  body("description")
    .optional()
    .isLength({ min: 20 })
    .withMessage("Description must be at least 20 characters"),

  body("salary.min").optional().isInt({ min: 0 }).withMessage("Minimum salary must be >= 0"),

  body("salary.max")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Maximum salary must be >= 0")
    .custom((value, { req }) => {
      if (req.body.salary?.min !== undefined) {
        return value >= req.body.salary.min;
      }
      return true;
    })
    .withMessage("Maximum salary must be >= minimum salary"),

  body("experience.min")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Minimum experience must be in months"),

  body("experience.max")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Maximum experience must be in months")
    .custom((value, { req }) => {
      if (req.body.experience?.min !== undefined) {
        return value >= req.body.experience.min;
      }
      return true;
    })
    .withMessage("Maximum experience must be >= minimum experience"),

  body("jobType").optional().isIn(["Full-Time", "Part-Time", "Internship", "Contract"]),

  body("location").optional(),

  body("company").optional().isMongoId().withMessage("Invalid Company ID"),
];
