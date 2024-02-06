// import * as NotesDal from '@/db/dal/notes.dal'
import * as JobListingsDal from '@/db/dal/jobListings.dal'
import * as SpamPostsDal from '@/db/dal/spamPosts.dal'
// import { NotesInput, NotesOuput } from '@/db/models/notes.model'
import JobListings, { JobListingsInput, JobListingsOuput } from '@/db/models/jobListings.model'
import SpamPosts, { SpamPostsInput, SpamPostsOuput } from '@/db/models/spamPosts.model'
import { v4 as uuidv4 } from 'uuid'
// import JobPosts from '../../db/models/jobPosts.model'

export const transferToSpam = (payload: JobListingsOuput): Promise<SpamPostsOuput> => {
	return SpamPostsDal.create(payload)
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

export const getAll = (): Promise<SpamPostsOuput[]> => {
	return SpamPostsDal.getAll()
}
