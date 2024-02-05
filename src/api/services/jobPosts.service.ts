// import * as NotesDal from '@/db/dal/notes.dal'
import * as JobPostsDal from '@/db/dal/jobPosts.dal'
// import { NotesInput, NotesOuput } from '@/db/models/notes.model'
import { JobPostsInput, JobPostsOuput } from '@/db/models/jobPosts.model'
import { v4 as uuidv4 } from 'uuid'
import JobPosts from './../../db/models/jobPosts.model'

export const create = (payload: JobPostsInput): Promise<JobPostsOuput> => {
	const uuid = uuidv4()
	payload.id = uuid.slice(-5)
	return JobPostsDal.create(payload)
}

export const update = (id: string, payload: Partial<JobPostsInput>): Promise<JobPostsOuput> => {
	return JobPostsDal.update(id, payload)
}

export const getById = (id: string): Promise<JobPostsOuput> => {
	return JobPostsDal.getById(id)
}

export const deleteById = (id: string): Promise<boolean> => {
	return JobPostsDal.deleteById(id)
}

export const getAll = (): Promise<JobPostsOuput[]> => {
	return JobPostsDal.getAll()
}
