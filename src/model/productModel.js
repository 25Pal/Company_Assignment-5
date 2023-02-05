const mongoose = require('mongoose')
const ObjectId=mongoose.Schema.Types.ObjectId;

const productSchema = new mongoose.Schema({
    productName:String,
    price:{
        type:Number,default:100
    },
    productQuantity:{
        type:Number,
        default:1
    }

    

})


module.exports=mongoose.model('product',productSchema);