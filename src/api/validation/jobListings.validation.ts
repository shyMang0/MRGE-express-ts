import { JobPostsInput } from '@/db/models/jobPosts.model'
import { z, ZodError } from 'zod'
import { formatZodError } from './zod.validation'
import { fromZodError } from 'zod-validation-error'

const CreateJobPostsSchema = z.object({
	created_by: z.string().email(),
	title: z.string().min(1, { message: 'Title is required and must be at least 1 character long' }),
	description: z.string().min(1, 'Description is required and must be at least 1 character long')
})

export const validateCreateJobListing = (data: any): JobPostsInput => {
	try {
		return <JobPostsInput>CreateJobPostsSchema.parse(data)
	} catch (error) {
		if (error instanceof ZodError) {
			throw fromZodError(error)
		}
		throw error
	}
}
