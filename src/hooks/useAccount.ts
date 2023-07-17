import { SesionData, registerUserData } from "./../types/types";
import { set_tokens, set_user_data } from "./../redux/actions/actions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

function useAccount() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { setSession } = useContext(AuthContext);

	/* Axios instance */
	const instance = axios.create({
		baseURL: "http://localhost:3333/auth",
	});

	const register = (userData: registerUserData) => {
		try {
			instance.post("/register", userData);
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
			const response = await instance.post("/login", { email, password });
			sendDataToStore(response.data);
			toast("Ingreso Exitoso 👌");
			navigate("/user");
		} catch (error) {
			toast("Algo malió sal 😢");
		}
	};

	const sendDataToStore = (data: SesionData) => {
		dispatch(set_user_data(data.user));
		dispatch(set_tokens(data.tokens));
		setSession(data.user);
	};

	return { register, login };
}

export default useAccount;
