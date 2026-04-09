const mongoose = require('mongoose')
const { Schema } = mongoose;

const DOCUMENT_NAME = 'Signal'
const COLLECTION_NAME = 'Signals'

const signalSchema = new mongoose.Schema(
    {
        stockCodeId: {
            type: Schema.Types.ObjectId,
            ref: 'Stock',
            require: true,
        },
        entry: {
            type: Number,
            min: 0,
            require: true
        },
        targetProfit: Number,
        stoploss: Number,
        type: {
            type: String,
            enum: ['buy', 'sell']
        },
        // resistance: Number,
        // support: Number,
        description: String,
        planAccess: [{ type: Schema.Types.ObjectId, ref: 'Plan' }],
        // AI / broker tạo
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            default: null
        },
        botId: {
            type: Schema.Types.ObjectId,
            ref: 'Bot',
            default: null
        },
        // (createdBy != null && botId == null)
        // OR
        // (createdBy == null && botId != null)
        // middleware
        // signalSchema.pre('save', function(next) {
        //     if (!this.createdBy && !this.botId) {
        //         return next(new Error('Signal must have creator'))
        //     }

        //     if (this.createdBy && this.botId) {
        //         return next(new Error('Signal cannot have both user and bot'))
        //     }

        //     next()
        // })
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected'],
            default: 'pending'
        },
        rejectReason: String,
        approvedBy: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        approvedAt: Date,
        isPinned: Boolean,
        performance: {
            maxProfit: Number, // %
            maxLoss: Number,   // %
            status: {
                type: String,
                enum: ['running', 'win', 'lose']
            }
        },
        // ý tưởng:....
        // publishedAtVIP = now
        // publishedAtFree = now + 5 phút
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
signalSchema.index({ status: 1, publishedAt: -1 })
signalSchema.index({ planAccess: 1 })

module.exports = mongoose.model(DOCUMENT_NAME, signalSchema)