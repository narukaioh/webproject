const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
	res.send({ users: [] })
})

router.post('/',(req, res) => {
	console.log(req.body)
	res.send({ message: 'Usuario cadastrado com sucesso!' })
})

router.get('/:productId', (req, res, next) => {})

router.put('/:productId', (req, res) => {})
router.delete('/:productId', (req, res) => {})

module.exports = router
