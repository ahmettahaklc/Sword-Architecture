const express = require('express')
const router = express.Router()
const {join} = require('path')
const Content = require(join(__dirname, '..', 'model', 'contentModel.js'))


const pageInfo = {
    title: 'Sword',
    subTitle: "Architecture"
}

router.get('/', async(req, res)=>{
    try { 
        const content = await Content.find().exec()
        console.log(content)
        return res.render('site/index', {
            pageInfo,
            allData: content.map(item=>item.toJSON())
        }) 
    } catch (error) {
        console.log(error)
        return res.redirect('/error')
    }
})

module.exports = router