import { getAuth, User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { db } from "../firebase";
import { set_local_data } from "../redux/actions/actions";
import { fullUserData } from "../types/types";

type AuthContextType = {
	auth: User | null;
	syncUserData: (email: string) => Promise<void>;
};

const initialAuth: User | null = null;

interface AuthProviderProps {
	children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType>({
	auth: initialAuth,
	syncUserData: async () => {},
});

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [auth, setAuth] = useState<User | null>(initialAuth);
	const dispatch = useDispatch();

	/* se trae el documento del usuario y lo almacena en el state */
	const syncUserData = async (email: string) => {
		try {
			const userData = await getUserData(email);
			dispatch(set_local_data(userData as fullUserData));
		} catch (error) {
			toast.error(`Error fetching user data: ${error}`);
		}
	};

	/* hace la consulta a firebase */
	const getUserData = async (email: string) => {
		const docSnap = await getDoc(doc(db, "users", email));
		return docSnap.data();
	};

	useEffect(() => {
		const unregisterAuthObserver = getAuth().onAuthStateChanged(function (user) {
			if (user) {
				setAuth(user);
				syncUserData(user.email || "");
			} else {
				setAuth(null);
				dispatch(set_local_data(null));
			}
		});
		return () => unregisterAuthObserver();
	}, []);

	return <AuthContext.Provider value={{ auth, syncUserData }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
