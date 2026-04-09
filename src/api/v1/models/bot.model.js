
const { model, Schema } = require('mongoose')
const bcrypt = require('bcrypt')

const DOCUMENT_NAME = 'BOT'
const COLLECTION_NAME = 'BOTs'

const botSchema = new Schema({
    fullName: {
        type: String,
        trim: true,
        maxLength: 55,
        require: true
    },
    description: String,
    isActive: {
        type: Boolean,
        default: false
    },
    performance: {
        winRate: {
            type: Number,
            default: 0
        },

        totalSignals: {
            type: Number,
            default: 0
        },

        avgProfit: Number
    },
    planAccess: [{
        type: Schema.Types.ObjectId,
        ref: 'Plan'
    }],



}, {
    timestamps: true,
    collection: COLLECTION_NAME
})


module.exports = model(DOCUMENT_NAME, botSchema)