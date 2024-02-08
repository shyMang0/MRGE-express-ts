import { Request, Response } from 'express'
import * as verifyPostsService from '@/api/services/verifyPosts.service'
import * as jobListingsService from '@/api/services/jobListings.service'
import * as spamPostsService from '@/api/services/spamPosts.service'

export const verifyListing = async (req: Request, res: Response) => {
	const listing_id = <string>req.query.listing_id
	const action = <string>req.query.action
	const token = <string>req.query.token
	const match_result = verifyPostsService.verifyToken(listing_id, action, token)
	if (!match_result) {
		return res.status(400).json({ message: 'action & token not valid', listing_id, action, token })
	}

	try {
		const listing = await jobListingsService.getById(listing_id)
		if (listing.validated_at) {
			return res.status(200).json({ message: 'Listing Already Validated', listing_id })
		}

		if (action === 'approve') {
			const update_res = await verifyPostsService.approveListing(listing_id)
			return res.status(200).json({ message: 'Listing Has Been Verified', success: update_res })
		} else if (action === 'decline') {
			//move to spam table
			const decline_res = await verifyPostsService.declineListing(listing_id, listing)
			// const _temp = <any>listing
			// const params = { ..._temp.toJSON(), declined_at: new Date() }
			// const transfer_res = await spamPostsService.transferToSpam(params)
			// jobListingsService.deleteById(listing_id)
			// return res.status(200).json({ listing: listing })
			return res.status(200).json({ message: 'Declined moved to spam', success: decline_res })
		}
	} catch (error: any) {
		return res.status(404).json({ message: error.message || error })
	}
}

export const generateToken = (req: Request, res: Response) => {
	const listing_id = <string>req.query.listing_id
	const action = <string>req.query.action
	const token = verifyPostsService.generateToken(listing_id, action)
	return res.status(200).json({ listing_id, action, token })
}
