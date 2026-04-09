const mongoose = require('mongoose')

const DOCUMENT_NAME = 'Subscription'
const COLLECTION_NAME = 'Subscriptions'

const subscription = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        planId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Plan',
            required: true
        },
        startDate: Date,
        endDate: Date,
        status: {
            type: String,
            enum: ['active', 'expired', 'inactive'],
            default: 'inactive'
        },
        // paymentId: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: '???',

        // }
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME
    }
)

module.exports = mongoose.model(DOCUMENT_NAME, subscription)