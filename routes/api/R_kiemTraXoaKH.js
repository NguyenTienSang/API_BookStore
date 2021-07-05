const express = require('express')
const router = express.Router();

const hoaDons = require('../../models/hoaDon');

router.get('/:CustomerID', async (req, res) => {
    try {
        const lsp = await hoaDons.find({ CustomerID: req.params.CustomerID });
        if (!lsp) throw Error("No items");
        res.status(200).json(lsp);
    }
    catch (err) {
        res.status(400).json({ msg: err })
    }
})

module.exports = router;
