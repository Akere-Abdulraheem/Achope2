const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const routes = require('./routes/router');
app.set('view engine', 'ejs');
app.set('views', 'server');
app.use(express.static('public'));
app.use('/',routes);
app.use(bodyParser.urlencoded({ extended: false }));
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

