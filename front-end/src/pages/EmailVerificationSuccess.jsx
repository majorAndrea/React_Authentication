import { useHistory } from "react-router-dom";

export const EmailVerificationSuccess = () => {
	const history = useHistory();

	return (
		<div className="content-container">
			<h1>Success!</h1>
			<p>
				Thanks for verifying your email, you can now use all the functionality.
			</p>
			<button onClick={() => history.push("/")}>Go to HomePage</button>
		</div>
	);
}