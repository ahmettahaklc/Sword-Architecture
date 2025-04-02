const { error } = require('console')
const express = require('express')
const router = express.Router()
const {join} = require('path')
const { json } = require('stream/consumers')
const User = require(join(__dirname, '..', 'model', 'userModel.js'))

router.get('/', (req, res)=>{
    res.render('site/register')
})

router.post('/', async(req, res)=>{
    try {
        if(!req.body){
            return res.json({
                case: false,
                message: 'Data could not be sent! Req.body'
            })
        }

        const {username, password} = req.body

        if(!username || !password){
            return res.json({
                case: false,
                message: 'Data could not be sent! single data'
            })
        }

        const usernameRegex = new RegExp("^[a-zA-Z0-9]{1,12}$");
        if (!usernameRegex.test(username)) {
            return res.json({
                case: false,
                message: 'Invalid username! Must be max 12 characters and contain only letters and numbers.'
            });
        }

        if (password.length < 8 || password.length > 15) {
            return res.json({
                case: false,
                message: 'Invalid password! Must be between 8 and 15 characters.'
            });
        }

        const userControl = await User.find({'username':username}).exec()   

        if(userControl.length!=0){
            return res.json({
                case:false,
                message: 'this email has been taken!'     
            })    
        }

        const user = new User({
            'username': username,
            'password': password
        })

        user.save().then(()=>{
            return  res.json({
                case: true,
                message: 'Registration is successfull'
            })
        }).catch((err)=>{
            console.log(err)
            return res.json({
                case: false,
                message: 'Unexpacted error'
            })
        })

    } catch (error) {
        console.log(error)
        return res.json({
            case:false,
            message: 'Unexpected Error!'
        })
    }
})

module.exports = router
