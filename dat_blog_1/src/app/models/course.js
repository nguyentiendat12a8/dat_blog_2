const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const slug = require('mongoose-slug-generator');
mongoose.plugin(slug);

const Course = new Schema({
    name: { type: String,require: true },
    description: { type: String, maxLength: 600 },
    image: { type: String },
    videoId: { type: String, require: true },
    slug : {type: String, slug: 'name', unique: true}

}, {
    timestamps: true,
});



module.exports = mongoose.model('Course', Course);
