const express = require('express')
const router = express.Router();

const chiTietHoaDons = require('../../models/CTHD');

router.get('/:bookID', async (req, res) => {
    try {
        const lsp = await chiTietHoaDons.find({ bookID: req.params.bookID });
        if (!lsp) throw Error("No items");
        res.status(200).json(lsp);
    }
    catch (err) {
        res.status(400).json({ msg: err })
    }
})

module.exports = router;
