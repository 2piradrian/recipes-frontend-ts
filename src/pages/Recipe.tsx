import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/loader/Loader";
import useRecipes from "../hooks/useRecipes";
import RecipeView from "../sections/recipe-view/RecipeView";
import { recipe } from "../types/types";

function Recipe() {
	const { id } = useParams();
	const { getRecipeById } = useRecipes();
	const [request, setRequest] = useState<recipe | null | undefined>();

	useEffect(() => {
		const fetchRecipe = async () => {
			const recipe = await getRecipeById(id!);
			setRequest(recipe as recipe);
		};
		fetchRecipe();
	}, [getRecipeById, id]);

	return (
		<div className="bigcontainer">{request ? <RecipeView recipe={request} /> : <Loader />}</div>
	);
}

export default Recipe;
