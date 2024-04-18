const { Signup, Login, GetUserDetails, GetTopScorers, UpdateScore } = require('../controllers/userController');
const router = require('express').Router()

router.post('/signup', Signup)
router.post('/login', Login)
router.get('/getuser/:id', GetUserDetails)
router.get('/gettopusers', GetTopScorers)
router.put('/updatescore', UpdateScore)

module.exports = router;