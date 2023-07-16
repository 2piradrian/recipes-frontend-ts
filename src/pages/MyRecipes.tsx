import Titles from "../components/titles/Titles";
import MyRecipesView from "../sections/myrecipes-view/MyRecipesView";

function MyRecipes() {
	return (
		<div className="bigcontainer">
			<Titles title="Tus recetas" subtitle="valoramos tus aportes a la comunidad" />
			<MyRecipesView />
		</div>
	);
}

export default MyRecipes;
