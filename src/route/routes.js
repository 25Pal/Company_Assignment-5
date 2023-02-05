const express=require('express');
const route=express.Router();

const { createUser, createProduct, createOrder }= require('../controller/MainController')

route.post('/createUser',createUser);
route.post('/createProduct',createProduct);
//route.get('/getProduct',getProduct);
route.post('/createOrder',createOrder);

module.exports=route;