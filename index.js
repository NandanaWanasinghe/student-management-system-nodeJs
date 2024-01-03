const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars').engine;
require('dotenv').config();

const app = express();
const severPort = process.env.SERVER_POTR || 3000;

//==========================================

const studentRouter = require('./routes/studentRouter');
const programRouter = require('./routes/programRouter');
const registrationRouter = require('./routes/registrationRouter');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static('public'));

app.engine('hbs', expressHandlebars({extname:'.hbs'}));
app.set('view engine', '.hbs');

app.use('/',studentRouter);
app.use('/',programRouter);
app.use('/',registrationRouter);

app.listen(severPort,()=>{
    console.log(`Server Started & Running On Port ${severPort}`);
});