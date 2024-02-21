import express from 'express'

import { redistTest } from '@/api/controllers/queues.controller'

const router = express.Router()

router.get('/', redistTest)

export default router
