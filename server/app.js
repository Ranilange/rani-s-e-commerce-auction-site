var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var dotenv = require('dotenv')
dotenv.config()
const port = 3000
const mongoose = require('mongoose');


mongoose
    .connect(process.env.DB, { useNewUrlParser: true })
    .then(() => console.log(`Database connected successfully`))
    .catch((err) => console.log(err));
mongoose.Promise = global.Promise;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productRouter = require('./routes/product')
var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product', productRouter)

app.listen(port, () => { console.log("listning to port 3000") })
module.exports = app;
