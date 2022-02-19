import nodemailer from 'nodemailer';

export const emailProvider = nodemailer.createTransport({
    //@ts-ignore (type defs are wrong)
	service: 'gmail',
	auth: {
		user: import.meta.env.VITE_GMAIL_ADDRESS,
		pass: import.meta.env.VITE_GMAIL_PASSWORD
	}
});
