const mongoose = require('mongoose')
const ObjectId=mongoose.Schema.Types.ObjectId;

const orderSchema = new mongoose.Schema({
    productId:{
        type:ObjectId,
        ref:'product'
    },
    userId:{
        type:ObjectId,
        ref:'user'
    },
    demandQuantity:{
        type:Number,
        default:1
    },
    productName:String,
    orderStatus:{
        type:Boolean,
        default:true
        
    },
    paymentStatus:{
        type:Boolean,
        default:true
    }

})

module.exports=mongoose.model('order',orderSchema);