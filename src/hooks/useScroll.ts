import { useEffect, useState } from "react";
import { recipeData } from "../types/types";
import axios from "axios";

function useScroll() {
	const [recipes, setRecipes] = useState<Array<recipeData>>([]);
	const [filter, setFilter] = useState<string | null>(null);
	const [page, setPage] = useState(1);

	const instance = axios.create({
		baseURL: "https://recipes-app-backend-ts.onrender.com/recipes/page",
		//baseURL: "http://localhost:3333/recipes/page",
	});

	const fetchPage = async (pageNumber: number, category: string | null) => {
		const response = await instance.post("/", {
			page: pageNumber,
			pageSize: 5,
			category: category,
		});
		return response.data;
	};

	const handleScroll = async () => {
		const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
		if (scrollTop + clientHeight >= scrollHeight - 175) {
			const recipesList = await fetchPage(page, filter);
			setPage(page + 1);
			setRecipes(recipes.concat(...recipesList));
		}
	};

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [handleScroll]);

	useEffect(() => {
		setRecipes([]);
		setPage(1);
		fetchPage(1, filter).then((recipesList) => {
			setRecipes(recipesList);
			setPage(page + 1);
		});
	}, [filter]);

	return { recipes, setFilter, handleScroll };
}

export default useScroll;
