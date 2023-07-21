import SliderContainer from "../../components/slider-container/SliderContainer";
import Titles from "../../components/titles/Titles";

type Props = {
	recipes: any;
};

function Welcome({ recipes }: Props) {
	return (
		<div className="bigcontainer">
			<Titles title="Novedades" subtitle="recetas de la comunidad" />
			<SliderContainer recipes={recipes.last3} />
			<Titles title="Para ti" subtitle="basado en tus categorias favoritas" />
			<SliderContainer recipes={recipes.recommended} needUser />
		</div>
	);
}

export default Welcome;
