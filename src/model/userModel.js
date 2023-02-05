const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    orderNumber: {
        type: Number,
        default: 0
    },
    // orderList: {
    //     type: ObjectId,
    //     ref: 'product'
    // },
    balance: {
        type: Number,
        default: 100
    },
    category: {
        type: String,
        enum: ["regular", "gold", "platinum"],
        default: "regular"
    }



})

module.exports = mongoose.model('user', userSchema);