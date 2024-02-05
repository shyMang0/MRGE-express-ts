import * as NotesDal from '@/db/dal/notes.dal'
import { NotesInput, NotesOuput } from '@/db/models/notes.model'
import { v4 as uuidv4 } from 'uuid'

export const create = (payload: NotesInput): Promise<NotesOuput> => {
	const uuid = uuidv4()
	payload.id = uuid.slice(-5)
	return NotesDal.create(payload)
}

export const update = (id: string, payload: Partial<NotesInput>): Promise<NotesOuput> => {
	return NotesDal.update(id, payload)
}

export const getById = (id: string): Promise<NotesOuput> => {
	return NotesDal.getById(id)
}

export const deleteById = (id: string): Promise<boolean> => {
	return NotesDal.deleteById(id)
}

export const getAll = (): Promise<NotesOuput[]> => {
	return NotesDal.getAll()
}
