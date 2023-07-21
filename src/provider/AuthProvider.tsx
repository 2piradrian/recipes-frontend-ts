import { createContext, useState, useEffect, Dispatch, SetStateAction } from "react";
import { Tokens, fullUserData } from "../types/types";
import { toast } from "react-hot-toast";
import axios from "axios";

type AuthContextType = {
	user: fullUserData | null;
	setUser: Dispatch<SetStateAction<fullUserData | null>>;
	session: Tokens | null;
	setSession: Dispatch<SetStateAction<Tokens | null>>;
};

const getTokensFromLocalStorage = () => {
	const tokens = localStorage.getItem("tokens");
	if (tokens) {
		return JSON.parse(tokens);
	} else {
		return null;
	}
};

const initialUser: fullUserData | null = null;
const initialSession: Tokens | null = getTokensFromLocalStorage();

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

	const tokenInstance = axios.create({
		baseURL: "http://localhost:3333/user",
	});

	const refreshTokenInstance = axios.create({
		baseURL: "http://localhost:3333/auth/refresh-token",
	});

	const saveToLocalStorage = (state: Tokens | null) => {
		localStorage.setItem("tokens", JSON.stringify(state));
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
				} catch (error) {
					// Borrar tokens de localStorage
					localStorage.removeItem("tokens");
					setSession(null);
				}
			}
		};
		const refreshSession = async () => {
			if (session?.refreshToken) {
				try {
					const response = await refreshTokens(session.refreshToken);
					setSession(response);
				} catch (error) {
					// Borrar tokens de localStorage
					localStorage.removeItem("tokens");
				}
			}
		};
		refreshSession(); // Llama a la función de refresco al cargar el proveedor de autenticación
		checkSession(); // Llama a la función de comprobación al cargar el proveedor de autenticación
	}, []);

	useEffect(() => {
		saveToLocalStorage(session);
	}, [session]);

	return (
		<AuthContext.Provider value={{ user, setUser, session, setSession }}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };
