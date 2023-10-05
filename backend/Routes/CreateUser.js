const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const jwtSecret = "MyprojectnameisWeeklyGroupBy";

// Custom validation function to validate either email or phone number
const validateEmailOrPhone = (value, { req }) => {
    if (!value && !req.body.MobileNumber) {
        throw new Error('Enter a valid Email or Phone Number');
    }
    return true;
};

router.post("/CreateUser", [
    body('name').isLength({ min: 4 }),
    body('ChairmanName').isLength({ min: 4 }).notEmpty(),
    body('Chairmanemail', 'Incorrect Email').isEmail().notEmpty(),
    body('Wings').isLength({ min: 2 }).notEmpty(),
    body('Pincode').isLength({ min: 2 }).notEmpty(),
    body('MobileNumber').isLength({ min: 10 }).notEmpty(),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        await User.create({
            name: req.body.name,
            address: req.body.address,
            ChairmanName: req.body.ChairmanName,
            Chairmanemail: req.body.Chairmanemail,
            Wings: req.body.Wings,
            Pincode: req.body.Pincode,
            MobileNumber: req.body.MobileNumber
        });

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.json({ success: false });
    }
});


router.post("/loginUser", [
    body('email', 'Incorrect Email').isEmail().notEmpty(),
    body('MobileNumber').isLength({ min: 10 }).notEmpty(),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        await User.login({
            email: req.body.email,
            MobileNumber: req.body.MobileNumber
        });

        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.json({ success: false });
    }
});

module.exports = router;
