const mongoose = require('mongoose')
const { Schema } = mongoose;

const DOCUMENT_NAME = 'Stock'
const COLLECTION_NAME = 'Stocks'

const stockSchema = new mongoose.Schema(
    {
        stock: {
            type: String,
            trim: true,
            maxLength: 3,
            require: true,
            unique: true,
            uppercase: true
        },
        priceClose: Number,
        description: String,
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
stockSchema.index({ stock: 1 }, { unique: true })
module.exports = mongoose.model(DOCUMENT_NAME, stockSchema)