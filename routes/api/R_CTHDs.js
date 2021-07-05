const express = require('express')
const router = express.Router();

//loai san pham
const chiTietHoaDons = require('../../models/CTHD');

//get all
router.get('/', async (req, res) => {
    try {
        const cthds = await chiTietHoaDons.find();
        if (!cthds) throw Error("No items");
        res.status(200).json(cthds);
    }
    catch (err) {
        res.status(400).json({ msg: err })
    }
})

//get all of orderID
router.get('/:OrderID', async (req, res) => {
    try {
        const cthds = await chiTietHoaDons.find({ OrderID: req.params.OrderID });
        if (!cthds) throw Error("No items");
        res.status(200).json(cthds);
    }
    catch (err) {
        res.status(400).json({ msg: err })
    }
})

//get all of orderID
router.get('/:OrderID/:bookID', async (req, res) => {
    try {
        const cthds = await chiTietHoaDons.find({ OrderID: req.params.OrderID, bookId: req.params.bookID });
        if (!cthds) throw Error("No items");
        res.status(200).json(cthds);
    }
    catch (err) {
        res.status(400).json({ msg: err })
    }
})

//create
router.post('/:OrderID', async (req, res) => {
    const newCTHD = new chiTietHoaDons(req.body);
    try {
        const cthds = await chiTietHoaDons.find({ OrderID: req.params.OrderID });
        if (!cthds) throw Error("No items");
        const cthd = await newCTHD.save();
        if (!cthd) throw Error("Something went wrong CTHD");
        res.status(200).json(cthd);
    }
    catch (err) {
        res.status(400).json({ msg: err })
    }
})
//delete
// api/sanpham/:id
router.delete('/:OrderID/:bookID', async (req, res) => {
    try {
        const cthd = await chiTietHoaDons.findOneAndDelete({ OrderID: req.params.OrderID, bookID: req.params.bookID });
        if (!cthd) throw Error("No items");
        res.status(200).json({ success: true });
    }
    catch (err) {
        res.status(400).json({ msg: err })
    }
})
//update
// api/sanpham/:id
router.put('/:OrderID/:bookID', async (req, res) => {
    try {
        const cthd = await chiTietHoaDons.findOneAndUpdate({ OrderID: req.params.OrderID, bookID: req.params.bookID },req.body);
        if (!cthd) throw Error("No items");
        res.status(200).json({ success: true });
    }
    catch (err) {
        res.status(400).json({ msg: err })
    }
})


module.exports = router;