import { useSelector } from "react-redux";
import UserProfile from "../sections/user-profile/UserProfile";
import { fullUserData } from "../types/types";
import { useState, useEffect } from "react";

function User() {
	const userData: fullUserData = useSelector((state: any) => state.userData);
	const [preferred, setPreferred] = useState<Array<string>>([]);

	useEffect(() => {
		userData.categories ? setPreferred([...userData.categories]) : setPreferred([]);
	}, [userData]);

	return (
		<div className="bigcontainer">
			<UserProfile user={userData} setPreferred={setPreferred} preferred={preferred} />
		</div>
	);
}

export default User;
