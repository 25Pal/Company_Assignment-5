const userModel = require('../model/userModel')
const productModel = require('../model/productModel')
const orderModel = require('../model/orderModel')

const createUser = async function (req, res) {
    try {
        const body = req.body;
        let data = await userModel.create(body);
        return res.status(201).send({ status: true, message: "Register succesfully", Data: data });
    } catch (err) {
        return res.status(400).send({ status: false, message: err.message });
    }
}

const createProduct = async function (req, res) {
    const body = req.body;
    let data = await productModel.create(body);
    return res.status(201).send({ status: true, message: "Product added..", Data: data })
}

const createOrder = async function (req, res) {
    try {

        const body = req.body;
        const { userId, demandQuantity, productName, orderStatus, paymentStatus } = body;
        let checkuser = await userModel.findById({ _id: userId });
        if (!checkuser) {
            return res.status(400).send({ status: false, message: 'user not fount' })
        }

        let checkProduct = await productModel.findOne({ productName: productName, productQuantity: { $gte: 1 } });
        if (!checkProduct) {
            return res.status(400).send({ status: false, message: 'Product is not available now' })
        }

        let price = checkProduct.price;

        if (demandQuantity > checkProduct.productQuantity) {

            let remain = demandQuantity - checkProduct.productQuantity;
            return res.status(409).send({ status: false, message: `Please reduce your demand quantity by ${remain} . Because we dont have this much product quantity` })
        };

        let totalPrice = price * demandQuantity;//100*5=500
        let category = "regular";
        if (checkuser.category == "gold") {
            discount = totalPrice * 0.1;//500*0.1=50;//500-50=450
            totalPrice = totalPrice - discount;
        };

        if (checkuser.category == "platinum") {
            discount = totalPrice * 0.2;
            totalPrice = totalPrice - discount;
        };

        if (totalPrice > checkuser.balance) {
            let requiredBal= totalPrice  -checkuser.balance;
            return res.status(400).send({ status: false, message: `Insufficient Balance... . You must have ${requiredBal}₹ extra to buy this product.` });
        };

        if (checkuser.orderNumber >= 10 && checkuser.orderNumber <= 19) {

            category = "gold";
        } else if (checkuser.orderNumber >= 20) {
            category = "platinum";
        }

        let Data = await orderModel.create(body);


        let updateBal = checkuser.balance - totalPrice;//
        await userModel.findByIdAndUpdate({ _id: userId }, { $set: { category: category, balance: updateBal }, $inc: { orderNumber: 1 } });

        await productModel.findOneAndUpdate({ productName: productName }, { $inc: { productQuantity: -demandQuantity } });

        return res.status(201).send({ status: true, message: "Order created", OrderData: Data });

    }catch(err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}
module.exports = { createUser, createProduct, createOrder }