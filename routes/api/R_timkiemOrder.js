const express = require('express')
const router = express.Router();

// get searching
const hoaDons = require('../../models/hoaDon');


router.get('/:value', async (req, res) => {
    try {
        const lsps = await hoaDons.find({ OrderID:req.params.value});
        if (!lsps) throw Error("No items");
        res.status(200).json(lsps);
    }
    catch (err) {
        res.status(400).json({ msg: err })
    }
})

module.exports = router;