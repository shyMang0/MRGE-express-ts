import { Request, Response } from 'express'
import * as JobPostsService from '@/api/services/jobPosts.service'
import { NotesInput } from '@/db/models/notes.model'
import { validateCreateJobPost } from '@/api/validation/jobPost.validation'

export const getAllNotes = async (req: Request, res: Response) => {
	const notes = await JobPostsService.getAll()
	try {
		return res.status(200).json(notes)
	} catch (error: any) {
		res.status(400).json({ message: error.message || error })
	}
}

export const createNote = async (req: Request, res: Response) => {
	// const title: unknown = req.body.title
	// const body: unknown = req.body.body
	// if (!title) return res.status(400).json({ message: 'title is required' })
	// if (!body) return res.status(400).json({ message: 'body is required' })
	// const notesInput = <NotesInput>{ title, body }

	try {
		const jobPostInput = validateCreateJobPost(req.body)
		console.log('jobPostInput', jobPostInput)
		const data = await JobPostsService.create(jobPostInput)
		res.status(201).json({ success: true, message: 'new note created', data })
	} catch (error: any) {
		res.status(400).json({ success: false, message: error.message || error })
	}
}

export const getNote = async (req: Request, res: Response) => {
	const { id } = req.params // slug
	if (!id) return res.status(400).json({ message: 'id is required' })
	try {
		const data = await JobPostsService.getById(id)
		res.json({ data })
	} catch (error: any) {
		res.status(404).json({ message: error.message || error })
	}
}

// export const updateNote = async (req: Request, res: Response) => {
// 	// const title: unknown = req.body.title
// 	// const body: unknown = req.body.body
// 	// if (!title && !body) return res.status(400).json({ message: 'either title or body is required' })

// 	// const notesInput = <NotesInput>{ title, body }
// 	const { id } = req.params // slug
// 	if (!id) return res.status(400).json({ message: 'id is required' })

// 	try {
// 		const notesInput = validateEditNote(req.body)
// 		const data = await JobPostsService.update(id, notesInput)
// 		return res.status(200).json({ success: true, message: 'row updated', data })
// 	} catch (error: any) {
// 		return res.status(400).json({ success: false, message: error.message || error })
// 	}
// }
