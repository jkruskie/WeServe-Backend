const mongoose = require('mongoose');

const schema = mongoose.Schema({
    title: String, 
    description: String,
    details: String,
    when: String,
});

module.exports = mongoose.model("Event", schema);