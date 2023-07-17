import { SET_USER_DATA, UPDATE_USER_DATA } from "../types/types";
import { action, fullUserData } from "./../../types/types";

export const userdataReducer = (state: fullUserData | {} = {}, action: action) => {
	const { payload, type } = action;
	switch (type) {
		case SET_USER_DATA:
			/* establece en el state el documento de información del usuario */
			return { ...payload };
		case UPDATE_USER_DATA:
			/* actualiza la información del usuario (nuevas recetas) */
			return { ...state, ...payload };
		/* si vamos a hacer logout debo limpiar el estado acá */
		default:
			return state;
	}
};
