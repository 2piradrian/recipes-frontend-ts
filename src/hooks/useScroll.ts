import { collection, getDocs, limit, orderBy, query, startAfter } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase";
import { recipe, recipeData } from "../types/types";

function useScroll() {
	const [lastRecipe, setLastRecipe] = useState<recipe | boolean>(true);
	const [recipes, setRecipes] = useState<Array<recipeData>>([]);

	const filterData = useSelector((state: any) => state.filterData);
	const recipesCollection = collection(db, "recipes");

	const handleScroll = async () => {
		const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
		if (scrollTop + clientHeight >= scrollHeight - 175) {
			const recipesList = await getLazyRecipes();
			setRecipes(recipes.concat(...recipesList));
		}
	};

	const lazyRecipes = async () => {
		if (!lastRecipe) return { list: [], lastDoc: false };

		const q = query(
			recipesCollection,
			filterData,
			limit(5),
			orderBy("description"),
			startAfter(lastRecipe)
		);

		const recipesOfTheStep = await getDocs(q).then((snapshot) => {
			const arrayOfRecipes: any = [];
			const arrayOfLastRecipes: any = [];
			snapshot.docs.map((doc) => {
				const recipeDoc = { id: doc.id, ...doc.data() } as recipe;
				arrayOfRecipes.push(recipeDoc);
				arrayOfLastRecipes.push(doc);
			});
			return {
				list: arrayOfRecipes,
				lastDoc: arrayOfLastRecipes[arrayOfLastRecipes.length - 1],
			};
		});
		return recipesOfTheStep;
	};

	const getLazyRecipes = async () => {
		const recipesOfTheStep = await lazyRecipes();
		setLastRecipe(recipesOfTheStep.lastDoc);
		return recipesOfTheStep.list;
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [handleScroll]);

	useEffect(() => {
		setLastRecipe(true);
		setRecipes([]);
	}, [filterData]);

	useEffect(() => {
		const updateStates = async () => {
			setRecipes(await getLazyRecipes());
		};
		if (typeof lastRecipe === "boolean" && !recipes.length) {
			updateStates();
		}
	}, [recipes, lastRecipe, filterData]);

	return { recipes, handleScroll };
}

export default useScroll;
