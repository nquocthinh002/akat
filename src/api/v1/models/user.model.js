
const { model, Schema } = require('mongoose')
const bcrypt = require('bcrypt')

const DOCUMENT_NAME = 'User'
const COLLECTION_NAME = 'Users'

const userSchema = new Schema({

    fullName: {
        type: String,
        trim: true,
        maxLength: 55,
        require: true
    },

    email: {
        type: String,
        unique: true,
        trim: true,
        require: true
    },
    phone: {
        type: String,
        unique: true,
        sparse: true
    },
    password: { type: String, requrire: true },

    role: { // luon giu lai superAdmin de tuy chinh, moderator giao cho khach
        type: String,
        enum: ['superAdmin', 'moderator', 'assistant','broker', 'user'],
        default: 'user'
    },

    isActive: {
        type: Boolean,
        default: false,
    },
    
    // dành riêng cho broker , tách thành bảng riêng
    // brokerInfo: {
    //     experience: String,
    //     description: String,

    //     // số khách đang chăm
    //     totalClients: {
    //         type: Number,
    //         default: 0
    //     },
    // }


    verificationToken: String,
    refreshToken: String,
    passwordChangedAt: String,
    passwordResetToken: String,
    passwordResetExpires: Date,

}, {
    timestamps: true,
    collection: COLLECTION_NAME
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();
    const salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods = {
    isCorrectPassword: async function (password) {
        return await bcrypt.compare(password, this.password);
    },
    createPasswordChangedToken: function () {
        const resetToken = crypto.randomBytes(64).toString('hex');
        this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // ten minutes
        return resetToken;
    }
}

module.exports = model(DOCUMENT_NAME, userSchema)