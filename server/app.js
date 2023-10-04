const express = require('express');
const app = express();
const port = 3000;
const routes = require('./routes/router');
app.set('view engine', 'ejs');
app.set('views', 'server');
app.use(express.static('public'));
app.use('/',routes);
app.listen(port, () => {
    console.log(`server is running port${port}`);
});