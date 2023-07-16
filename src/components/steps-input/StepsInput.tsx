import style from "./style.module.css";

type Props = {
	id: number;
	step?: string;
};

function StepsInput({ id, step }: Props) {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		step = value;
	};

	return (
		<div className={style.arrowStep}>
			<label>{id + 1})</label>
			<input
				placeholder="Que debo hacer ahora?"
				name={`name${id}`}
				value={step}
				onChange={handleChange}
			/>
		</div>
	);
}

export default StepsInput;
