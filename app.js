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
const crypto = require('crypto')


//DB Connect
dbs()


//Start Settings 
dotenv.config()
const app = express()


//Variables
const time = 1000 * 60 * 30
const SECRET_VALUE = process.env.SECRET_VALUE || 'myBlog'
const PORT = process.env.PORT || '5000'
const API_URL = process.env.API_URL || 'http://127.0.0.1:5000'


//The area where template engine is located
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))


//Middleware
app.use(express.json())
app.use(fileUpload())
app.use(expressSession({
    secret:SECRET_VALUE,
    resave:false,
    saveUninitialized:true,
    cookie:{path:'/',httpOnly:true,secure:false,maxAge:time}
}))
app.use(express.static(path.join(__dirname, 'public')))

//* Router defining area
const indexPage = require(path.join(__dirname, 'router', 'indexPage.js'))
const aboutPage = require(path.join(__dirname, 'router', 'aboutPage.js'))
const addPage = require(path.join(__dirname, 'router', 'addPage.js'))
const loginPage = require(path.join(__dirname, 'router', 'loginPage.js'))

//* Router using area
app.use('/', indexPage)
app.use('/about', aboutPage)
app.use('/addProject', addPage)
app.use('/login', loginPage)
app.use('*', (req, res, next)=>{
    res.render('site/error')
})


app.listen(PORT, ()=>{
    console.log(`Server is running ${API_URL}`)
})



