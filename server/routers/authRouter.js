const router = require('express').Router();
const googleLogin=require('../controller/authController')

router.get('/test', (req, res) => {
    res.send('Test pass')
})
router.post('/google',googleLogin)

module.exports= router