import { Tokens } from "../../types/types";

const initialState: Tokens = {
	access: "",
	refresh: "",
};

const saveToLocalStorage = (state: Tokens) => {
	localStorage.setItem("tokens", JSON.stringify(state));
};

const getTokensFromLocalStorage = () => {
	const tokens = localStorage.getItem("tokens");
	if (tokens) {
		return JSON.parse(tokens);
	} else {
		return initialState;
	}
};

export const authReducer = (state: Tokens = getTokensFromLocalStorage(), action: any) => {
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
