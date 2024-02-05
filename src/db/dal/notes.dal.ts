import Notes, { NotesInput, NotesOuput } from '@/db/models/notes.model'

export const create = async (payload: NotesInput): Promise<NotesOuput> => {
	const post = await Notes.create(payload as any)
	return <NotesOuput>post
}

export const update = async (id: string, payload: Partial<NotesInput>): Promise<NotesOuput> => {
	const note = await Notes.findByPk(id)
	if (!note) {
		throw new Error('not found')
	}
	const updatedPost = await note.update(payload)
	return <NotesOuput>updatedPost
}

export const getById = async (id: string): Promise<NotesOuput> => {
	const post = await Notes.findByPk(id, {
		paranoid: false
	})
	if (!post) {
		throw new Error('not found')
	}

	if (post && post.deleted_at) {
		throw new Error('note is deleted')
	}
	return <NotesOuput>post
}

export const deleteById = async (id: string): Promise<boolean> => {
	const post = await Notes.findByPk(id)
	if (!post) {
		throw new Error('not found')
	}
	const deletedPost = await Notes.destroy({
		where: { id }
	})
	return !!deletedPost
}

export const getAll = async (): Promise<NotesOuput[]> => {
	const tests = await Notes.findAll({
		paranoid: true,
		attributes: {
			exclude: ['deleted_at']
		}
	})
	return <NotesOuput[]>tests
}
