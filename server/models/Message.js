const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
    sendBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    message: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

module.exports = model('Message', messageSchema);