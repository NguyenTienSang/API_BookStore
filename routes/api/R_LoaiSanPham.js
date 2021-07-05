const express = require('express')
const router = express.Router();

//loai san pham
const loaiSanPhams = require('../../models/loaiSanPham');

//get all
router.get('/', async (req, res) => {
    try {
        const lsps = await loaiSanPhams.find();
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
        const lsps = await loaiSanPhams.find({ CategoryID: req.params.id });
        if (!lsps) throw Error("No items");
        res.status(200).json(lsps);
    }
    catch (err) {
        res.status(400).json({ msg: err })
    }
})

//create
router.post('/', async (req, res) => {
    const newLoaiSanPham = new loaiSanPhams(req.body);
    try {
        const loaiSanPham = await newLoaiSanPham.save();
        if (!loaiSanPham) throw Error("Something went wrong loaisanpham");
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
        const lsp = await loaiSanPhams.findOneAndDelete({ CategoryID: req.params.id })
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
        const lsp = await loaiSanPhams.findOneAndUpdate({ CategoryID: req.params.id }, req.body)
        if (!lsp) throw Error("No items");
        res.status(200).json({ success: true });
    }
    catch (err) {
        res.status(400).json({ msg: err })
    }
})

module.exports = router;