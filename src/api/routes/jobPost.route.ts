import express from 'express'

import { getAllJobPosts, createJobPost, getJobPost, deleteJobPost } from '../controllers/jobPosts.controller'

const router = express.Router()

router.get('/', getAllJobPosts)
router.post('/', createJobPost)
router.get('/:id', getJobPost)
router.delete('/:id', deleteJobPost)
// router.put('/:id', updateNote)

export default router
