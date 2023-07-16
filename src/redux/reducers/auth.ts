import { Tokens } from "../../types/types";

const initialState: Tokens = {
	access: "",
	refresh: "",
};

export const authReducer = (state: Tokens = initialState, action: any) => {
	const { payload, type } = action;
	switch (type) {
		case "SET_TOKENS":
			return { ...payload };
		case "REMOVE_TOKENS":
			return initialState;
		default:
			return state;
	}
};
