import { Request, Response } from 'express'
import * as jobListingsService from '@/api/services/jobListings.service'
import * as spamPostsService from '@/api/services/spamPosts.service'
import * as emailService from '@/api/services/email.service'
import * as verifyPostsService from '@/api/services/verifyPosts.service'
import * as xmlService from '@/api/services/xml.service'
import { validateCreateJobListing } from '@/api/validation/jobListings.validation'

export const fetchXmlData = async (req: Request, res: Response) => {
	try {
		const data = await xmlService.curlToXml()
		res.json({ data })
	} catch (error: any) {
		res.status(404).json({ message: error.message || error })
	}
}
