import style from "./style.module.css";

type Props = {
	title: string;
	step: number;
};

function StepTitle({ title, step }: Props) {
	return (
		<div className={style.container}>
			<div className={style.number}>{step}</div>
			<h2 className={style.title}>{title}</h2>
		</div>
	);
}

export default StepTitle;
