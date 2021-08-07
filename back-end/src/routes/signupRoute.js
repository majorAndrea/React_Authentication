import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail";
import { getDbConnection } from "../db";
import { v4 as uuid } from "uuid";

export const signupRoute = {
	path: "/api/signup",
	method: "post",
	handler: async (req, res) => {
		const { email, password } = req.body;
		const db = getDbConnection("react-auth-db");
		const user = await db.collection("users").findOne({ email });

		if (user) {
			res.sendStatus(409);
		}

		const passwordHash = await bcrypt.hash(password, 10);
		const verificationString = uuid();
		const startingInfo = {
			hairColor: "",
			favoriteFood: "",
			bio: "",
		}
		const result = await db.collection("users").insertOne({
			email,
			passwordHash,
			info: startingInfo,
			isVerified: false,
			verificationString
		});
		const { insertedId } = result;

		try {
			await sendEmail({
				to: email,
				from: "am.blog.demo@gmail.com",
				subject: "Please verify your email",
				text: `
					Thanks for signin up! To verify your email, click here:

					http://localhost:3000/verify-email/${verificationString}
				`,
			});
		} catch (e) {
			console.log(e);
			res.sendStatus(500);
		}

		jwt.sign({
			id: insertedId,
			email: email,
			info: startingInfo,
			isVerified: false,
		},
		process.env.JWT_SECRET,
		{ expiresIn: "2d" },
		(err, token) => {
			if (err) {
				console.log(err);
				return res.status(500).send("Something went wrong!");
			}
			res.status(201).json({ token })
		});
	}
}