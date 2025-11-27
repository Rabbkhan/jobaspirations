import { body } from "express-validator";

export const companyValidation = [
  body("companyname").notEmpty().withMessage("Company name is required"),
  body("description").optional().isString(),
  body("website").optional().isURL().withMessage("Invalid website URL"),
  body("location").optional().isString(),
  body("logo").optional().isString(),
];
