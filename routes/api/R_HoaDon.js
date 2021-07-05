const express = require('express')
const router = express.Router();

//loai san pham
const hoaDons = require('../../models/hoaDon');

//get all
router.get('/', async (req, res) => {
    try {
        const lsps = await hoaDons.find();
        if (!lsps) throw Error("No items");
        res.status(200).json(lsps);
    }
    catch (err) {
        res.status(400).json({ msg: err })
    }
})

//get 1
router.get('/:id', async (req, res) => {
    try {
        const lsps = await hoaDons.find({ OrderID: req.params.id });
        if (!lsps) throw Error("No items");
        res.status(200).json(lsps);
    }
    catch (err) {
        res.status(400).json({ msg: err })
    }
})

//create
router.post('/', async (req, res) => {
    const newLoaiSanPham = new hoaDons(req.body);
    try {
        const loaiSanPham = await newLoaiSanPham.save();
        if (!loaiSanPham) throw Error("Something went wrong khachHang");
        res.status(200).json(loaiSanPham);
    }
    catch (err) {
        res.status(400).json({ msg: err })
    }
})
//delete
// api/loaisanpham/:id
router.delete('/:id', async (req, res) => {
    try {
        const lsp = await hoaDons.findOneAndDelete({ OrderID: req.params.id })
        if (!lsp) throw Error("No items");
        res.status(200).json({ success: true });
    }
    catch (err) {
        res.status(400).json({ msg: err })
    }
})
//update
// api/loaisanpham/:id
router.put('/:id', async (req, res) => {
    try {
        const lsp = await hoaDons.findOneAndUpdate({ OrderID: req.params.id }, req.body)
        if (!lsp) throw Error("No items");
        res.status(200).json({ success: true });
    }
    catch (err) {
        res.status(400).json({ msg: err })
    }
})

module.exports = router;