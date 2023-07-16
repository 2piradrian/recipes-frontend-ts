import { db } from "./../../firebase";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { SET_LOCAL_DATA, SET_USER_DATA, UPDATE_USER_DATA } from "../types/types";
import { action, fullUserData } from "./../../types/types";

export const userdataReducer = (state: fullUserData | {} = {}, action: action) => {
	const { payload, type } = action;
	switch (type) {
		case SET_USER_DATA:
			/* establece en el state el documento del usuario y además, lo sube a firerbase */
			setDoc(doc(collection(db, "users"), payload.email), payload);
			return { ...payload };
		case UPDATE_USER_DATA:
			/* actualiza en el state el documento del usuario y además, lo sube a firerbase */
			updateDoc(doc(collection(db, "users"), payload.email), payload);
			/* return { ...state }; */
			return { ...state, ...payload };
		case SET_LOCAL_DATA:
			/* establece en el state el documento de información del usuario */
			return { ...payload };
		default:
			return state;
	}
};
