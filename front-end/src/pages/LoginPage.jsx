import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useToken } from "../auth/useToken";
import { useQueryParams } from "../util/useQueryParams";

export const LoginPage = () => {
  const [, setToken] = useToken();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [googleOauthUrl, setGoogleOauthUrl] = useState("");
  const { token: oAuthToken } = useQueryParams();
  const history = useHistory();

  const onLoginClicked = async () => {
    try {
      const response = await axios.post("/api/login", {
        email,
        password,
      });
      const { token } = response.data;

      setToken(token);
      history.push("/");
    } catch (e) {
      setErrorMessage("Invalid credentials!");
    }
  };

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  }, [errorMessage]);

  useEffect(() => {
    const loadOauthUrl = async () => {
      try {
        const response = await axios.get("/auth/google/url");
        const { url } = response.data;
        setGoogleOauthUrl(url);
      } catch (error) {
        console.log(error);
      }
    };

    loadOauthUrl();
  }, []);

  useEffect(() => {
    if (oAuthToken) {
      setToken(oAuthToken);
      history.push("/");
    }
  }, [oAuthToken, setToken, history]);

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

      <button onClick={onLoginClicked} disabled={!password || !email}>
        Log In
      </button>
      <button onClick={() => history.push("/forgot-password")}>
        Forgot your password?
      </button>
      <button onClick={() => history.push("/signup")}>
        Don't have an account? Sign Up
      </button>
      <div
        disabled={!googleOauthUrl}
        className="googleBtn customBtn"
        role="button"
        onClick={() => {
          window.location.href = googleOauthUrl;
        }}
      >
        <span className="icon"></span>
        <span className="buttonText">Sign in with Google</span>
      </div>
    </div>
  );
};
