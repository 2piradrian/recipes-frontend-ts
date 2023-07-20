import { unit } from "../../data/data";
import FormSelector from "../form-selector/FormSelector";

type Props = {
	id: number;
	ingredient?: any;
};

function IngredientsInput({ id, ingredient }: Props) {
	//
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>
	) => {
		if (!ingredient) return;

		const { name, value } = e.target;
		ingredient[name] = value;
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
