import nodemailer, { SentMessageInfo } from 'nodemailer'
import { MailOptions } from 'nodemailer/lib/sendmail-transport'
import dotenv from 'dotenv'
dotenv.config()

const EMAIL_HOST = process.env.EMAIL_HOST
const EMAIL_PORT = Number(process.env.EMAIL_PORT)
const EMAIL_FROM = process.env.EMAIL_FROM
const EMAIL_USER = process.env.EMAIL_USER
const EMAIL_PW = process.env.EMAIL_PW
const MODERATOR_EMAIL = process.env.MODERATOR_EMAIL
const SITE_URL = process.env.SITE_URL
const PORT = process.env.PORT

const transporter = nodemailer.createTransport({
	// service: 'bghmc.online', // e.g., 'Gmail', 'Outlook', 'Yahoo', etc.
	host: 'bghmc.online',
	port: EMAIL_PORT,
	secure: true, //true for 465, false for other ports
	auth: {
		user: EMAIL_USER,
		pass: EMAIL_PW
	}
})

export const sendEmailTest = async (): Promise<Boolean> => {
	const subject = 'Job Posting Verification : First Time Post'
	const body = `<h1>First Time Post By :</h1>
	<br />
	<a href="https://example.com" style="display: inline-block; padding: 10px 20px; background-color: green; color: white; text-decoration: none; border-radius: 5px;"> Approve </a>
	<a href="https://example.com" style="display: inline-block; padding: 10px 20px; background-color: red; color: white; text-decoration: none; border-radius: 5px;"> Decline </a>
`
	const mailOptions = {
		from: EMAIL_FROM, // Sender email address
		to: MODERATOR_EMAIL,
		subject,
		html: body
	}
	// Send the email
	console.log('email', mailOptions)
	try {
		await sendMailAsync(mailOptions)
		return true
	} catch (error) {
		return false
	}
}

export const composeAndSendEmail = async (
	newUserEmail: string,
	listing_id: string,
	listing_title: string,
	listing_description: string,
	approve_link: string,
	decline_link: string
): Promise<Boolean> => {
	const subject = 'Job Posting Verification : First Time Post'
	const body = `
	<h1 style="text-decoration: none; color: inherit;">First Time Post By : ${newUserEmail} </h1>
	<div style="max-width: 500px; background-color: #f5f5f5; border: 1px solid #ddd; border-radius: 5px; padding: 20px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
		<h2 style="margin-top: 0; color: #333;">${listing_title}</h2>
		<p style="margin-bottom: 0; color: #666;">${listing_description}</p>
	</div>

	<hr />
	<br />
	<a href="${SITE_URL}:${PORT}/verifyPosts?listing_id=${listing_id}&action=approve&token=${approve_link}" style="display: inline-block; padding: 10px 20px; background-color: green; color: white; text-decoration: none; border-radius: 5px;"> Approve </a>
	<a href="${SITE_URL}:${PORT}/verifyPosts?listing_id=${listing_id}&action=decline&token=${decline_link}" style="display: inline-block; padding: 10px 20px; background-color: red; color: white; text-decoration: none; border-radius: 5px;"> Decline </a>
	`
	const mailOptions = {
		from: EMAIL_FROM, // Sender email address
		to: MODERATOR_EMAIL,
		subject,
		html: body
	}
	// Send the email
	console.log('email', mailOptions)
	// return true
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
				console.log('Email sent:', info.response)
				resolve(true)
			}
		})
	})
}
