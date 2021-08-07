import { useHistory } from "react-router-dom";

export const EmailVerificationFail = () => {
	const history = useHistory();

	return (
		<div className="content-container">
			<h1>There is a problem...</h1>
			<p>
				Something went wrong while trying to verifying your email.
			</p>
			<button onClick={() => history.push("/signup")}>Back to Sign Up</button>
		</div>
	);
}