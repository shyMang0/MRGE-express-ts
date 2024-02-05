import express from 'express'

import { getAllNotes, createNote, getNote } from '../controllers/jobPosts.controller'

const router = express.Router()

router.get('/', getAllNotes)
router.post('/', createNote)
router.get('/:id', getNote)
// router.put('/:id', updateNote)
// router.delete('/:id', deleteNote)

export default router
