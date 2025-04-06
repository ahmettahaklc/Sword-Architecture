const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
    if(!res.locals.user){
        return res.redirect('/error')
    }
    
    return res.render('site/addProject')
})

router.post('/', (req, res)=>{
    try {
        if(!res.locals.user){
            return res.json({
                case: false,
                message: 'Yetkisiz erişim'
            })
        }
        if(!req.body || !req.files){
            return res.json({
                case: false,
                message: 'data could not be transmitted, req.body req.files'
            })
        }

        const {title, content} = req.body
        const {file} = req.files

        if(!title || !content || !file ){
            return res.json({
                case: false,
                message: 'data could not be transmitted, single data'
            })
        }

        if(file.size > 1024 * 1024 * 5){
            return res.json({
                case: false,
                message: 'File size is too big'
            })    
        }

        if(file.mimetype == 'img/jpeg' || file.mimetype == 'img/png' || file.mimetype == 'img/jpg'){

        }
        else{
            return res.json({
                case: false,
                message: 'File type is not correct'
            })    
        }
        
        return res.json({
            case: true,
            message: 'Process continues'
        })

    } catch (error) {
        console.log(error)
        return res.json({
            case: false,
            message: 'Unexpected error is occured'
        })
    }
})

module.exports = router