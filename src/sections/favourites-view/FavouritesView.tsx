import { useState, useEffect } from "react";
import { recipe, recipeData } from "../../types/types";
import Loader from "../../components/loader/Loader";
import NoList from "../../components/no-list/NoList";
import RecipeCard from "../../components/recipe-card/RecipeCard";
import useRecipes from "../../hooks/useRecipes";
import style from "./style.module.css";

function FavouritesView() {
	const [favs, setFavs] = useState<Array<recipeData>>([]);
	const { getListOfRecipes } = useRecipes();

	useEffect(() => {
		const getAyncFavourites = async () => {
			const recipes = await getListOfRecipes();
			setFavs(recipes as unknown as Array<recipeData>);
		};
		getAyncFavourites();
	}, []);

	return (
		<div className={style.container}>
			{favs ? favs.map((fav) => <RecipeCard key={fav.id} {...fav} />) : <Loader />}
			{!favs?.length ? <NoList text="Vaya, aun no has dado likes..." /> : null}
		</div>
	);
}

export default FavouritesView;
