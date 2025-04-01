const express = require('express')
const router = express.Router()

router.get('/', (req, res)=>{
    res.render('site/register')
})

router.post('/', (req, res)=>{
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

        return res.json({
            case: true,
            message: 'Transaction is successfull'
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
