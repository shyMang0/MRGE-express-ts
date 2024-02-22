import { Request, Response } from 'express'
import * as redisService from '@/api/services/redisQueue.service'

export const redistTest = async (req: Request, res: Response) => {
	// const email = await queueService.addQueue()
	// return res.status(200).json({ message: 'email test', email })
	try {
		const { data } = req.body
		await redisService.addJob(data)
		return res.status(200).send('Job added to the queue')
	} catch (error) {
		console.error('Error adding job to the queue:', error)
		return res.status(500).send('Internal Server Error')
	}
}
