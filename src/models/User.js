const { Timestamp } = require('bson');
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: String, 
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: 'Your email is required',
    },
    password: {
      type: String,
      select: false,
    },
    year: String, 
    major: String,
    university: {
      type: mongoose.Schema.Types.ObjectId,
    },
    organiztion: {
      type: mongoose.Schema.Types.ObjectId,
    },
    user_type: {
      type: String,
      enum: [
        'student', 'organization', 'university',
      ],
      required: true,
    },
    user_role: {
      type: String,
      enum: [
        'user', 'moderator', 'administrator', 'app-admin'
      ],
      required: true,
    },
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