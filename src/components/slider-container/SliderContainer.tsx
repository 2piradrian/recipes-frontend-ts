import { recipe, recipeData } from "../../types/types";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../recipe-card/RecipeCard";
import style from "./style.module.css";
import Loader from "../loader/Loader";

type Props = {
	recipes: Array<recipeData>;
	needUser?: boolean;
};

function SliderContainer({ recipes, needUser }: Props) {
	const navigate = useNavigate();

	return (
		<div className={style.container}>
			{recipes ? (
				recipes.length >= 1 ? (
					recipes.map((recipe: recipeData) => <RecipeCard key={recipe.id!} {...recipe} />)
				) : /* deberia llegar un array vacío */
				needUser ? (
					<div className={style.alertContainer}>
						<div className={style.alert}>
							<p>Vaya, aún no has configurado tus gustos.</p>
							<button onClick={() => navigate("/user")}>Configurar</button>
						</div>
					</div>
				) : (
					<Loader />
				)
			) : (
				/* deberia llegar undefined */
				<div className={style.alertContainer}>
					<div className={style.alert}>
						<p>
							Vaya, aún no has iniciado sesion. Hazlo para tener acceso a todos los
							beneficios.
						</p>
						<button>Iniciar sesión</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default SliderContainer;
