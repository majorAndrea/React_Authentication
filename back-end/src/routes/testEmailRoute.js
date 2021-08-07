import { sendEmail } from "../utils/sendEmail";

export const testEmailRoute = {
	path: "/api/test-email",
	method: "post",
	handler: async (req, res) => {
		try {
			await sendEmail({
				to: "am.blog.demo+test1@gmail.com",
				from: "am.blog.demo@gmail.com",
				subject: "Does this work?",
				text: "If you're reading this... yes!"
			});
			res.sendStatus(200);
		} catch (e) {
			console.log(e);
			res.sendStatus(500);
		}
	}
}
