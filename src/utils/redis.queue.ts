import { Queue } from 'bullmq'

// Define the connection options for Redis
const connectionOptions = {
	host: 'localhost', // Redis server host
	port: 6379 // Redis server port
	// Add any additional Redis connection options here if needed
}

// Create a queue instance with the specified connection
console.log('QUEUE init')
const myQueue = new Queue('emailQueue', { connection: connectionOptions })

export default myQueue
