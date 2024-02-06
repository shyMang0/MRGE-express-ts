import { Request, Response } from 'express'
import * as jobListingsService from '@/api/services/jobListings.service'
import * as spamPostsService from '@/api/services/spamPosts.service'
import * as emailService from '@/api/services/email.service'
import * as verifyPostsService from '@/api/services/verifyPosts.service'
import { validateCreateJobListing } from '@/api/validation/jobListings.validation'

export const getAlljobListings = async (req: Request, res: Response) => {
	const notes = await jobListingsService.getAll()
	try {
		return res.status(200).json(notes)
	} catch (error: any) {
		res.status(400).json({ message: error.message || error })
	}
}

export const getAllSpamPosts = async (req: Request, res: Response) => {
	const spams = await spamPostsService.getAll()
	try {
		return res.status(200).json(spams)
	} catch (error: any) {
		res.status(400).json({ message: error.message || error })
	}
}

export const createjobListing = async (req: Request, res: Response) => {
	try {
		const jobListingInput = validateCreateJobListing(req.body)
		//query > if first time send email
		console.log('jobListingInput', jobListingInput)
		const data = await jobListingsService.create(jobListingInput)
		//generate links approve/decline
		const link_approve = verifyPostsService.generateToken(data.id, 'approve')
		const link_decline = verifyPostsService.generateToken(data.id, 'decline')
		const email = await emailService.composeAndSendEmail(data.created_by, data.id, data.title, data.description, link_approve, link_decline)
		res.status(201).json({ success: true, message: 'new note created', data })
	} catch (error: any) {
		res.status(400).json({ success: false, message: error.message || error })
	}
}

export const getjobListing = async (req: Request, res: Response) => {
	const { id } = req.params // slug
	if (!id) return res.status(400).json({ message: 'id is required' })
	try {
		const data = await jobListingsService.getById(id)
		res.json({ data })
	} catch (error: any) {
		res.status(404).json({ message: error.message || error })
	}
}

export const deletejobListing = async (req: Request, res: Response) => {
	const { id } = req.params // slug
	if (!id) return res.status(400).json({ message: 'id is required' })

	try {
		const data = await jobListingsService.deleteById(id)
		return res.status(200).json({ success: true, message: 'row deleted', id })
	} catch (error: any) {
		return res.status(404).json({ success: false, message: error.message || error })
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
// 		const data = await jobListingsService.update(id, notesInput)
// 		return res.status(200).json({ success: true, message: 'row updated', data })
// 	} catch (error: any) {
// 		return res.status(400).json({ success: false, message: error.message || error })
// 	}
// }
