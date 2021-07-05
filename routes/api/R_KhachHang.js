const express = require('express')
const router = express.Router();

//loai san pham
const khachHangs = require('../../models/khachHang');

//get all
router.get('/', async (req, res) => {
    try {
        const lsps = await khachHangs.find();
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
        const lsps = await khachHangs.find({ CustomerID: req.params.id });
        if (!lsps) throw Error("No items");
        res.status(200).json(lsps);
    }
    catch (err) {
        res.status(400).json({ msg: err })
    }
})

//create
router.post('/', async (req, res) => {
    const newLoaiSanPham = new khachHangs(req.body);
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
        const lsp = await khachHangs.findOneAndDelete({ CustomerID: req.params.id })
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
        const lsp = await khachHangs.findOneAndUpdate({ CustomerID: req.params.id }, req.body)
        if (!lsp) throw Error("No items");
        res.status(200).json({ success: true });
    }
    catch (err) {
        res.status(400).json({ msg: err })
    }
})

module.exports = router;