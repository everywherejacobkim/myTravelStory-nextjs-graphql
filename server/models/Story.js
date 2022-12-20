const { model, Schema } = require('mongoose');

const storySchema = new Schema({
    title: { type: String },
    date: { type: String },
    continent:  { type: String },
    slug:  { type: String },
    excerpt:  { type: String },
    content:  { type: String },
    featuredImage:  { type: String },
})

module.exports = model('Story', storySchema);

