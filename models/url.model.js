const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const UrlSchema = new mongoose.Schema({
    original_url: { type: String, required: true, unique: true },
    short_url: { type: Number },
    date_created: { type: Date, default: Date.now }
})

UrlSchema.plugin(AutoIncrement, { inc_field: 'short_url' });

module.exports = mongoose.model('Url', UrlSchema);