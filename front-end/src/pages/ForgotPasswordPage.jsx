import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export const ForgotPasswordPage = () => {
	const [email, setEmail] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [success, setSuccess] = useState(false);
	const history = useHistory();

	const onSubmitClicked = async () => {
		try {
			await axios.put(`/api/forgot-password/${email}`);
			setSuccess(true);
			setTimeout(() => {
				history.push("/login");
			}, 5000);
		} catch (e) {
			setErrorMessage(e.message);
		}
	}

	return success ? (
		<div className="content-container">
			<h1>Success</h1>
			<p>Please, check your email for a password reset link.</p>
		</div>
	) : (
		<div className="content-container">
			<h1>Forgot Password</h1>
			<p>
				Enter your email and we'll send you an email with a password reset link.
			</p>
			{ errorMessage && <div className="fail">{errorMessage}</div> }

			<input 
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder="your-email@email.com"
			/>
			<button
				disabled={!email}
				onClick={onSubmitClicked}
			>
				Send Reset Link
			</button>
		</div>
	);
}