const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
const sanPhamSchema = new Schema({
    bookID: {
        type: Number,
        required: true,
    },
    CategoryID: {
        type: Number,
        required: true,
    },
    Title: {
        type: String,
        required: true,
    },
    Year: {
        type: Number,
        required: true,
    },
    Price: {
        type: Number,
        required: true,
    },
    BookDescription: {
        type: String,
        required: true,
    },
    PublishingCompany: {
        type: String,
        required: true,
    },
    Author: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
});
const SP = mongoose.model('SP', sanPhamSchema);
autoIncrement.initialize(mongoose.connection);
sanPhamSchema.plugin(autoIncrement.plugin, { model: 'SP', field: 'bookID' });

module.exports = {
    SP
};
module.exports = mongoose.model('sanPham', sanPhamSchema);
