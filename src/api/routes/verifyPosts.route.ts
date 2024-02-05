import express from 'express'

import { verifyListing } from '@/api/controllers/verifyPosts.controller'

const router = express.Router()

router.get('/', verifyListing)
// router.post('/', createJobPost)
// router.get('/:id', getJobPost)
// router.delete('/:id', deleteJobPost)
// router.put('/:id', updateNote)

export default router
