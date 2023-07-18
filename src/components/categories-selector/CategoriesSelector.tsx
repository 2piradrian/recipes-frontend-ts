import { categories } from "../../data/data";
import { fullUserData } from "../../types/types";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import style from "./style.module.css";
import useAccount from "../../hooks/useAccount";

type Props = {
	preferred: string[];
	setPreferred: (value: React.SetStateAction<Array<string>>) => void;
};

function CategoriesSelector({ preferred, setPreferred }: Props) {
	const { updatePreferences } = useAccount();
	const userData: fullUserData = useSelector((state: any) => state.userData);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		updatePreferences({
			...userData,
			categories: preferred,
		});
		toast.success("Preferencias actualizadas 😎");
	};

	return (
		<form className={style.categoriesContainer} onSubmit={(e) => handleSubmit(e)}>
			{categories.map((cat) => (
				<div className={style.checkbox} key={cat}>
					<label htmlFor={cat}>{cat}</label>
					<input
						type="checkbox"
						id={cat}
						name={cat}
						value={cat}
						checked={preferred.includes(cat)}
						onChange={() =>
							setPreferred((prevPreferred) =>
								prevPreferred.includes(cat)
									? prevPreferred.filter((c) => c !== cat)
									: [...prevPreferred, cat]
							)
						}
					/>
				</div>
			))}
			<button>Actualizar</button>
		</form>
	);
}

export default CategoriesSelector;
