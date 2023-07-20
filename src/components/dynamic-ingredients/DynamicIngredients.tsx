import { useEffect, useState } from "react";
import IngredientsInput from "../ingredients-input/IngredientsInput";
import style from "./style.module.css";

type Props = {
	data: string[];
};

function DynamicIngredients({ data }: Props) {
	const [count, setCount] = useState(data.length || 1);

	const handleDecrease = () => {
		if (count > 1) {
			setCount(count - 1);
		}
	};

	const handleIncrease = () => {
		setCount(count + 1);
	};

	const ingredients = [];

	for (let i = 0; i < count; i++) {
		ingredients.push(<IngredientsInput key={i} id={i} ingredient={data[i] || ""} />);
	}

	return (
		<div className="columnInputs">
			<div className="dynamicContainer">
				<label>Ingredientes</label>
				<div className="quantityContainer">
					<button type="button" className="quantityBtn" onClick={handleDecrease}>
						-
					</button>
					<button type="button" className="quantityBtn" onClick={handleIncrease}>
						+
					</button>
				</div>
			</div>
			<div className={style.ingredientsContainer}>{ingredients}</div>
		</div>
	);
}

export default DynamicIngredients;
