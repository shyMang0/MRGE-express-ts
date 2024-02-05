import { Request, Response } from 'express'
import * as jobListingsService from '@/api/services/jobListings.service'
import { validateCreateJobListing } from '@/api/validation/jobListings.validation'
import * as crypto from 'crypto'

export const verifyListing = async (req: Request, res: Response) => {
	const user_id = '123456'
	const campaign_id = '7890'
	const secret_key = 'your_secret_key'

	const unsubscribe_token = generateUnsubscribeToken(user_id, campaign_id, secret_key)
	// console.log(unsubscribe_token)
	return res.status(200).json(unsubscribe_token)
	// const notes = await jobListingsService.getAll()
	// try {
	// 	return res.status(200).json(notes)
	// } catch (error: any) {
	// 	res.status(400).json({ message: error.message || error })
	// }
}
function generateUnsubscribeToken(user_id: string, campaign_id: string, secret_key: string): string {
	const timestamp = Math.floor(Date.now() / 1000) // Current timestamp in seconds
	const dataToHash = `${user_id}${campaign_id}${timestamp}${secret_key}`

	const hashedToken = crypto.createHash('sha256').update(dataToHash).digest('hex')
	return hashedToken
}
