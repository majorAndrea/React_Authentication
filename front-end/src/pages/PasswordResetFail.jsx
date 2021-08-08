import { useHistory } from "react-router-dom";

export const PasswordResetFail = () => {
	const history = useHistory();

	return (
		<div className="content-container">
			<h1>There is a problem...</h1>
			<p>
				Something went wrong while trying to reset your password.
			</p>
			<button onClick={() => history.push("/login")}>Back to Login</button>
		</div>
	);
}
