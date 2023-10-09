const mongoose = require("mongoose");
const User = require("./User.js");

const votingPointSchema = new mongoose.Schema({
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  votesAgainst: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  votesAbstain: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const VotingPoint = mongoose.model("VotingPoint", votingPointSchema);

module.exports = VotingPoint;
