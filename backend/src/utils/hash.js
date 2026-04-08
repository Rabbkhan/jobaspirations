// utils/password.js

import bcrypt from "bcryptjs";

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 12;

export const hashPassword = async (plainPassword) => {
  if (!plainPassword || typeof plainPassword !== "string") {
    throw new Error("Invalid password input — must be a non-empty string.");
  }

  try {
    const hashed = await bcrypt.hash(plainPassword, SALT_ROUNDS);
    return hashed;
  } catch (error) {
    console.error("❌ Hashing Error:", error.message);
    throw new Error("Password hashing failed. Please try again.");
  }
};

/**
 * Compares a plain-text password with a hashed password.
 * - Validates inputs
 * - Returns boolean
 * - Throws descriptive error if comparison fails
 */
export const comparePassword = async (plainPassword, hashedPassword) => {
  if (!plainPassword || !hashedPassword) {
    throw new Error("Both plain and hashed passwords are required for comparison.");
  }

  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (error) {
    console.error("❌ Comparison Error:", error.message);
    throw new Error("Password comparison failed. Please try again.");
  }
};
