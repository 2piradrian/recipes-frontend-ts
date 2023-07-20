import { unit } from "../../data/data";
import FormSelector from "../form-selector/FormSelector";

type Props = {
	id: number;
	ingredient?: any;
	onDataChange: (id: number, updatedIngredient: any) => void;
};

function IngredientsInput({ id, ingredient, onDataChange }: Props) {
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
	) => {
		if (!ingredient) return;

		const { name, value } = e.target;
		const updatedIngredient = { ...ingredient, [name]: value };
		onDataChange(id, updatedIngredient); // Update the parent state with the updated ingredient
	};

	return (
		<div className="arrowInputs">
			<div className="columnInputs" style={{ width: "180px" }}>
				<input
					placeholder="Cant."
					name={`cant${id}`}
					value={ingredient?.cant}
					onChange={handleChange}
				/>
			</div>
			<div className="columnInputs">
				<select name={`unit${id}`} value={ingredient?.unit} onChange={handleChange}>
					<FormSelector data={unit} label="Medida" />
				</select>
			</div>
			<div className="columnInputs">
				<input
					placeholder="Azúcar"
					name={`name${id}`}
					value={ingredient?.name}
					onChange={handleChange}
				/>
			</div>
		</div>
	);
}

export default IngredientsInput;
