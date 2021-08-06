import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDbConnection } from "../db";

export const loginRoute = {
	path: "/api/login",
	method: "post",
	handler: async (req, res) => {
		const { email, password } = req.body;
		const db = getDbConnection("react-auth-db");
		const foundUser = await db.collection("users").findOne({ email });

		if (!foundUser) return res.sendStatus(401);

		const { _id: id, isVerified, passwordHash, info } = foundUser;
		const isPasswordCorrect = await bcrypt.compare(password, passwordHash);

		if (isPasswordCorrect) {
			jwt.sign(
				{ id, isVerified, email, info },
				process.env.JWT_SECRET,
				{ expiresIn: "2d" },
				(err, token) => {
					if (err) {
						console.log(err);
						return res.status(500).send("Something went wrong!");
					}
					res.status(200).json({ token });
				}
			);
		} else {
			res.sendStatus(401);
		}
	}
}