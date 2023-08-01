import { fullUserData, registerUserData } from "./../types/types";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { instance } from "../axios/instance";

function useAccount() {
	const navigate = useNavigate();

	const { setUser, session, setSession } = useContext(AuthContext);

	const register = (userData: registerUserData) => {
		try {
			instance.post("/auth/register", userData);
			toast("Ahora hay que ingresar 😅");
			toast("Usuario creado con éxito 👌");
			/* wait 1 second */
			setTimeout(() => {
				navigate("/login");
			}, 1000);
		} catch (error) {
			toast("Algo malió sal 😢");
		}
	};

	const login = async (email: string, password: string) => {
		try {
			const response = await instance.post("/auth/login", { email, password });

			setSession(response.data.tokens);
			setUser(response.data.user);

			toast("Ingreso Exitoso 👌");
			navigate("/user");
		} catch (error) {
			toast("Algo malió sal 😢");
		}
	};

	const updatePreferences = async (userData: fullUserData) => {
		try {
			const response = await instance.put("/user/", userData, {
				headers: {
					Authorization: `Bearer ${session?.accessToken}`,
				},
			});
			setUser(response.data);
			toast("Datos actualizados 👌");
		} catch (error) {
			toast("Algo malió sal 😢");
		}
	};

	const updateUserData = async (userData: fullUserData) => {
		try {
			const response = await instance.put("/user/", userData, {
				headers: {
					Authorization: `Bearer ${session?.accessToken}`,
				},
			});
			setUser(response.data);
		} catch (error) {
			toast("Algo malió sal 😢");
		}
	};

	return { register, login, updatePreferences, updateUserData };
}

export default useAccount;
