import { useEffect } from "react";
import { useSelector } from "react-redux";
import RecipeCard from "../components/recipe-card/RecipeCard";
import SearchBar from "../components/search-bar/SearchBar";
import useScroll from "../hooks/useScroll";

function Explore() {
	const { recipes, handleScroll } = useScroll();
	const filterData = useSelector((state: any) => state.filterData);

	useEffect(() => {
		handleScroll();
	}, [filterData]);

	return (
		<div className="bigcontainer">
			<SearchBar />
			<div className="wrapcontainer">
				{recipes.map((recipe) => (
					<RecipeCard key={recipe.id} {...recipe} />
				))}
			</div>
		</div>
	);
}

export default Explore;
