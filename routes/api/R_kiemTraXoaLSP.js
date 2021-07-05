const express = require('express')
const router = express.Router();

const sanPhams = require('../../models/sanPham');

router.get('/:CategoryID', async (req, res) => {
    try {
        const lsp = await sanPhams.find({ CategoryID: req.params.CategoryID });
        if (!lsp) throw Error("No items");
        res.status(200).json(lsp);
    }
    catch (err) {
        res.status(400).json({ msg: err })
    }
})

module.exports = router;
