import { toast } from "react-hot-toast";
import { ingredient } from "../../types/types";
import StepTitle from "../../components/step-title/StepTitle";
import DynamicIngredients from "../../components/dynamic-ingredients/DynamicIngredients";
import "../../styles/forms.css";

type Props = {
	handleStep: (number: number) => void;
	dataStep: (data: any) => void;
	data: any;
	style: Object;
};

function Step3({ handleStep, dataStep, data, style }: Props) {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget).entries();
		const inputs = Array.from(formData);
		const ingredientArray: any = inputs.reduce(
			(acc: { [index: number]: any }, [name, value]) => {
				const index = parseInt(name.match(/\d+/)?.[0] || "0");
				if (!acc[index]) {
					acc[index] = { cant: "", unit: "", name: "" };
				}
				if (name.startsWith("cant")) {
					acc[index].cant = value;
				} else if (name.startsWith("unit")) {
					acc[index].unit = value;
				} else if (name.startsWith("name")) {
					acc[index].name = value;
				}
				return acc;
			},
			[]
		);
		const hasEmptyValue = ingredientArray.some((ingredient: ingredient) =>
			Object.values(ingredient).some((value) => value === "")
		);

		if (hasEmptyValue) {
			toast.error("No pueden quedar campos vacíos");
		} else {
			dataStep(ingredientArray);
			handleStep(1);
		}
	};

	const handleDataChange = (newData: any) => {
		// Update the parent state with the new data received from DynamicIngredients
		dataStep(newData);
	};

	return (
		<form className="form" onSubmit={(e) => handleSubmit(e)} style={style}>
			<StepTitle step={3} title="¿Qué ingredientes lleva?" />
			<DynamicIngredients data={data} onDataChange={handleDataChange} />
			<div className="arrowInputs">
				<button
					type="button"
					onClick={() => {
						handleStep(-1);
					}}>
					Atrás
				</button>
				<button type="submit">Siguiente</button>
			</div>
		</form>
	);
}

export default Step3;
