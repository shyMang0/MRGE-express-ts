// import * as NotesDal from '@/db/dal/notes.dal'
import * as JobListingsDal from '@/db/dal/jobListings.dal'
// import { NotesInput, NotesOuput } from '@/db/models/notes.model'
import { JobListingsInput, JobListingsOuput } from '@/db/models/jobListings.model'
import { v4 as uuidv4 } from 'uuid'
// import JobPosts from '../../db/models/jobPosts.model'

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
