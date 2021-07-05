const express = require('express')
const router = express.Router();

//loai san pham
const khachhangs = require('../../models/khachHang');

//get 1
router.post('/', async (req, res) => {
    try {
        const lsp = await khachhangs.find({ Email: req.body.Email });
        if (!lsp) throw Error("No items");
        res.status(200).json(lsp);
    }
    catch (err) {
        res.status(400).json({ msg: err })
    }
})
module.exports = router;