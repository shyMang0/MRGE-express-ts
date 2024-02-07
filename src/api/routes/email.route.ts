import express from 'express'

import { emailTest } from '@/api/controllers/email.controller'

const router = express.Router()

router.get('/', emailTest)

export default router
