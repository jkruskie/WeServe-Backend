const { Timestamp } = require('bson');
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: String, 
    email: String,
    password: String,
    year: String, 
    major: String,
    // roles: [
    //     {
    //       type: mongoose.Schema.Types.ObjectId,
    //       ref: "Role"
    //     }
    //   ],
      is_active: Boolean,
}, { timestamps: {}});

// schema.pre('save', function(next) {
//     now = new Date();
//     this.created_at = now;
//     next();
// });

module.exports = mongoose.model("User", schema);