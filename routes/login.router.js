const express 	= require('express')
const router 	= express.Router()
const LoginCtrl  	= require('../controllers/login.controller')

// Rotas permitidas
router.get('/', (req, res, next) => { res.json({ msg: 'voce pode logar!' }) })
router.get('/authenticate', (req, res, next) => { res.json({ msg: 'voce pode logar!' }) })
router.post('/authenticate', LoginCtrl.Authenticate )

router.use(LoginCtrl.Verify)

//  Rotas negadas
router.get('/posts', (req, res, next) => { res.json({ msg: 'ola mundo' }) })
router.get('/users', (req, res, next) => { res.json({ msg: 'ola mundo' }) })

module.exports = router