import { useContext } from "react";
import { toast } from "react-hot-toast";
import { fullUserData, recipe } from "../types/types";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import useAccount from "./useAccount";
import { instance } from "../axios/instance";

function useRecipes() {
	const { user, setUser, session } = useContext(AuthContext);
	const { updateUserData } = useAccount();

	const navigate = useNavigate();

	/* añade la receta a la colección de recetas públicas */
	const createRecipe = async (recipe: recipe) => {
		try {
			const response = await instance.post("/recipes/", recipe, {
				headers: {
					Authorization: "Bearer " + session!.accessToken,
				},
			});
			const newRecipe = response.data;

			setUser({
				...user!,
				recipes: [...(user as fullUserData)!.recipes, newRecipe.id],
			});

			toast.success("Receta subida exitosamente");
			navigate(`/recipe/${newRecipe.id}`);
		} catch (error: any) {
			toast("Algo malió sal 😢");
		}
	};

	/* trae una receta por id */
	const getRecipeById = async (id: string) => {
		try {
			const response = await instance.get("/recipes/" + id);
			return response.data;
		} catch (error: any) {
			toast("Algo malió sal 😢");
		}
	};

	/* trae las recetas creadas por el usuario */
	const getUserRecipes = async () => {
		try {
			const response = await instance.get("/recipes/user-recipes/" + user!.id);
			return response.data;
		} catch (error: any) {
			toast("Algo malió sal 😢");
		}
	};

	/* manejador de likes */
	const manageLike = async (id: string) => {
		if (!user) {
			return toast.error("Esta acción es solo para usuarios registrados");
		}
		let updatedLikes;
		const likes = user.favourites;

		if (likes.includes(id!)) {
			updatedLikes = likes.filter((like: string) => like !== id);
		} else {
			updatedLikes = [...likes, id!];
		}
		updateUserData({
			...user,
			favourites: updatedLikes,
		});
	};

	/* recetas likadas */
	const getLikedRecipes = async () => {
		try {
			const response = await instance.post("/recipes/liked", null, {
				headers: {
					Authorization: "Bearer " + session!.accessToken,
				},
			});
			return response.data.likedRecipes;
		} catch (error: any) {
			toast("Algo malió sal 😢");
		}
	};

	/* actualizar receta */
	const updateRecipe = async (recipe: recipe, id: string) => {
		try {
			const response = await instance.put("/recipes/" + id, recipe, {
				headers: {
					Authorization: "Bearer " + session!.accessToken,
				},
			});
			const updatedRecipe = response.data;
			toast.success("Receta actualizada exitosamente");
			navigate(`/recipe/${updatedRecipe.id}`);
		} catch (error: any) {
			toast("Algo malió sal 😢");
		}
	};

	/* trae las recetas que se muestran en /home */
	const getPrincipalRecipes = async () => {
		const last3 = await instance.get("/recipes/home/lastest");
		let recommended;

		if (user?.id && session?.accessToken) {
			const response = await instance.post("/recipes/home/recommended", null, {
				headers: {
					Authorization: "Bearer " + session!.accessToken,
				},
			});
			recommended = response.data;
		} else {
			recommended = [];
		}

		return {
			last3: last3.data,
			recommended: recommended,
		};
	};

	return {
		createRecipe,
		getUserRecipes,
		manageLike,
		getRecipeById,
		getLikedRecipes,
		/*  */
		getPrincipalRecipes,
		updateRecipe,
	};
}

export default useRecipes;
