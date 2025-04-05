const express = require('express')
const router = express.Router()
const {join} = require('path')
const User = require(join(__dirname, '..', 'model', 'userModel.js'))

router.get('/', (req, res)=>{
    if(res.locals.user){
        return res.redirect('/error')
    }
    res.render('site/login')
})

router.post('/', async(req, res)=>{
    try {
        if(res.locals.user){
            return res.json({
                case: false,
                message: 'User is already logged.'
            })        
        }
        
        let  {username, password} = req.body
        
        const userControl = await User.find({'username':username, 'password':password}).exec()

        console.log(username, password)

        console.log(userControl)

        if(userControl.length != 1){
            return res.json({
                case: false,
                message: 'username or password is not correct'
            })
        }

        let ID = userControl[0]._id
        ID = String(ID)
        req.session.userID = ID 

        return res.json({
            case: true,
            message: 'login process is succesfull you are redirected'
        })

    } catch (error) {
        console.log(error)
        return res.json({
            case: false,
            message: 'An unexpected error occured.'
        })
    }
})

module.exports = router