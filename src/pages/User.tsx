import { useSelector } from "react-redux";
import UserProfile from "../sections/user-profile/UserProfile";
import { fullUserData } from "../types/types";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

function User() {
	const { user } = useContext(AuthContext);
	const [preferred, setPreferred] = useState<Array<string>>([]);

	useEffect(() => {
		user!.categories ? setPreferred([...user!.categories]) : setPreferred([]);
	}, [user]);

	return (
		<div className="bigcontainer">
			<UserProfile user={user!} setPreferred={setPreferred} preferred={preferred} />
		</div>
	);
}

export default User;
