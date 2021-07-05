const express = require('express')
const router = express.Router();

//loai san pham
const sanPhams = require('../../models/sanPham');

//get all theo loai
router.get('/loc/:CategoryID', async (req, res) => {
    try {
        const lsps = await sanPhams.find({ CategoryID: req.params.CategoryID });
        if (!lsps) throw Error("No items");
        res.status(200).json(lsps);
    }
    catch (err) {
        res.status(400).json({ msg: err })
    }
})

//get all
router.get('/', async (req, res) => {
    try {
        const lsps = await sanPhams.find();
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
        const lsps = await sanPhams.find({ bookID: req.params.id });
        if (!lsps) throw Error("No items");
        res.status(200).json(lsps);
    }
    catch (err) {
        res.status(400).json({ msg: err })
    }
})

//create
router.post('/', async (req, res) => {
    const newLoaiSanPham = new sanPhams(req.body);
    try {
        const loaiSanPham = await newLoaiSanPham.save();
        if (!loaiSanPham) throw Error("Something went wrong sanpham");
        res.status(200).json(loaiSanPham);
    }
    catch (err) {
        res.status(400).json({ msg: err })
    }
})
//delete
// api/sanpham/:id
router.delete('/:id', async (req, res) => {
    try {
        const lsp = await sanPhams.findOneAndDelete({ bookID: req.params.id })
        if (!lsp) throw Error("No items");
        res.status(200).json({ success: true });
    }
    catch (err) {
        res.status(400).json({ msg: err })
    }
})
//update
// api/sanpham/:id
router.put('/:id', async (req, res) => {
    try {
        const lsp = await sanPhams.findOneAndUpdate({ bookID: req.params.id }, req.body)
        if (!lsp) throw Error("No items");
        res.status(200).json({ success: true });
    }
    catch (err) {
        res.status(400).json({ msg: err })
    }
})

module.exports = router;