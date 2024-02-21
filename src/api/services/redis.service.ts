import { Queue } from 'bullmq'

// Define the connection options for Redis
const connectionOptions = {
	host: 'localhost', // Redis server host
	port: 6379 // Redis server port
	// Add any additional Redis connection options here if needed
}

// Create a queue instance with the specified connection
const myQueue = new Queue('myQueueName', { connection: connectionOptions })

export async function addJob(data: any): Promise<void> {
	await myQueue.add('jobName', data)
}
