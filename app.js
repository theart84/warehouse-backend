const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const keys = require('./config/keys')
const bodyParser = require('body-parser');
const morgan = require('morgan');
const userRoute = require('./routes/user');
const productRoute = require('./routes/product');
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize());
require('./middleware/passport')(passport)
app.use('/api', userRoute);
app.use('/api', productRoute);

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  console.log('DB connected')
})


module.exports = app;
