const mongoose = require('mongoose');

const discountSchema = new mongoose.Schema({
    discountPercentage: Number,
    minParticipants: Number,
    maxParticipants: Number,
    currentParticipants: Number,
    advancePayment: { type: Number, default: 5 },
});

const Discount = mongoose.model('Discount', discountSchema);

const participantPaymentSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    discountId: mongoose.Schema.Types.ObjectId,
    paymentAmount: Number,
    paymentDate: Date,
});

const ParticipantPayment = mongoose.model('ParticipantPayment', participantPaymentSchema);
module.exports = {Discount,ParticipantPayment};
