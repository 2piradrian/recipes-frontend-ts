import { useEffect, useState } from "react";
import useRecipes from "../hooks/useRecipes";
import Welcome from "../sections/welcome/Welcome";

function Home() {
	const { getPrincipalRecipes } = useRecipes();
	const [recipes, setRecipes] = useState({
		last3: [],
		recommended: [],
		following: [],
	});

	useEffect(() => {
		const fetchRecipes = async () => {
			const recipes: any = await getPrincipalRecipes();
			setRecipes(recipes);
		};
		fetchRecipes();
	}, []);

	return <Welcome recipes={recipes} />;
}

export default Home;
