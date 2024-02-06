import SpamPosts, { SpamPostsInput, SpamPostsOuput } from '@/db/models/spamPosts.model'

export const create = async (payload: SpamPostsInput): Promise<SpamPostsOuput> => {
	const post = await SpamPosts.create(payload as any)
	return <SpamPostsOuput>post
}

export const update = async (id: string, payload: Partial<SpamPostsInput>): Promise<SpamPostsOuput> => {
	const note = await SpamPosts.findByPk(id)
	if (!note) {
		throw new Error('not found')
	}
	const updatedPost = await note.update(payload)
	return <SpamPostsOuput>updatedPost
}

export const getById = async (id: string): Promise<SpamPostsOuput> => {
	const post = await SpamPosts.findByPk(id, {
		paranoid: false
	})
	if (!post) {
		throw new Error('not found')
	}

	// if (post && post.deleted_at) {
	// 	throw new Error('note is deleted')
	// }
	return <SpamPostsOuput>post
}

export const getAll = async (): Promise<SpamPostsOuput[]> => {
	const tests = await SpamPosts.findAll({
		paranoid: true,
		attributes: {
			exclude: ['deleted_at']
		}
	})
	return <SpamPostsOuput[]>tests
}

export const findByEmail = async (email: string): Promise<SpamPostsOuput[]> => {
	const rows = await SpamPosts.findAll({
		where: {
			created_by: email
		}
	})
	return <SpamPostsOuput[]>rows
}
