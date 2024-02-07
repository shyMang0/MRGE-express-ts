import * as jobListingsService from '@/api/services/jobListings.service'
import * as crypto from 'crypto'
import * as spamPostsService from '@/api/services/spamPosts.service'
import dotenv from 'dotenv'
const secret_key = process.env.SECRET
dotenv.config()

export const approveListing = async (listing_id: string): Promise<any> => {
	try {
		const res = await jobListingsService.update(listing_id, { validated_at: new Date() })
	} catch (error: any) {
		throw error
		console.error(error)
		//throw error
	}
	return true
}

export const declineListing = async (listing_id: string, listing: any): Promise<any> => {
	try {
		const params = { ...listing.toJSON(), declined_at: new Date() }
		const transfer_res = await spamPostsService.transferToSpam(params)
		const delete_res = jobListingsService.deleteById(listing_id)
		return true
	} catch (error: any) {
		throw error
	}
	return true
}

export const verifyToken = (listing_id: string, action: string, token: string): Boolean => {
	const generated_token = generateToken(listing_id, action)
	if (generated_token === token) {
		return true
	}
	return false
}

export const generateToken = (listing_id: string, action: string): string => {
	const dataToHash = `${listing_id}${action}${secret_key}`
	const hashedToken = crypto.createHash('sha256').update(dataToHash).digest('hex')
	return hashedToken
}
