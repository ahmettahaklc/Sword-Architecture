const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
    res.render('site/register')
})

router.get('/data', (req, res)=>{
    console.log(req.query)       
})

router.post('/', (req, res)=>{
    console.log(req.body)       
})


router.get('/data/:id', (req, res)=>{
    console.log(req.params) 
})

module.exports = router

/*
* req.body = post 
* req.query = {get, put, delete}
* req.params = {get, put, delete}
*/