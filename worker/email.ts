import { MailOptions } from '@/types/email'
import dotenv from 'dotenv'
import nodemailer, { SentMessageInfo } from 'nodemailer'

dotenv.config()

const EMAIL_PORT = Number(process.env.EMAIL_PORT)
const EMAIL_USER = process.env.EMAIL_USER
const EMAIL_PW = process.env.EMAIL_PW
const EMAIL_HOST = process.env.EMAIL_HOST

const transporter = nodemailer.createTransport({
	host: EMAIL_HOST,
	port: EMAIL_PORT,
	secure: true,
	auth: {
		user: EMAIL_USER,
		pass: EMAIL_PW
	}
})

export const sendEmailSmtp = async (mailOptions: MailOptions): Promise<boolean> => {
	try {
		await sendMailAsync(mailOptions)
		return true
	} catch (error) {
		return false
	}
}

function sendMailAsync(mailOptions: MailOptions): Promise<boolean> {
	return new Promise((resolve, reject) => {
		transporter.sendMail(mailOptions, (error: Error | null, info: SentMessageInfo) => {
			if (error) {
				console.error('Error sending email:', error)
				resolve(false)
			} else {
				console.log('Email Sent...   ', new Date(), info.response)
				resolve(true)
			}
		})
	})
}
