import { toast, Toaster } from "react-hot-toast";
import DynamicSteps from "../../components/dynamic-steps/DynamicSteps";
import StepTitle from "../../components/step-title/StepTitle";

type Props = {
	handleStep: (number: number) => void;
	dataStep: (data: any) => void;
	data: any;
	style: Object;
};

function Step4({ handleStep, dataStep, data, style }: Props) {
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget).entries();
		const inputs = Array.from(formData);
		const stepArray: any = inputs.reduce((acc: { [index: number]: any }, [name, value]) => {
			const index = parseInt(name.match(/\d+/)?.[0] || "0");
			if (!acc[index]) {
				acc[index] = [];
			}
			acc[index] = value;
			return acc;
		}, []);
		const hasEmptyValue = stepArray.some((step: string) => step === "");

		if (hasEmptyValue) {
			toast.error("No pueden quedar campos vacíos");
		} else {
			dataStep(stepArray);
			handleStep(1);
		}
	};

	return (
		<form className="form" onSubmit={(e) => handleSubmit(e)} style={style}>
			<StepTitle step={4} title="Paso a paso" />
			<DynamicSteps data={data} />
			<div className="arrowInputs">
				<button
					type="button"
					onClick={() => {
						handleStep(-1);
					}}>
					Atrás
				</button>
				<button type="submit">Subir</button>
			</div>
			<Toaster position="top-right" />
		</form>
	);
}

export default Step4;
