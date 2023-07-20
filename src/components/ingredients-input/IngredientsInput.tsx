import { unit } from "../../data/data";
import FormSelector from "../form-selector/FormSelector";
import { useState } from "react";

type Props = {
	id: number;
	ingredient?: any;
};

function IngredientsInput({ id, ingredient }: Props) {
	const [ingredientInput, setIngredientInput] = useState(ingredient || "");

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
	) => {
		if (!ingredient) return;

		const { name, value } = e.target;

		setIngredientInput({
			...ingredientInput,
			[name.slice(0, -1)]: value,
		});
	};

	return (
		<div className="arrowInputs">
			<div className="columnInputs" style={{ width: "180px" }}>
				<input
					placeholder="Cant."
					name={`cant${id}`}
					value={ingredientInput?.cant}
					onChange={handleChange}
				/>
			</div>
			<div className="columnInputs">
				<select name={`unit${id}`} value={ingredientInput?.unit} onChange={handleChange}>
					<FormSelector data={unit} label="Medida" />
				</select>
			</div>
			<div className="columnInputs">
				<input
					placeholder="Azúcar"
					name={`name${id}`}
					value={ingredientInput?.name}
					onChange={handleChange}
				/>
			</div>
		</div>
	);
}

export default IngredientsInput;
