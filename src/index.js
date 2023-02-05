const express = require('express')
const mongoose = require('mongoose')

const router = require("./route/routes")
mongoose.set('strictQuery', true)

const app = express()
app.use(express.json())


mongoose.connect("mongodb+srv://Pal25:Pallavi2552@cluster0.hihf8kq.mongodb.net/Company-Assignment-5")
.then(() => console.log("mongoDB is connected"))
.catch((error) => console.error(error))


app.use('/', router)

app.listen(3000, () => {
      console.log("Express app running on port " + 3000)
})