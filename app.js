// First Method: CommonJS
const express = require('express');


// Second Method
//import express from 'express'


const {engine} = require('express-handlebars')
const expressSession = require('express-session')
const fileUpload = require('express-fileupload')
const dotenv = require('dotenv')
const path = require('path')
const dbs = require(path.join(__dirname, 'dbs.js'))


//DB Connect
dbs()


//Start Settings
dotenv.config()
const app = express()


//Variables
const time = 1000 * 60 * 30


//The area where template engine is located
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))


//Middleware
app.use(express.json())
app.use(fileUpload())
app.use(expressSession({
    secret:'myBlog',
    resave:false,
    saveUninitialized:true,
    cookie:{path:'/',httpOnly:true,secure:false,maxAge:time}
}))
app.use(express.static(path.join(__dirname, 'public')))


app.listen(5000, ()=>{
    console.log(`Server is running http://127.0.0.1:5000`)
})

