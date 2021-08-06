import { useState } from "react";
import { useHistory } from "react-router-dom";

export const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const history = useHistory();

	const onLoginClicked = async () => {
		alert("Login not implemented yet.")
	}

	return (
		<div className="content-container">
			<h1>Login</h1>
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
			<hr />

			<button 
				onClick={onLoginClicked}
				disabled={!password || !email}
			>
			Log In
			</button>
			<button
				onClick={() => history.push("/forgot-password")}
			>
			Forgot your password?
			</button>
			<button
				onClick={() => history.push("/signup")}
			>
			Don't have an account? Sign Up
			</button>
		</div>
	);
}