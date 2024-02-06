import express from 'express'

import { getAlljobListings, createjobListing, getjobListing, deletejobListing, getAllSpamPosts } from '@/api/controllers/jobListings.controller'

const router = express.Router()

router.get('/', getAlljobListings)
router.get('/spam', getAllSpamPosts)
router.post('/', createjobListing)
router.get('/:id', getjobListing)
router.delete('/:id', deletejobListing)
// router.put('/:id', updateNote)

export default router
