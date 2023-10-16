const express = require("express");
const router = express.Router();
const shortid = require('shortid')
const Razorpay = require('razorpay')

const razorpay = new Razorpay({
    key_id: 'rzp_test_HtRukrIkQZiCBQ',
    key_secret: 'XeaA6UrksJ3y2fX9hnFgw5ts'
})
router.post('/razorpayToken/:quantity', async (req, res) => {
    let quantity = req.params.quantity
    console.log(quantity)
    const payment_capture = 1
    const amount = 5 * quantity
    const currency = 'INR'

    const options = {
        amount: amount * 100,
        currency,
        receipt: shortid.generate(),
        payment_capture
    }
    console.log(options, "option")
    try {
        const response = await razorpay.orders.create(options)

        res.json({
            id: response?.id,
            currency: response?.currency,
            amount: response?.amount
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router