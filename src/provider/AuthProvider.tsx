import { createContext, useState, useEffect, Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { Tokens, fullUserData } from "../types/types";
import { toast } from "react-hot-toast";
import axios from "axios";
import { set_user_data } from "../redux/actions/actions";

type AuthContextType = {
	user: fullUserData | null;
	setUser: Dispatch<SetStateAction<fullUserData | null>>;
	session: Tokens | null;
	setSession: Dispatch<SetStateAction<Tokens | null>>;
};

const initialUser: fullUserData | null = null;
const initialSession: Tokens | null = null;

interface AuthProviderProps {
	children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType>({
	user: initialUser,
	setUser: () => {},
	session: initialSession,
	setSession: () => {},
});

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [session, setSession] = useState<Tokens | null>(initialSession);
	const [user, setUser] = useState<fullUserData | null>(initialUser);

	const dispatch = useDispatch();

	const tokenInstance = axios.create({
		baseURL: "http://localhost:3333/user",
	});

	const refreshTokenInstance = axios.create({
		baseURL: "http://localhost:3333/auth/refresh-token",
	});

	const saveToLocalStorage = (state: Tokens | null) => {
		localStorage.setItem("tokens", JSON.stringify(state));
	};

	const getTokensFromLocalStorage = () => {
		const tokens = localStorage.getItem("tokens");
		if (tokens) {
			return JSON.parse(tokens);
		} else {
			return null;
		}
	};

	const loginByToken = async (token: string) => {
		if (!token) return toast("Inicio de sesión requerido 😅");
		try {
			const response = await tokenInstance.post("/", null, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data;
		} catch (error) {
			toast("Algo malió sal 😢");
		}
	};

	const refreshTokens = async (token: string) => {
		if (!token) return toast("Inicio de sesión requerido 😅");
		try {
			const response = await refreshTokenInstance.post("/", {
				refreshToken: token,
			});
			return response.data;
		} catch (error) {
			toast("Algo malió sal 😢");
		}
	};

	useEffect(() => {
		const tokens = getTokensFromLocalStorage();
		const checkSession = async () => {
			// Comprueba si hay un token almacenado en localStorage
			if (tokens?.accessToken) {
				try {
					// Intenta iniciar sesión por token para obtener los datos del usuario
					const response = await loginByToken(tokens.accessToken);
					setUser(response); // Actualiza los datos del usuario en el estado
					setSession(tokens); // Actualiza los tokens en el estado
					dispatch(set_user_data(response)); // Actualiza los datos del usuario en el estado global
				} catch (error) {
					// Borrar tokens de localStorage
					localStorage.removeItem("tokens");
					setSession(null);
				}
			}
		};
		const refreshSession = async () => {
			const tokens = getTokensFromLocalStorage();
			if (tokens?.refreshToken) {
				try {
					const response = await refreshTokens(tokens.refreshToken);
					saveToLocalStorage(response);
				} catch (error) {
					// Borrar tokens de localStorage
					localStorage.removeItem("tokens");
				}
			}
		};
		refreshSession(); // Llama a la función de refresco al cargar el proveedor de autenticación
		checkSession(); // Llama a la función de comprobación al cargar el proveedor de autenticación
	}, []);

	return (
		<AuthContext.Provider value={{ user, setUser, session, setSession }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
