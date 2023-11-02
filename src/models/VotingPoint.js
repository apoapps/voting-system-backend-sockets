const { Schema, model } = require("mongoose");

//const User = require("./User.js");

const votingPointSchema = new Schema({
  commision: {
    type: String,
    required: true,
  },
  required_votes: {
    type: String,
    required: true,
  },
  voting_form: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  votesFor: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  votesAgainst: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  votesAbstain: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = model("VotingPoint", votingPointSchema);
