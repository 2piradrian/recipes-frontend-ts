import { categories } from "../../data/data";
import Titles from "../titles/Titles";
import style from "./style.module.css";

type Props = {
	setFilter: (filter: string | null) => void;
};

function SearchBar({ setFilter }: Props) {
	return (
		<div className={style.container}>
			<Titles title="Explora" subtitle="las recetas de la comunidad" />
			<div className={style.categories}>
				<div
					className={style.categoryContainer}
					onClick={() => {
						setFilter(null);
					}}>
					Todas
				</div>
				{categories.map((cat) => (
					<div
						className={style.categoryContainer}
						key={cat}
						onClick={() => {
							setFilter(cat);
						}}>
						{cat}
					</div>
				))}
			</div>
		</div>
	);
}

export default SearchBar;
