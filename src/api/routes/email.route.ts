import express from 'express'

import { emailTest } from '@/api/controllers/email.controller'

const router = express.Router()

router.get('/', emailTest)
// router.post('/', createJobPost)
// router.get('/:id', getJobPost)
// router.delete('/:id', deleteJobPost)
// router.put('/:id', updateNote)

export default router
