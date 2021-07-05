const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
const khachHangSchema = new Schema({
    CustomerID: {
        type: Number,
        required: true,
    },
    Name: {
        type: String,
        required: true,
    },
    Address: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true,
    },
    Role: {
        type: String,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    }

});
const KH = mongoose.model('KH', khachHangSchema);
autoIncrement.initialize(mongoose.connection);
khachHangSchema.plugin(autoIncrement.plugin, { model: 'KH', field: 'CustomerID' });

module.exports = {
    KH
};
module.exports = mongoose.model('khachHang', khachHangSchema);
