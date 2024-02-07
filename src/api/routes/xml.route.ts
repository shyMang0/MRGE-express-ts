import express from 'express'

import { fetchXmlData } from '@/api/controllers/xml.controller'

const router = express.Router()

router.get('/', fetchXmlData)
// router.get('/generate', generateToken)
// router.post('/', createJobPost)
// router.get('/:id', getJobPost)
// router.delete('/:id', deleteJobPost)
// router.put('/:id', updateNote)

export default router
