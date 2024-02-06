import JobListings, { JobListingsInput, JobListingsOuput } from '@/db/models/jobListings.model'

export const create = async (payload: JobListingsInput): Promise<JobListingsOuput> => {
	const post = await JobListings.create(payload as any)
	return <JobListingsOuput>post
}

export const update = async (id: string, payload: Partial<JobListingsInput>): Promise<JobListingsOuput> => {
	const note = await JobListings.findByPk(id)
	if (!note) {
		throw new Error('not found')
	}
	const updatedPost = await note.update(payload)
	return <JobListingsOuput>updatedPost
}

export const getById = async (id: string): Promise<JobListingsOuput> => {
	const post = await JobListings.findByPk(id, {
		paranoid: false
	})
	if (!post) {
		throw new Error('not found')
	}

	// if (post && post.deleted_at) {
	// 	throw new Error('note is deleted')
	// }
	return <JobListingsOuput>post
}

export const deleteById = async (id: string): Promise<boolean> => {
	const post = await JobListings.findByPk(id)
	if (!post) {
		throw new Error('not found')
	}
	const deletedPost = await JobListings.destroy({
		where: { id }
	})
	return !!deletedPost
}

export const getAll = async (): Promise<JobListingsOuput[]> => {
	const tests = await JobListings.findAll({
		paranoid: true,
		attributes: {
			exclude: ['deleted_at']
		}
	})
	return <JobListingsOuput[]>tests
}
