const express = require('express')
const mongoose = require('mongoose')
const { MONGO_URI } = require('./config')
const cors = require('cors')
const loaiSanPhamRoutes = require('./routes/api/R_LoaiSanPham');
const sanPhamRoutes = require('./routes/api/R_SanPham');
const khachHangRoutes = require('./routes/api/R_KhachHang');
const hoaDonRoutes = require('./routes/api/R_HoaDon');
const CTHDRoutes = require('./routes/api/R_CTHDs');

const XacNhanRoutes = require('./utils/xacNhan');
const DangNhapRoutes = require('./routes/api/R_dangNhap');

const kiemTraRoutes = require('./routes/api/R_KhachHang_kiemtra');


const searchSPRoutes = require('./routes/api/R_timkiemSanPham');
const searchLSPRoutes = require('./routes/api/R_timkiemLoaiSP');
const searchKHRoutes = require('./routes/api/R_timkiemCustomer');
const searchHDRoutes = require('./routes/api/R_timkiemOrder');


const kiemTraXoaloaiSanPhamRoutes = require('./routes/api/R_kiemTraXoaLSP');
const kiemTraXoasanPhamRoutes = require('./routes/api/R_kiemTraXoaSP');
const kiemTraXoakhachHangRoutes = require('./routes/api/R_kiemTraXoaKH');
const kiemTraXoahoaDonRoutes = require('./routes/api/R_kiemTraXoaHD');


const app = express();

app.use(cors())
app.use(express.json());

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
    .then(() => console.log('Mongo conected'))
    .catch(err => console.log(`err ${err}`))


app.use('/api/loaisanpham', loaiSanPhamRoutes);
app.use('/api/sanpham', sanPhamRoutes);
app.use('/api/khachhang', khachHangRoutes);
app.use('/api/hoadon', hoaDonRoutes);
app.use('/api/chitiethoadon', CTHDRoutes);

app.use('/api/khachhang/kiemtra', kiemTraRoutes);


app.use('/api/xacnhan', XacNhanRoutes);
app.use('/api/dangNhap', DangNhapRoutes);

app.use('/api/searchSP', searchSPRoutes);
app.use('/api/searchLSP', searchLSPRoutes);
app.use('/api/searchKH', searchKHRoutes);
app.use('/api/searchHD', searchHDRoutes);


app.use('/api/loaisanpham/kiemtraxoa', kiemTraXoaloaiSanPhamRoutes);
app.use('/api/sanpham/kiemtraxoa', kiemTraXoasanPhamRoutes);
app.use('/api/khachhang/kiemtraxoa', kiemTraXoakhachHangRoutes);
app.use('/api/hoadon/kiemtraxoa', kiemTraXoahoaDonRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server run at port ${PORT}`));