import style from "./style.module.css";

type Props = {
	title: string;
	subtitle: string;
};

function Titles({ title, subtitle }: Props) {
	return (
		<div className={style.container}>
			<h2 className={style.title}>{title}</h2>
			<h3 className={style.subtitle}>{subtitle}</h3>
		</div>
	);
}

export default Titles;
