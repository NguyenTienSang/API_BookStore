const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
const hoaDonShema = new Schema({
    OrderID: {
        type: Number,
        required: true,
    },
    CustomerID: {
        type: Number,
        required: true,
    },
    Date: {
        type: Date,
        default: Date.now,
    },
    Address: {
        type: String,
        required: true,
    },
    Status: {
        type: String,
        required: true,
    }
});
const HD = mongoose.model('HD', hoaDonShema);
autoIncrement.initialize(mongoose.connection);
hoaDonShema.plugin(autoIncrement.plugin, { model: 'HD', field: 'OrderID' });

module.exports = {
    HD
};
module.exports = mongoose.model('hoaDon', hoaDonShema);
