const express = require('express');
const Discount = require('./models/discount');
const router = express.Router();

router.get('/active-discount', async (req, res) => {
    const discount = await Discount.findOne();
    res.json(discount);
});

router.post('/join-discount', async (req, res) => {
    const { userId } = req.body;
    const discount = await Discount.findOne();
    
    if (discount.currentParticipants < discount.maxParticipants) {
        // Handle advance payment
        const newPayment = new ParticipantPayment({
            userId,
            discountId: discount._id,
            paymentAmount: discount.advancePayment,
            paymentDate: new Date(),
        });
        await newPayment.save();

        // Update participant count
        discount.currentParticipants += 1;
        await discount.save();

        res.json({ success: true, discount });
    } else {
        res.status(400).json({ success: false, error: 'Max participants reached' });
    }
});

 
module.exports = router;
