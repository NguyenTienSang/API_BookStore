const express = require('express')
const router = express.Router();

// get searching
const sanPhams = require('../../models/sanPham');


router.get('/:value', async (req, res) => {
    try {
        const lsps = await sanPhams.find({ BookDescription:{$regex: req.params.value,$options: '$i'}});
        if (!lsps) throw Error("No items");
        res.status(200).json(lsps);
    }
    catch (err) {
        res.status(400).json({ msg: err })
    }
})

module.exports = router;