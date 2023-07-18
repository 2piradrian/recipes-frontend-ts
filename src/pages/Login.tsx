import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

import LoginForm from "../sections/login-form/LoginForm";

function Login() {
	const { user } = useContext(AuthContext);

	if (user?.id) {
		return <Navigate to="/user" replace />;
	}

	return <LoginForm />;
}

export default Login;
