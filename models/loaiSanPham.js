const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
const loaiSanPhamSchema = new Schema({
    CategoryID: {
        type: Number,
        required: true,
    },
    CategoryDescription: {
        type: String,
        required: true,
    }
});
const LoaiSP = mongoose.model('LoaiSP', loaiSanPhamSchema);
autoIncrement.initialize(mongoose.connection);
loaiSanPhamSchema.plugin(autoIncrement.plugin, { model: 'LoaiSP', field: 'CategoryID' });

module.exports = {
    LoaiSP
};
module.exports = mongoose.model('loaiSanPham', loaiSanPhamSchema);
