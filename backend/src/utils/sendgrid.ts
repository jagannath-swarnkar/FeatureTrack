import * as nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "www.jagan.pro@gmail.com",
		pass: "hyuv ypty gbur qavs"
	},
	tls: {
		// Do not fail on invalid certs
		rejectUnauthorized: false
	}
});

export const sendEmail = async ({ to, subject, html }: { to: string; subject: string; html: string }) => {
	try {
		const info = await transporter.sendMail({
			from: "www.jagan.coder@gmail.com", // Replace with your desired sender email
			to,
			subject,
			html
		});
		console.log("Email sent successfully!", info.response);
	} catch (error) {
		console.error("Error sending email:", error);
	}
};
