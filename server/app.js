const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const routes = require('./routes/router');
// const ejs = require('ejs');
app.set('view engine', 'ejs');
app.set('views', __dirname + 'server/views'); 
app.use(express.static('public'));
app.use('/',routes);
const dotenv = require('dotenv').config();
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});