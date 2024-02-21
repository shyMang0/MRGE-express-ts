import express from 'express'

const router = express.Router()
router.get('/', (req, res) => {
	res.json({ message: 'get index' })
	// const data = {
	// 	pageTitle: 'Example Page',
	// 	message: 'Hello from Express!'
	// }

	// res.render('home', data)
})

router.post('/', (req, res) => {
	res.json({ message: 'post index' })
})

export default router
