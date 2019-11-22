require('dotenv').config();
const hbs = require('express-handlebars');
const path = require ('path')
const express = require ('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const routes = require ('./routes/routes')

const app = express ();

mongoose.connect(process.env.key, {
    useNewUrlParser: true
});

app.use (express.static(path.join(__dirname, 'views')));

app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json())

app.use ('/', routes);

app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: 'hbs'
}));

app.set ('view engine', '.hbs')

app.listen (3000, () => {
    console.log('server on 3000');
    
})
