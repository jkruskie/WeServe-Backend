const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: String,
}, { 
    timestamps: {}
    });

module.exports = mongoose.model("Organization", schema);