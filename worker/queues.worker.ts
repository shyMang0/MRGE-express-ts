// worker.ts

import { Worker } from 'bullmq'
import { sendEmailSmtp } from './email'
import { MailOptions } from '@/types/email'

const connectionOptions = {
	host: 'localhost', // Redis server host
	port: 6379 // Redis server port
	// Add any additional Redis connection options here if needed
}

//  npx ts-node queues.worker.ts

// Create a worker for the queue
const worker = new Worker(
	'emailQueue',
	async (job) => {
		console.log('Processing job:', job.id)
		await sendEmail(job.data)
		await delayTimer(3000)
	},
	{ connection: connectionOptions }
)

worker.on('completed', (job) => {
	console.log(`Job ${job.id} has been completed`)
})

worker.on('failed', (job, err) => {
	if (job) console.error(`Job ${job.id} has failed with error:`, err)
})

async function sendEmail(listing: MailOptions) {
	const { from, to } = listing
	console.log('email data', from, to)
	let mailSent = false
	if (from && to) {
		mailSent = await sendEmailSmtp(listing)
	}
	return mailSent
}
function delayTimer(ms: number) {
	return new Promise((res) => setTimeout(res, ms))
}
