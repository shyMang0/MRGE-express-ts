// worker.ts

import { Worker, Queue } from 'bullmq'

// Define the connection options for Redis
const connectionOptions = {
	host: 'localhost', // Redis server host
	port: 6379 // Redis server port
	// Add any additional Redis connection options here if needed
}

// Create a queue instance with the specified connection options
// const myQueue = new Queue('myQueueName', { connection: connectionOptions })

// Create a worker for the queue
const worker = new Worker(
	'myQueueName',
	async (job) => {
		console.log('Processing job:', job.data)
		// Your job processing logic here
	},
	{ connection: connectionOptions }
)

// Set up a connection to Redis for the queue
// await myQueue.waitUntilReady()

worker.on('completed', (job) => {
	console.log(`Job ${job.id} has been completed`)
})

worker.on('failed', (job, err) => {
	if (job) console.error(`Job ${job.id} has failed with error:`, err)
})
