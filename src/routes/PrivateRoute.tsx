import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { useContext } from "react";

type PrivateRouteProps = {
	redirectTo?: string;
};

function PrivateRoute({ redirectTo = "/login" }: PrivateRouteProps) {
	/* AuthProvider */
	const session = useContext(AuthContext);

	if (!session.session?.id) {
		{
			console.log(session);
		}
		return <Navigate to={redirectTo} replace />;
	}

	return <Outlet />;
}

export default PrivateRoute;
