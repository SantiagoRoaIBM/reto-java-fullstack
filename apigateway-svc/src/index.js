const express = require('express');
const engine = require('ejs-mate');

const path = require('path');
const app = express();

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(require('./routes/'));
app.use(express.static(path.join(__dirname, 'public')));



app.listen(3000, () => {
    console.log('Server listening on port 3000');
});