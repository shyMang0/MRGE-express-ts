import { Request, Response } from 'express'
import * as verifyPostsService from '@/api/services/verifyPosts.service'
import * as jobListingsService from '@/api/services/jobListings.service'
import * as spamPostsService from '@/api/services/spamPosts.service'

export const emailTest = async (req: Request, res: Response) => {
	return res.status(200).json('email test')
}
