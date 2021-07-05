const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const chiTietHoaDonShema = new Schema({
    OrderID: {
        type: Number,
        required: true,
    },
    bookID: {
        type: Number,
        required: true,
    },
    Quantity: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('chiTietHoaDon', chiTietHoaDonShema);
