import { QueryFieldFilterConstraint, where } from "firebase/firestore";
import { FILTER_CATEGORY, FILTER_NAME, NO_FILTER } from "../types/types";
import { action } from "./../../types/types";

const initalState = null;

export const filtersReducer = (
	state: QueryFieldFilterConstraint | null = initalState,
	action: action
) => {
	const { payload, type } = action;
	switch (type) {
		case FILTER_NAME:
			return where("name", "==", payload);
		case FILTER_CATEGORY:
			return where("category", "==", payload);
		case NO_FILTER:
			return null;
		default:
			return state;
	}
};
