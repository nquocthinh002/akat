const mongoose = require('mongoose')

const DOCUMENT_NAME = 'ServiceUsage'
const COLLECTION_NAME = 'ServiceUsages'

const serviceUsage = new mongoose.Schema(
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
        brokerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        status: {
            type: String,
            enum: ['pending', 'processing', 'completed', 'canceled'],
            default: 'pending'
        },
        noteBroker: String,
        noteAssistant: String,
        noteAdmin: String

    },
    {
        timestamps: true,
        collection: COLLECTION_NAME
    }
)

module.exports = mongoose.model(DOCUMENT_NAME, serviceUsage)