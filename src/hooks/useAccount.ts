import { SesionData, registerUserData } from "./../types/types";
import { set_tokens, set_user_data } from "./../redux/actions/actions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useSelector } from "react-redux";

function useAccount() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const auth = useSelector((state: any) => state.auth);

	/* Axios instance */
	const instance = axios.create({
		baseURL: "http://localhost:3333/auth",
	});
	const tokenInstance = axios.create({
		baseURL: "http://localhost:3333/user",
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

	const loginByToken = async () => {
		if (!auth.accessToken) return toast("Algo malió sal");
		try {
			const response = await tokenInstance.post("/", null, {
				headers: {
					Authorization: `Bearer ${auth.accessToken}`,
				},
			});
			dispatch(set_user_data(response.data));
			return true;
		} catch (error) {
			toast("Algo malió sal 😢" + error);
		}
	};

	const sendDataToStore = (data: SesionData) => {
		dispatch(set_user_data(data.user));
		dispatch(set_tokens(data.tokens));
	};

	return { register, login, loginByToken };
}

export default useAccount;
