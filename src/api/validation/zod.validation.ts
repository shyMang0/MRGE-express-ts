import { z, ZodError } from 'zod'

export const formatZodError = (error: ZodError) => {
	const { formErrors, fieldErrors } = error.flatten()
	const messages: string[] = []

	for (const formError of formErrors) {
		messages.push(formError)
	}

	for (const [field, errors] of Object.entries(fieldErrors)) {
		if (errors) {
			for (const error of errors) {
				messages.push(`${field}: ${error}`)
			}
		}
	}

	return messages.join(', ')
}
