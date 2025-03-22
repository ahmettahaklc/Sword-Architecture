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