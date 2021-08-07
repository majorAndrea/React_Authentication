import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useToken } from "../auth/useToken";
import { EmailVerificationSuccess } from "./EmailVerificationSuccess";
import { EmailVerificationFail } from "./EmailVerificationFail";

export const EmailVerificationLandingPage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [isSuccess, setIsSuccess] = useState(false);
	const { verificationString } = useParams();
	const [_, setToken] = useToken();

	useEffect(() => {
		const loadVerification = async () => {
			try {
				const response = await axios.put("/api/verify-email", { verificationString });
				const { token } = response.data;

				setToken(token);
				setIsSuccess(true);
				setIsLoading(false);
			} catch (e) {
				setIsSuccess(false);
				setIsLoading(false);
			}
		}

		loadVerification();
	}, [setToken, verificationString]);

	if (isLoading) return <div>Loading...</div>;
	if (!isSuccess) return <EmailVerificationFail />;

	return <EmailVerificationSuccess />
}
