require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const compression = require('compression')
const cors = require('cors')
const cookieParser = require('cookie-parser');
const { createServer } = require('node:http');


const app = express()
const server = new createServer(app)

// init middleware
app.use(compression())
app.use(helmet())
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: 'GET,POST,PUT,PATCH,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))


// init database
require('./api/v1/databases/init.mongodb')

// init routes 
app.use('/', require('./api/v1/routes'))


// handling error

module.exports = server