import { ingredient, recipe } from "../../types/types";
import { useSelector } from "react-redux";
import { AiFillEdit } from "react-icons/ai";
import ActionButton from "../../components/action-button/ActionButton";
import style from "./style.module.css";

type Props = {
	recipe: recipe;
};

function RecipeView({ recipe }: Props) {
	const userData = useSelector((state: any) => state.userData);

	const setFormat = (ingredient: ingredient) => {
		if (ingredient.unit === "a gusto") {
			return `${ingredient.name} ${ingredient.unit}`;
		}
		return `${ingredient.cant} ${ingredient.unit} de ${ingredient.name}`;
	};

	return (
		<div className={style.container}>
			<h1 className={style.name}>{recipe?.name}</h1>
			<img src={recipe.image} alt={recipe.name} className={style.image} />
			<div className={style.textContainer}>
				<h2>Tiempo estimado</h2>
				<p className={style.time}>{recipe.time}</p>
				<h2>Descripción</h2>
				<p className={style.description}>{recipe.description}</p>
				<h2>Ingredientes</h2>
				<ul>
					{recipe.ingredients.map((ingredient, index) => (
						<li className={style.ingredient} key={index}>
							{setFormat(ingredient)}
						</li>
					))}
				</ul>
				<h2>Paso a paso</h2>
				<ol>
					{recipe.steps.map((step, index) => (
						<li className={style.steps} key={index}>
							{step}
						</li>
					))}
				</ol>
				{userData.uid === recipe.authoruid ? (
					<ActionButton content={<AiFillEdit />} route={`/editor/${recipe.id}`} />
				) : null}
			</div>
		</div>
	);
}

export default RecipeView;
