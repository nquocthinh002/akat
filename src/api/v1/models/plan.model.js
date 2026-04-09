const mongoose = require('mongoose')

const DOCUMENT_NAME = 'Plan'
const COLLECTION_NAME = 'Plans'

const planSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            maxLength: 50,
            require: true,
        },
        price: {
            type: Number,
            min: 0,
            require: true,
            default: 1000000000
        },
        duration: {
            type: Number,
            min: 0,
            require: true
        },
        type: {
            type: String,
            enum: ['subscription', 'service'],
            default: 'subscription'
        },
        description: String,
        isActive: Boolean,
        deleted: {
            type: Boolean,
            default: false
        },
        deletedAt: Date
    },
    {
        timestamps: true,
        collection: COLLECTION_NAME
    }
)

module.exports = mongoose.model(DOCUMENT_NAME, planSchema)