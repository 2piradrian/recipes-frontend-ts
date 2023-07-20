import style from "./style.module.css";
import { useState } from "react";

type Props = {
	id: number;
	step?: string;
};

function StepsInput({ id, step }: Props) {
	const [stepInput, setStepInput] = useState(step || "");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setStepInput(value);
	};

	return (
		<div className={style.arrowStep}>
			<label>{id + 1})</label>
			<input
				placeholder="Que debo hacer ahora?"
				name={`name${id}`}
				value={stepInput}
				onChange={handleChange}
			/>
		</div>
	);
}

export default StepsInput;
