import * as JobListingsDal from '@/db/dal/jobListings.dal'
import * as SpamPostsDal from '@/db/dal/spamPosts.dal'
import { JobListingsInput, JobListingsOuput } from '@/db/models/jobListings.model'
import { v4 as uuidv4 } from 'uuid'

export const create = (payload: JobListingsInput): Promise<JobListingsOuput> => {
	const uuid = uuidv4()
	payload.id = uuid.slice(-5)
	return JobListingsDal.create(payload)
}

export const update = (id: string, payload: Partial<JobListingsInput>): Promise<JobListingsOuput> => {
	return JobListingsDal.update(id, payload)
}

export const getById = (id: string): Promise<JobListingsOuput> => {
	return JobListingsDal.getById(id)
}

export const deleteById = (id: string): Promise<boolean> => {
	return JobListingsDal.deleteById(id)
}

export const getAll = (): Promise<JobListingsOuput[]> => {
	return JobListingsDal.getAll()
}

export const checkUnique = async (email: string): Promise<Boolean> => {
	const listings = await JobListingsDal.findByEmail(email)
	const spams = await SpamPostsDal.findByEmail(email)
	if (listings.length > 1 || spams.length > 0) {
		return false
	}
	return true
}
