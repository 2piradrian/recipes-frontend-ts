import { Tokens } from "../../types/types";

const initialState: Tokens = {
	access: "",
	refresh: "",
};

const saveToLocalStorage = (state: Tokens | null) => {
	localStorage.setItem("tokens", JSON.stringify(state));
};

export const authReducer = (state: Tokens | null = initialState, action: any) => {
	const { payload, type } = action;
	switch (type) {
		case "SET_TOKENS":
			saveToLocalStorage(payload);
			return { ...payload };
		case "REMOVE_TOKENS":
			localStorage.removeItem("tokens");
			return initialState;
		default:
			return state;
	}
};
