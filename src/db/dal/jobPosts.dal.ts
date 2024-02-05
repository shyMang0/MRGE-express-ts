// import Notes, { NotesInput, NotesOuput } from '@/db/models/notes.model'
import JobPosts, { JobPostsInput, JobPostsOuput } from '@/db/models/jobPosts.model'

export const create = async (payload: JobPostsInput): Promise<JobPostsOuput> => {
	const post = await JobPosts.create(payload as any)
	return <JobPostsOuput>post
}

export const update = async (id: string, payload: Partial<JobPostsInput>): Promise<JobPostsOuput> => {
	const note = await JobPosts.findByPk(id)
	if (!note) {
		throw new Error('not found')
	}
	const updatedPost = await note.update(payload)
	return <JobPostsOuput>updatedPost
}

export const getById = async (id: string): Promise<JobPostsOuput> => {
	const post = await JobPosts.findByPk(id, {
		paranoid: false
	})
	if (!post) {
		throw new Error('not found')
	}

	// if (post && post.deleted_at) {
	// 	throw new Error('note is deleted')
	// }
	return <JobPostsOuput>post
}

export const deleteById = async (id: string): Promise<boolean> => {
	const post = await JobPosts.findByPk(id)
	if (!post) {
		throw new Error('not found')
	}
	const deletedPost = await JobPosts.destroy({
		where: { id }
	})
	return !!deletedPost
}

export const getAll = async (): Promise<JobPostsOuput[]> => {
	const tests = await JobPosts.findAll({
		paranoid: true,
		attributes: {
			exclude: ['deleted_at']
		}
	})
	return <JobPostsOuput[]>tests
}
