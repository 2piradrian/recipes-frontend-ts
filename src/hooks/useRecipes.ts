import { useContext } from "react";
import { toast } from "react-hot-toast";
import { fullUserData, recipe } from "../types/types";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";

function useRecipes() {
	const { user, setUser } = useContext(AuthContext);

	const navigate = useNavigate();

	const instance = axios.create({
		baseURL: "http://localhost:3333/recipes",
	});

	/* añade la receta a la colección de recetas públicas */
	const createRecipe = async (recipe: recipe) => {
		try {
			const response = await instance.post("/", recipe);
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

	/* trae las recetas creadas por el usuario */
	const getUserRecipes = async () => {
		try {
			const response = await instance.get("/user-recipes/" + user!.id);
			return response.data;
		} catch (error: any) {
			toast("Algo malió sal 😢");
		}
	};

	/* actualizar receta */
	const updateRecipe = async (recipe: recipe, id: string) => {
		//updateDoc(doc(recipesCollection, id), recipe).then(() =>
		//	toast.success("Receta actualizada exitosamente")
		//);
		//navigate(`/recipe/${id}`);
	};

	/* trae las recetas que se muestran en /home */
	const getPrincipalRecipes = async () => {
		//const categories = user?.categories;
		//const last3 = await getDocs(query(recipesCollection, limit(3))).then((snapshot) =>
		//	snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
		//);
		//const recommended = await getDocs(
		//	query(
		//		recipesCollection,
		//		limit(3),
		//		where(
		//			"category",
		//			"==",
		//			categories !== undefined && categories.length > 0
		//				? categories[Math.floor(Math.random() * categories.length)]
		//				: null
		//		)
		//	)
		//).then((snapshot) => snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
		//return {
		//	last3,
		//	recommended,
		//};
	};

	/* trae una receta por id */
	const getRecipeById = async (id: string) => {
		//const docSnap = await getDoc(doc(db, "recipes", id));
		//const recipe: recipe = {
		//	id: docSnap.id,
		//	...(docSnap.data() as recipe),
		//};
		//return recipe;
	};

	/* obtener las favoritas o las creadas por el usuario */
	const getListOfRecipes = async (type: boolean = false) => {
		/* si es verdadero trae las recetas del usuario, si es falso trae sus favoritas */
		//const list = (type ? user.recipes : user.favourites) || [];
		//const promises = list.map((id: string) => getRecipeById(id));
		//const recipes = await Promise.all(promises);
		//return recipes;
	};

	/* manejador de likes */
	const manageLike = async (id: string) => {
		//if (!user!.favourites) {
		//	return toast.error("Esta acción es solo para usuarios registrados");
		//}
		//let updatedLikes;
		//const likes = user.favourites;
		//
		//if (likes.includes(id!)) {
		//	updatedLikes = likes.filter((like: string) => like !== id);
		//} else {
		//	updatedLikes = [...likes, id!];
		//}
		//
		//dispatch(
		//	update_user_data({
		//		...user,
		//		favourites: updatedLikes,
		//	})
		//);
	};

	return {
		createRecipe,
		getUserRecipes,
		/*  */
		getPrincipalRecipes,
		getRecipeById,
		updateRecipe,
		getListOfRecipes,
		manageLike,
	};
}

export default useRecipes;
