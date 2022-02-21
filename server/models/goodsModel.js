const mongoose = require('mongoose')

const goodsSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: [true, 'Pls add a goods.']
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('Goods', goodsSchema)