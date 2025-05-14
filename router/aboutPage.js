const express = require('express')
const router = express.Router()

const pageInfo = {
    title: 'Why U.S',
    subTitle: 'Design Architecture'
}

router.get('/', (req, res)=>{
    res.render('site/about', {pageInfo})
})

module.exports = router