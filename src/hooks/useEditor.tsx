import { useState } from "react";
import { useSelector } from "react-redux";
import { ingredient, recipe, Step1, Step2 } from "../types/types";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import useRecipes from "./useRecipes";

function useEditor() {
	const { id } = useParams();
	const { updateRecipe, uploadRecipe, getRecipeById } = useRecipes();

	const [formStep, setFormStep] = useState(1);
	const [dataStep1, setDataStep1] = useState<Step1>({
		title: "",
		category: "",
		estimatedTime: "",
		unit: "",
	});
	const [dataStep2, setDataStep2] = useState<Step2>({
		imageUrl: "",
		description: "",
	});
	const [dataStep3, setDataStep3] = useState<Array<ingredient>>([]);
	const [dataStep4, setDataStep4] = useState<Array<string>>([]);

	const userData = useSelector((state: any) => state.userData);

	useEffect(() => {
		if (!id) return;
		const getRecipeByID = async () => {
			const recipe = await getRecipeById(id);
			if (recipe!.authoruid !== userData.uid) return <Navigate to="/user" replace />;
			/* contruir la receta en los pasos */
			setDataStep1({
				title: recipe!.name,
				category: recipe!.category,
				estimatedTime: recipe!.time.split(" ")[0],
				unit: recipe!.time.split(" ")[1],
			});
			setDataStep2({
				imageUrl: recipe!.image,
				description: recipe!.description,
			});
			setDataStep3(recipe!.ingredients);
			setDataStep4(recipe!.steps);
		};
		getRecipeByID();
	}, [getRecipeById, id, userData]);

	useEffect(() => {
		const recipe: recipe = buildRecipe();

		if (formStep === 5) {
			if (id) {
				updateRecipe(recipe, id);
			} else {
				uploadRecipe(recipe);
			}
		}
	}, [dataStep1, dataStep2, dataStep3, dataStep4, formStep]);

	const buildRecipe = () => {
		const { title, category, estimatedTime, unit } = dataStep1;
		const { imageUrl, description } = dataStep2;
		return {
			description: description,
			name: title,
			category: category,
			time: `${estimatedTime} ${unit}`,
			image: imageUrl,
			ingredients: dataStep3!,
			steps: dataStep4!,
			comments: [], // ojo no sobreescribir
			authorname: `${userData.name} ${userData.surname}`,
			authoruid: userData.uid,
			authorphoto: userData.image,
		};
	};

	const isEnabled = (number: number) => {
		return { display: number === formStep ? "block" : "none" };
	};

	const handleStep = (number: number) => {
		setFormStep(formStep + number);
	};

	return {
		dataStep1,
		setDataStep1,
		dataStep2,
		setDataStep2,
		dataStep3,
		setDataStep3,
		dataStep4,
		setDataStep4,
		handleStep,
		isEnabled,
	};
}

export default useEditor;
