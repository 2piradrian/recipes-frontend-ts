import { useState } from "react";
import IngredientsInput from "../ingredients-input/IngredientsInput";
import style from "./style.module.css";

type Props = {
	data: any;
	onDataChange: (data: any) => void;
};

function DynamicIngredients({ data, onDataChange }: Props) {
	const [count, setCount] = useState(data.length || 1);

	const handleDecrease = () => {
		if (count > 1) {
			setCount(count - 1);
			onDataChange(data.slice(0, count - 1)); // Update the parent state with the new data
		}
	};

	const handleIncrease = () => {
		setCount(count + 1);
		onDataChange([...data, { cant: "", unit: "", name: "" }]); // Update the parent state with the new data
	};

	const handleDataChange = (id: number, updatedIngredient: any) => {
		const newData = [...data];
		newData[id] = updatedIngredient;
		onDataChange(newData); // Update the parent state with the updated data
	};

	let ingredients = [];
	for (let i = 0; i < count; i++) {
		ingredients.push(
			<IngredientsInput
				key={i}
				id={i}
				ingredient={data[i]}
				onDataChange={(id, updatedIngredient) => handleDataChange(id, updatedIngredient)}
			/>
		);
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
