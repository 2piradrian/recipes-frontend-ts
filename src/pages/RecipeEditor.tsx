import useEditor from "../hooks/useEditor";
import Step1 from "../sections/recipe-form/Step1";
import Step2 from "../sections/recipe-form/Step2";
import Step3 from "../sections/recipe-form/Step3";
import Step4 from "../sections/recipe-form/Step4";

function RecipeEditor() {
	const {
		dataStep1,
		dataStep2,
		dataStep3,
		dataStep4,
		handleStep,
		isEnabled,
		setDataStep1,
		setDataStep2,
		setDataStep3,
		setDataStep4,
	} = useEditor();

	return (
		<section className="centercontainer">
			<Step1
				handleStep={handleStep}
				dataStep={setDataStep1}
				data={dataStep1}
				style={isEnabled(1)}
			/>
			<Step2
				handleStep={handleStep}
				dataStep={setDataStep2}
				data={dataStep2}
				style={isEnabled(2)}
			/>
			<Step3
				handleStep={handleStep}
				dataStep={setDataStep3}
				data={dataStep3}
				style={isEnabled(3)}
			/>
			<Step4
				handleStep={handleStep}
				dataStep={setDataStep4}
				data={dataStep4}
				style={isEnabled(4)}
			/>
		</section>
	);
}

export default RecipeEditor;
