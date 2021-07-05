const express = require('express')
const router = express.Router();

//loai san pham
const khachHangs = require('../../models/khachHang');


router.post('/', async (req, res) => {
    try {
        const kh = await khachHangs.find({ Email: req.body.Email, Password: req.body.Password });
        if (!kh) throw Error("Login fail");
        res.status(200).json(kh);
    }
    catch (err) {
        res.status(400).json({ msg: err })
    }
})

module.exports = router;