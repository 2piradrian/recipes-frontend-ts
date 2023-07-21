import { useEffect } from "react";
import { useSelector } from "react-redux";
import RecipeCard from "../components/recipe-card/RecipeCard";
import SearchBar from "../components/search-bar/SearchBar";
import useScroll from "../hooks/useScroll";

function Explore() {
	const { recipes, setFilter, handleScroll } = useScroll();

	useEffect(() => {
		handleScroll();
	}, []);

	return (
		<div className="bigcontainer">
			<SearchBar setFilter={setFilter} />
			<div className="wrapcontainer">
				{recipes.map((recipe) => (
					<RecipeCard key={recipe.id} {...recipe} />
				))}
			</div>
		</div>
	);
}

export default Explore;
