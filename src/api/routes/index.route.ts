import express from 'express'
import mainRoute from './root.route'
import jobListingsRoute from './jobListings.route'
import verifyPostsRoute from './verifyPosts.route'
import xmlRoute from './xml.route'
import queueRoute from './queue.route'

const router = express.Router()

router.use('/', mainRoute)
router.use('/jobListings', jobListingsRoute)
router.use('/verifyPosts', verifyPostsRoute)
router.use('/xml', xmlRoute)
router.use('/queue', queueRoute)

/*========== CATCH INVALID ROUTES ========== */
router.all('*', (req, res) => {
	res.status(404).json({ message: 'invalid route' })
})

export default router
