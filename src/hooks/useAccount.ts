import { partialUserData } from "./../types/types";
import { get_user_data, set_user_data } from "./../redux/actions/actions";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-hot-toast";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";

function useAccount() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	/* crea una cuenta sin tener que exponer el auth */
	const createAccountWithEmail = (email: string, password: string, userData: partialUserData) => {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				toast("Usuario creado con éxito 👌");
				const fullData = { ...userData, uid: userCredential.user.uid };
				dispatch(set_user_data(fullData));
				logInWithEmail(email, password);
			})
			.catch((error) => {
				if (error.code === "auth/email-already-in-use") {
					toast(
						"El correo electrónico ya está en uso. Por favor, intente con otro correo electrónico."
					);
				} else {
					toast("Algo salió mal 😢");
				}
			});
	};

	/* ingresa a la cuenta sin tener que exponer el auth */
	const logInWithEmail = (email: string, password: string) => {
		signInWithEmailAndPassword(auth, email, password)
			.then(() => {
				dispatch(get_user_data(email));
				navigate("/user");
			})
			.catch((error) => {
				if (error.code === "auth/wrong-password") {
					toast("Contraseña incorrecta. Por favor, intenta de nuevo.");
				} else {
					toast("Algo salió mal 😢");
				}
			});
	};

	return { createAccountWithEmail, logInWithEmail };
}

export default useAccount;
