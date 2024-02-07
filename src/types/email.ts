export interface MailOptions {
	from: string
	to: string
	subject: string
	html: string
}

export interface ComposeEmail {
	newUserEmail: string
	id: string
	title: string
	description: string
	link_approve: string
	link_decline: string
}
