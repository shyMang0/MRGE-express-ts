import { NotesInput } from '@/db/models/notes.model'
import { z, ZodError } from 'zod'
import { formatZodError } from './zod.validation'
import { fromZodError } from 'zod-validation-error'

const CreateNoteSchema = z.object({
	title: z.string().min(1, { message: 'Title is required and must be at least 1 character long' }),
	body: z.string().min(1, 'Body is required and must be at least 1 character long')
})

export const validateCreateNote = (data: any): NotesInput => {
	try {
		return <NotesInput>CreateNoteSchema.parse(data)
	} catch (error) {
		if (error instanceof ZodError) {
			throw fromZodError(error)
		}
		throw error
	}
}

const EditNoteSchema = z
	.object({
		title: z.string().min(1).max(255).optional(),
		body: z.string().min(1).optional()
	})
	.refine((data) => data.title !== undefined || data.body !== undefined, {
		message: 'At least one of title or body should be present'
	})

export const validateEditNote = (data: any): NotesInput => {
	try {
		return <NotesInput>EditNoteSchema.parse(data)
	} catch (error) {
		if (error instanceof ZodError) {
			throw formatZodError(error)
		}
		throw error
	}
}
