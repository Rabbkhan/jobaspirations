import { body } from "express-validator";

export const registerValidation = [
  body("fullname").notEmpty().withMessage("Full name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("phoneNumber").notEmpty().withMessage("Phone number is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  // ❌ role removed from register
];

export const loginValidation = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  // keep optional if backend supports role-based login
  // body("role").optional().isIn(["student", "recruiter"]).withMessage("Invalid role")
];


export const updateUserValidation = [
  body("fullname")
    .optional()
    .isLength({ min: 3 })
    .withMessage("Full name must be at least 3 characters long"),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Please enter a valid email address"),

  body("phoneNumber")
    .optional()
    .isMobilePhone("any")
    .withMessage("Please enter a valid phone number"),

  body("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  body("bio")
    .optional()
    .isLength({ max: 200 })
    .withMessage("Bio cannot exceed 200 characters"),

  body("skills")
    .optional()
    .isArray()
    .withMessage("Skills must be an array of strings"),
];
