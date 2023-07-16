import { categories } from "../../data/data";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { filter_category, no_filters } from "../../redux/actions/actions";
import Titles from "../titles/Titles";
import style from "./style.module.css";

function SearchBar() {
	const [filter, setFilter] = useState<string | null>();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(filter ? filter_category(filter) : no_filters());
	}, [filter]);

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
