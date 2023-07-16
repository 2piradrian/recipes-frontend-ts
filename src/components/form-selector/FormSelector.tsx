import "../../styles/forms.css";

type Props = {
	data: Array<string>;
	label: string;
};

function FormSelector({ data, label }: Props) {
	return (
		<>
			<option value="">{label}</option>
			{data.map((item) => (
				<option key={item} value={item}>
					{item}
				</option>
			))}
		</>
	);
}

export default FormSelector;
