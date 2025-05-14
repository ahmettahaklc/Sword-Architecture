const { error } = require('console')
const express = require('express')
const router = express.Router()
const{join} = require('path')
const Content = require(join(__dirname, '..', 'model', 'contentModel.js'))

const nowTime = ()=>{
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const allName = `${day}.${month+1}.${year}`
    return allName 
}

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

        if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/jpg'){
            const extension = file.mimetype.split('/')[1]
            const uniqueName = `${Date.now()}-${Math.round(Math.random()*1E9)}.${extension}`
            const pathName = join(__dirname, '..', 'public', 'images', 'content', uniqueName)
            file.mv(pathName, (err)=>{
                if(err!=undefined){
                    return res.json({
                        case: false,
                        message: 'File could not added' 
                    })
                }
                else{
                    const db = new Content({
                        title,
                        content,
                        'path': `/images/content/${uniqueName}`,
                        date:nowTime()
                    })

                    db.save().then(()=>{
                        return res.json({
                            case: true,
                            message: 'Data added successfully'
                        })
                    }).catch(err=>{
                        console.log(err)
                        return res.json({
                            case: false,
                            message: 'A error occured while saving to DB'
                        })
                    })
                }    
            }) 
        }
        else{
            return res.json({
                case: false,
                message: 'File type is not correct'
            })    
        }
    
    } catch (error) {
        console.log(error)
        return res.json({
            case: false,
            message: 'Unexpected error is occured'
        })
    }
})

module.exports = router