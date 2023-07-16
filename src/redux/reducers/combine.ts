import { authReducer } from "./auth";
import { filtersReducer } from "./filters";
import { userdataReducer } from "./userdata";
import { combineReducers } from "redux";

const reducer = combineReducers({
	userData: userdataReducer,
	filterData: filtersReducer,
	auth: authReducer,
});

export default reducer;
