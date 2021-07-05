const express = require('express')
const router = express.Router();

// get searching
const loaiSanPhams = require('../../models/loaiSanPham');


router.get('/:value', async (req, res) => {
    try {
        const lsps = await loaiSanPhams.find({ CategoryDescription:{$regex: req.params.value,$options: '$i'}});
        if (!lsps) throw Error("No items");
        res.status(200).json(lsps);
    }
    catch (err) {
        res.status(400).json({ msg: err })
    }
})

module.exports = router;