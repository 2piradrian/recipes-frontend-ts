import { photoList } from "../../data/data";
import style from "./style.module.css";

type Props = {
	selectedPhoto: number;
	setSelectedPhoto: (index: number) => void;
};

function PhotoSelector({ setSelectedPhoto, selectedPhoto }: Props) {
	const handleSelect = (index: number) => {
		setSelectedPhoto(index);
	};

	return (
		<div className={style.container}>
			<label>Selecciona tu foto de perfil:</label>
			<div className={style.photoContainer}>
				{photoList.map((image, index) => (
					<img
						key={index}
						src={image}
						alt={`Imagen ${index}`}
						style={{
							border: selectedPhoto === index ? "3px solid var(--contrast)" : "none",
						}}
						onClick={() => handleSelect(index)}
					/>
				))}
			</div>
		</div>
	);
}

export default PhotoSelector;
