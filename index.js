const express = require('express');

const mongoose = require('mongoose');

const cors = require('cors');




const userRoutes = require('./routes/user');
const moviesRoutes = require('./routes/movie');
// const cartRoutes = require('./routes/cart');
// const orderRoutes = require('./routes/order');




//http://localhost
const app = express();
// http://localhost/4000
const port = 4000;



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


mongoose.connect("mongodb+srv://admin:admin1234@cluster0.ueygpyw.mongodb.net/Movie-Catalog-API?retryWrites=true&w=majority")

db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => console.log("We're connected to MongoDB Atlas"));




// http://localhost/4000/users
app.use('/users', userRoutes);
// http://localhost/4000/movies
app.use('/movies', moviesRoutes);
// http://localhost/4000/carts
// app.use('/b2/cart', cartRoutes);
// http://localhost/4000/orders
// app.use('/b2/orders', orderRoutes);




if(require.main === module) {
    //process.env.PORT is an environment port- will not be used in this session
    app.listen(process.env.PORT || port, () => console.log(`API is now online on port ${process.env.PORT || port}`))
}


module.exports = {app, mongoose}