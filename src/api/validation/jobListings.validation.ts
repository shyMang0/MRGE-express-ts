import { JobListingsInput } from '@/db/models/jobListings.model'
import { z, ZodError } from 'zod'
import { formatZodError } from './zod.validation'
import { fromZodError } from 'zod-validation-error'

const CreateJobListingsSchema = z.object({
	created_by: z.string().email(),
	title: z.string().min(1, { message: 'Title is required and must be at least 1 character long' }),
	description: z.string().min(1, 'Description is required and must be at least 1 character long')
})

export const validateCreateJobListing = (data: any): JobListingsInput => {
	try {
		return <JobListingsInput>CreateJobListingsSchema.parse(data)
	} catch (error) {
		if (error instanceof ZodError) {
			throw fromZodError(error)
		}
		throw error
	}
}
