const express = require('express')
const router = express.Router()
const {join} = require('path')
const Content = require(join(__dirname,'..','model','contentModel.js'))
const fs = require('fs')

router.get('/:id', async(req,res)=>{
    try {
        if(!res.locals.user){
            return res.render('/error')
        }
        const {id} = req.params;
        const data = await Content.findById(id).exec();

        return res.render('site/edit', {
            data:data.toJSON()
        })
        
    } catch (error) {
        console.log(error)
        return res.render('/error')
    }
})

router.post('/', async(req,res)=>{
    try {
        if(!res.locals.user){
            return res.json({
                case:false,
                mesage:'Unauthorized access'
            })
        }

        const {title ,content, id} = req.body
        const {file} = req.files 

        if(!title || !content || !id || !file) {
            return res.json({
                case:false,
                mesage:'Data did not send'
            })
        }

        const oldData = await Content.findById(id).exec();
        if (oldData && oldData.path) {
            const oldPath = join(__dirname, '..', 'public', oldData.path);
            fs.unlink(oldPath, (err) => {
                if (err) console.log('Eski resim silinirken hata:', err);
            });
        }

        const extension = file.mimetype.split('/')[1]
        const uniqueName = `${Date.now()}-${Math.round(Math.random()*1E9)}.${extension}`
        const pathName = join(__dirname, '..', 'public', 'images', 'content', uniqueName)

        file.mv(pathName, (err)=>{
            if(err!==undefined){
                return res.json({
                case:false,
                mesage:'Unexpected Error occured'
                })
            }

            Content.findByIdAndUpdate(id,{
                $set:{
                    title,
                    content,
                    path:`/images/content/${uniqueName}`
                }
            }).then(()=>{
                return res.json({
                    case:true,
                    message:'Content is updated successfully'
                })
            }).catch((err)=>{
                console.log(err)
                return res.json({
                    case:false,
                    message:'Unexpected an error occured'
                })
            })
        })

    
        
    } catch (error) {
        console.log(error)
        return res.json({
                case:false,
                mesage:'Unexpected Error Occured'
            })
    }
})

module.exports = router
