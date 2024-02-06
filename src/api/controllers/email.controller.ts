import { Request, Response } from 'express'
import * as verifyPostsService from '@/api/services/verifyPosts.service'
import * as jobListingsService from '@/api/services/jobListings.service'
import * as spamPostsService from '@/api/services/spamPosts.service'
import * as emailService from '@/api/services/email.service'

export const emailTest = async (req: Request, res: Response) => {
	const email = await emailService.sendEmailTest()
	return res.status(200).json({ message: 'email test', email })
}
