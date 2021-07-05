var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'furnitureshopgroup6@gmail.com',
        pass: 'thanhpro123'
    }
});

const express = require('express')
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        var random = Math.floor(Math.random() * (999999));
        var mailOptions = {
            from: 'furnitureshopgroup6@gmail.com',
            to: req.body.email,
            subject: 'Xác nhận đơn hàng của bạn!!!',
            text: `Mã OTP: ${random}. Cảm ơn bạn đã lựa chọn công ty chúng tôi!!!`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.status(200).json(random);
    }
    catch (err) {
        res.status(400).json({ msg: err })
    }
})

module.exports = router;
