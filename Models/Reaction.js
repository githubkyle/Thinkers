const { Schema } = require("mongoose");

const reactionSchema = new Schema({

  thoughtId: {
    type: Number,
    required: true
  },

  reactionBody: {
    type: String,
    required: true,
    maxlength: 280
  },

  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: function(timestamp) {
      return new Date(timestamp).toLocaleString();
    }
  }
});

module.exports = reactionSchema;
