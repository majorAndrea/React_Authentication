import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getDbConnectiom } from "../db";

export const signupRoute = {
	path: "/api/signup",
	method: "post",
	handler: async (req, res) => {
		const { email, password } = req.body;
		const db = getDbConnectiom("react-auth-db");
		const user = await db.collection("users").findOne({ email });

		if (user) {
			res.sendStatus(409);
		}

		const passwordHash = await bcrypt.hash(password, 10);
	}
}