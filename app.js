const express = require("express");
const mongoose = require('mongoose');   
require ("dotenv").config();   
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//import routes
const authRoutes = require('./routes/authRoutes')
const userRoutes = require("./routes/userRoute");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const braintreeRoutes = require("./routes/braintreeRoutes");
const orderRoutes = require("./routes/ordersRoutes");
//app
const app = express();
//db
mongoose.connect(process.env.DATABASE,{
}).then(() => console.log("DB connected"));

//middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
// app.use(cors({
//     origin: 'http://localhost:3000/',
//     credentials: true, 
//   }));

//routes
app.use('/auth',authRoutes);
app.use("/user", userRoutes);
app.use("/category", categoryRoutes);
app.use("/product", productRoutes);
app.use("/braintree", braintreeRoutes);
app.use("/order", orderRoutes);

const port=process.env.PORT || 8000;
app.listen(port, () =>{
    console.log(`server is running on port ${port}`)
});