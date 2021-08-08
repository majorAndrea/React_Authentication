import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserInfoPage } from './pages/UserInfoPage';
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { PrivateRoute } from "./auth/PrivateRoute";
import { PleaseVerifyEmailPage } from "./pages/PleaseVerifyEmailPage";
import { EmailVerificationLandingPage } from "./pages/EmailVerificationLandingPage";
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage";
import { PasswordResetLandingPage } from "./pages/PasswordResetLandingPage";

export const Routes = () => {
    return (
        <Router>
            <Switch>
                <PrivateRoute path="/" exact>
                    <UserInfoPage />
                </PrivateRoute>
                <Route path="/verify-email/:verificationString" exact>
                    <EmailVerificationLandingPage />
                </Route>
                <Route path="/forgot-password" exact>
                    <ForgotPasswordPage />
                </Route>
                <Route path="/login" exact>
                    <LoginPage />
                </Route>
                <Route path="/reset-password/:passwordResetCode" exact>
                    <PasswordResetLandingPage />
                </Route>
                <Route path="/verify-email" exact>
                  <PleaseVerifyEmailPage />
                </Route>
                <Route path="/signup" exact>
                    <SignupPage />
                </Route>
            </Switch>
        </Router>
    );
}