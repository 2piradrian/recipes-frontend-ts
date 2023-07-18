import { createContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fullUserData } from "../types/types";
import { toast } from "react-hot-toast";
import axios from "axios";
import { set_tokens, set_user_data } from "../redux/actions/actions";

type AuthContextType = {
	session: fullUserData | null;
	setSession: React.Dispatch<React.SetStateAction<fullUserData | null>>;
};

const initialAuth: fullUserData | null = null;

interface AuthProviderProps {
	children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType>({
	session: initialAuth,
	setSession: () => {},
});

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [session, setSession] = useState<fullUserData | null>(initialAuth);
	const dispatch = useDispatch();

	const tokenInstance = axios.create({
		baseURL: "http://localhost:3333/user",
	});

	const refreshTokenInstance = axios.create({
		baseURL: "http://localhost:3333/auth/refresh-token",
	});

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
					setSession(response); // Actualiza los datos del usuario en el estado
					dispatch(set_user_data(response)); // Actualiza los datos del usuario en el estado global
				} catch (error) {
					// Borrar tokens de localStorage
					localStorage.removeItem("tokens");
				}
			}
		};
		const refreshSession = async () => {
			const tokens = getTokensFromLocalStorage();
			if (tokens?.refreshToken) {
				try {
					const response = await refreshTokens(tokens.refreshToken);
					dispatch(set_tokens(response));
				} catch (error) {
					// Borrar tokens de localStorage
					localStorage.removeItem("tokens");
				}
			}
		};
		refreshSession(); // Llama a la función de refresco al cargar el proveedor de autenticación
		checkSession(); // Llama a la función de comprobación al cargar el proveedor de autenticación
	}, []);

	return <AuthContext.Provider value={{ session, setSession }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
