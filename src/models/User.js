// User Model for Cabildo Members

const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    position: {
      type: String,
      // The position or role of the user in the cabildo (e.g., President, Councilor, Secretary, etc.)
    },
    municipalityNumber: {
      type: String,
      // The number assigned to the municipality where the user belongs
    },
    lastName: {
      type: String,
      // The last name of the user
    },
    middleName: {
      type: String,
      // The middle name of the user
    },
    firstName: {
      type: String,
      // The first name of the user
    },
    gender: {
      type: String,
      // The gender of the user
    },
    party: {
      type: String,
      // The political party affiliation of the user
    },
    startDate: {
      type: String,
      // The start date of the user's term in the cabildo
    },
    endDate: {
      type: String,
      // The end date of the user's term in the cabildo
    },
    memberStatus: {
      type: String,
      // The status of the user as a cabildo member (e.g., Active, Inactive, Resigned, etc.)
    },
    memberPhoto: {
      type: String,
      // The photo of the user
    },
    password: {
      type: String,
      // The password of the user
    },
  },
  // Model options
  {
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
