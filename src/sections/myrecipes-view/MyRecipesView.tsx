import { useEffect, useState } from "react";
import { recipeData } from "../../types/types";
import { MdOutlineLibraryAdd } from "react-icons/md";
import useRecipes from "../../hooks/useRecipes";
import RecipeCard from "../../components/recipe-card/RecipeCard";
import Loader from "../../components/loader/Loader";
import ActionButton from "../../components/action-button/ActionButton";
import NoList from "../../components/no-list/NoList";
import style from "./style.module.css";

function MyRecipesView() {
	const [userRecipes, setUserRecipes] = useState<Array<recipeData> | null>(null);
	const { getUserRecipes } = useRecipes();

	useEffect(() => {
		const getAyncFavourites = async () => {
			const recipes = await getUserRecipes();
			setUserRecipes(recipes as unknown as Array<recipeData>);
		};
		getAyncFavourites();
	}, []);

	return (
		<div className={style.container}>
			{userRecipes ? (
				userRecipes.map((fav) => <RecipeCard key={fav.id} {...fav} />)
			) : (
				<Loader />
			)}
			{userRecipes != null && !userRecipes?.length ? (
				<NoList text="Vaya, aun no has subido recetas..." />
			) : null}
			<ActionButton content={<MdOutlineLibraryAdd />} route="/editor" />
		</div>
	);
}

export default MyRecipesView;
