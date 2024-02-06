import * as jobListingsService from '@/api/services/jobListings.service'
import * as crypto from 'crypto'
import dotenv from 'dotenv'
import * as spamPostsService from '@/api/services/spamPosts.service'
dotenv.config()
const secret_key = process.env.SECRET

export const sendEmail = async (): Promise<any> => {
	return 'ok'
}
