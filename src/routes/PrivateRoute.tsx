import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

type PrivateRouteProps = {
	redirectTo?: string;
};

function PrivateRoute({ redirectTo = "/login" }: PrivateRouteProps) {
	const { auth } = useContext(AuthContext);

	if (!auth) {
		return <Navigate to={redirectTo} replace />;
	}

	return <Outlet />;
}

export default PrivateRoute;
