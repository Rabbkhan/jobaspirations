import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    // password: {
    //   type: String,
    //   required: function () {
    //     return this.authProvider === "local";
    //   },
    //   select: false, // ✅ prevents accidental exposure
    // },

     password: {
      type: String,
      required: true, 

     },

    role: {
      type: String,
      enum: ["student", "recruiter"],
      required: true,
    },
    // isEmailVerified: {
    //   type: Boolean,
    //   default: false,
    // },
    // emailVerificationToken: {
    //   type: String,
    //   select: false,
    // },

    // emailVerificationExpires: {
    //   type: Date,
    //   select: false,
    // },

    // // ✅ PASSWORD RESET
    // passwordResetToken: {
    //   type: String,
    //   select: false,
    // },

    // passwordResetExpires: {
    //   type: Date,
    //   select: false,
    // },
    // authProvider: {
    //   type: String,
    //   enum: ["local", "google", "github", "facebook"],
    //   default: "local",
    // },

    // providerId: {
    //   type: String,
    // },

    profile: {
      bio: { type: String, trim: true },
      skills: [{ type: String, trim: true }],
      resume: { type: String }, //url to resume file
      resumeOriginalName: { type: String },
      company: { type: mongoose.Schema.Types.ObjectId, ref: "company" },
      profilePhoto: {
        type: String,
        default: "",
      },
    },
  },
  { timestamps: true }
);

// userSchema.index(
//   { authProvider: 1, providerId: 1 },
//   { unique: true, sparse: true }
// );

export const User = mongoose.model("User", userSchema);
