import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { PasswordResetSuccess } from "./PasswordResetSuccess";
import { PasswordResetFail } from "./PasswordResetFail";

export const PasswordResetLandingPage = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isSuccess, setIsSuccess] = useState(false);
	const [isFailure, setIsFailure] = useState(false);
	const { passwordResetCode } = useParams();

	const onResetClicked = async () => {
		try {
			await axios.put(
				`/api/users/${passwordResetCode}/reset-password`,
				{ newPassword: password }
			);
			setIsSuccess(true);
		} catch (e) {
			setIsFailure(true);
		}
	}

	if (isFailure) return <PasswordResetFail />
	if (isSuccess) return <PasswordResetSuccess />

	return (
		<div className="content-container">
			<h1>Password Reset</h1>
			<p>Please enter the new password:</p>

			<input
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Password"
			/>
			<input
				type="password"
				value={confirmPassword}
				onChange={(e) => setConfirmPassword(e.target.value)}
				placeholder="Confirm password"
			/>
			<button
				disabled={!password || !confirmPassword || password !== confirmPassword}
				onClick={onResetClicked}
			>
				Reset Password
			</button>
		</div>
	);

}