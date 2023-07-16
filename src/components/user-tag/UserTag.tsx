import { photoList } from "../../data/data";
import nouser from "../../assets/nouser.jpg";
import style from "./style.module.css";

type Props = {
	author: string;
	photo: string;
};

function UserTag({ author, photo }: Props) {
	return (
		<div className={style.container}>
			<img
				src={photoList[parseInt(photo)] || nouser}
				onError={({ currentTarget }) => {
					currentTarget.onerror = null;
					currentTarget.src = nouser;
				}}
				alt="profile"
				className={style.photo}
			/>
			<p className={style.author}>{author}</p>
		</div>
	);
}

export default UserTag;
