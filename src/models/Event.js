const mongoose = require('mongoose');

const schema = mongoose.Schema({
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
    },
    title: String, 
    description: String,
    details: String,
    location: String,
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: false,
    },
    image: String
}, { 
    timestamps: {}
    }
);

var autoPopulateOrg = function(next) {
    this.populate('organization');
    next();
  };
  
  schema.
    pre('findOne', autoPopulateOrg).
    pre('find', autoPopulateOrg);

module.exports = mongoose.model("Event", schema);