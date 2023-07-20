import { useState } from "react";
import StepsInput from "../steps-input/StepsInput";
import style from "./style.module.css";

type Props = {
	data: any;
};

function DynamicSteps({ data }: Props) {
	const [count, setCount] = useState(data.length + 1);

	const handleDecrease = () => {
		if (count > 1) {
			setCount(count - 1);
		}
	};

	const handleIncrease = () => {
		setCount(count + 1);
	};

	const steps = [];

	for (let i = 0; i < count; i++) {
		steps.push(<StepsInput key={i} id={i} step={data[i]} />);
	}

	return (
		<div className="columnInputs">
			<div className="dynamicContainer">
				<label>Pasos a seguir</label>
				<div className="quantityContainer">
					<button type="button" className="quantityBtn" onClick={handleDecrease}>
						-
					</button>
					<button type="button" className="quantityBtn" onClick={handleIncrease}>
						+
					</button>
				</div>
			</div>
			<div className={style.stepsContainer}>{steps}</div>
		</div>
	);
}

export default DynamicSteps;
