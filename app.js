const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const userRoute = require('./routes/user');
const productRoute = require('./routes/product');
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', userRoute);
app.use('/api', productRoute);

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  console.log('DB connected')
})


module.exports = app;