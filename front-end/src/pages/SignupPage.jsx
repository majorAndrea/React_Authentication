import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useToken } from "../auth/useToken";

export const SignupPage = () => {
	const [token, setToken] = useToken();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const history = useHistory();

	const onSignupClicked = async () => {
		const response = await axios.post("/api/signup", {
			email,
			password
		});
		const { token } = response.data;
		setToken(token);
		history.push("/verify-email");
	}

	return (
		<div className="content-container">
			<h1>Sign Up</h1>
			{errorMessage && <div className="fail">{errorMessage}</div>}

			<input 
				placeholder="your-email@email.com"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type="password"
				placeholder="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<input
				type="password"
				placeholder="confirm your password"
				value={confirmPassword}
				onChange={(e) => setConfirmPassword(e.target.value)}
			/>
			<hr />

			<button 
				onClick={onSignupClicked}
				disabled={!password || !email || password !== confirmPassword}
			>
			Sign Up
			</button>
			<button
				onClick={() => history.push("/login")}
			>
			Already have an account? Login
			</button>
		</div>
	);
}