import * as JobListingsDal from '@/db/dal/jobListings.dal'
import * as SpamPostsDal from '@/db/dal/spamPosts.dal'
import { JobListingsInput, JobListingsOuput } from '@/db/models/jobListings.model'
import { SpamPostsOuput } from '@/db/models/spamPosts.model'
import { curlToXml } from '@/api/services/xml.service'
import Redis from 'ioredis'

// Create a Redis client
const redis = new Redis({
	host: 'localhost', // Redis server host
	port: 6379 // Redis server port
	// Add any additional Redis connection options here if needed
})
export const getXml = async (): Promise<any> => {
	const cachedData = await redis.get('xmlPath')
	if (cachedData === null) {
		const xml = await curlToXml()
		await redis.set('xmlPath', JSON.stringify(xml), 'EX', 10)
		return xml
	}
	return JSON.parse(cachedData)
}
