import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import useAccount from "../hooks/useAccount";

type PrivateRouteProps = {
	redirectTo?: string;
};

function PrivateRoute({ redirectTo = "/login" }: PrivateRouteProps) {
	const { loginByToken } = useAccount();

	const userData = useSelector((state: any) => state.userData);

	useEffect(() => {
		loginByToken();
	}, [loginByToken, userData]);

	if (!userData.id) {
		return <Navigate to={redirectTo} replace />;
	}

	return <Outlet />;
}

export default PrivateRoute;
