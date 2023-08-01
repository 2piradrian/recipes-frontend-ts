import axios from "axios";

export const instance = axios.create({
	baseURL: "https://recipes-app-backend-ts.onrender.com",
	//baseURL: "http://localhost:3333",
});
