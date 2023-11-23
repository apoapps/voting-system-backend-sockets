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
  votesFor: [{}], // An array of generic objects
  votesAgainst: [{}],
  votesAbstain: [{}],
});

module.exports = model("VotingPoint", votingPointSchema);
