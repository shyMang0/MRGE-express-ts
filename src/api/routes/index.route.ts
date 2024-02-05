import express from 'express'
import mainRoute from './root.route'
import notesRoute from './notes.route'
import jobPostRoute from './jobPost.route'

const router = express.Router()

router.use('/', mainRoute)
router.use('/notes', notesRoute)
router.use('/jobPosts', jobPostRoute)

/*========== CATCH INVALID ROUTES ========== */
router.all('*', (req, res) => {
	res.status(404).json({ message: 'invalid route' })
})

export default router
