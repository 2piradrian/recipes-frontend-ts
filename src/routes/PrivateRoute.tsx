import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { useContext } from "react";

type PrivateRouteProps = {
	redirectTo?: string;
};

function PrivateRoute({ redirectTo = "/login" }: PrivateRouteProps) {
	/* AuthProvider */
	const { user } = useContext(AuthContext);

	if (!user?.id) {
		return <Navigate to={redirectTo} replace />;
	}

	return <Outlet />;
}

export default PrivateRoute;
