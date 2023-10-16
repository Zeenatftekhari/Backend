const express = require('express')
const router = express.Router()
router.post('/TokenPaymentVerification', (req, res) => {
    // do a validation
    const secret = 'p-r-k-h-t@2-0-test'

    console.log(req.body)

    const crypto = require('crypto')

    const shasum = crypto.createHmac('sha256', secret)
    shasum.update(JSON.stringify(req.body))
    const digest = shasum.digest('hex')

    console.log(digest, req.headers['x-razorpay-signature'])

    if (digest === req.headers['x-razorpay-signature']) {
        console.log('request is legit')
        // process it
        require('fs').writeFileSync('payment1.json', JSON.stringify(req.body, null, 4))
    } else {

    }
    res.json({
        status: 'ok',
        data: [req.body]
    })
})
module.exports = router