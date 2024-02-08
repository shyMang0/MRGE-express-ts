import { Request, Response } from 'express'
import * as jobListingsService from '@/api/services/jobListings.service'
import * as spamPostsService from '@/api/services/spamPosts.service'
import * as emailService from '@/api/services/email.service'
import { validateCreateJobListing } from '@/api/validation/jobListings.validation'

export const getAlljobListings = async (req: Request, res: Response) => {
	const notes = await jobListingsService.getAll()
	try {
		return res.status(200).json(notes)
	} catch (error: any) {
		res.status(400).json({ message: error.message || error })
	}
}

export const createjobListing = async (req: Request, res: Response) => {
	try {
		const jobListingInput = validateCreateJobListing(req.body)
		const listing = await jobListingsService.create(jobListingInput)
		const isUnique = await jobListingsService.checkUnique(jobListingInput.created_by)
		if (isUnique) {
			const emailStatus = await emailService.composeSendPushEmail(listing)
		}
		return res.status(201).json({ status: true, message: 'New Job Listing Created', listing, willSendEmail: isUnique })
	} catch (error: any) {
		return res.status(400).json({ status: false, message: error.message || error })
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

export const getAllSpamPosts = async (req: Request, res: Response) => {
	const spams = await spamPostsService.getAll()
	try {
		return res.status(200).json(spams)
	} catch (error: any) {
		res.status(400).json({ message: error.message || error })
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
