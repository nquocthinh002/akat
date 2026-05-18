const mongoose = require('mongoose')
const { Schema } = mongoose;

const DOCUMENT_NAME = 'Post'
const COLLECTION_NAME = 'Posts'

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            require: true
        },
        imageUrl: String,
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

module.exports = mongoose.model(DOCUMENT_NAME, postSchema)