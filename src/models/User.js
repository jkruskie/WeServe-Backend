const { Timestamp } = require('bson');
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: String, 
    email: {
      type: String,
      unique: true,
      required: 'Your email is required',
    },
    password: String,
    year: String, 
    major: String,
    is_active: Boolean,
  }, { 
  timestamps: {}
  }
);

// schema.pre('save', function(next) {
//     now = new Date();
//     this.created_at = now;
//     next();
// });

module.exports = mongoose.model("User", schema);