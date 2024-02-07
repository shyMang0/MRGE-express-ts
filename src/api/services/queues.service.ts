// const Queue = require('better-queue')
const SqliteStore = require('better-queue-sqlite')
import Queue from 'better-queue'
import * as EmailService from '@/api/services/email.service'
import { MailOptions } from '@/types/email'
import dotenv from 'dotenv'
dotenv.config()
const ASSETS_FOLDER = process.env.ASSETS_FOLDER

const store = new SqliteStore({
	type: 'sql',
	dialect: 'sqlite',
	path: ASSETS_FOLDER + '/db/queues.db'
})

const delayTimer = (ms: number) => new Promise((res) => setTimeout(res, ms))

export const emailQueue = new Queue(
	async function (mailOptions: MailOptions, cb: any) {
		console.log('Sending Email,,,', new Date())

		try {
			await EmailService.sendEmailSmtp(mailOptions)
			// console.log('Email Sent...', new Date())
			cb(null, true)
		} catch (error) {
			console.log('Email Error...', new Date())
			cb(error, null)
		}
	},
	{
		store: store,
		afterProcessDelay: 1000,
		maxRetries: 3,
		retryDelay: 1000
	}
)

// export const queue = new Queue(
// 	async function (input: any, cb: any) {
// 		console.log('processing ..........', input)
// 		// await delayTimer(3000)

// 		const to = 'carinodrex.ext@gmail.com' // Recipient email address
// 		const subject = 'Test Email' // Email subject
// 		const body =
// 			'This is a test email sent from Node.js and Express! <table><thead><tr><th>Header</th></tr></thead><tbody><tr><td>teddy</td></tr></tbody></td></table>' // Email body

// 		try {
// 			await EmailService.sendEmailSmtp(
// 				to, // Recipient email address
// 				subject, // Email subject
// 				body
// 			)
// 			// throw new Error('This is a generic error message.')
// 			console.log('Email Done', input)
// 			cb(null, true)
// 		} catch (error) {
// 			cb(error, null)
// 		}

// 		// cb(null, true)
// 		// }
// 		// cb('failed email', null)
// 		// cb(null, false)
// 		// console.log('after callback xxxxxxxxxxxxx', input)
// 	},
// 	{
// 		store: store,
// 		afterProcessDelay: 1000,
// 		maxRetries: 3,
// 		retryDelay: 1000
// 		// store: {
// 		// 	type: 'sql',
// 		// 	dialect: 'sqlite',
// 		// 	path: process.env.ASSETS_FOLDER + '/jobs.sqlite'
// 		// }
// 	}
// )
