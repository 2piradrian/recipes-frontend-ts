import NavItem from "../nav-item/NavItem";
import { AiFillHome } from "react-icons/ai";
import { MdFavorite } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { photoList } from "../../data/data";
import nouser from "../../assets/nouser.jpg";
import style from "./style.module.css";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

type Props = {
	state: boolean;
};

function NavRoutes({ state }: Props) {
	const { user } = useContext(AuthContext);

	return (
		<>
			<div className={style.routes}>
				<NavItem icon={<AiFillHome />} name="Home" route="/home" state={state} />
				<NavItem icon={<FaSearch />} name="Explorar" route="/explore" state={state} />
				<NavItem icon={<MdFavorite />} name="Favoritos" route="/favourites" state={state} />
				<NavItem icon={<FaBook />} name="Recetario" route="/myrecipes" state={state} />
			</div>
			<div className={style.user}>
				<NavItem
					icon={
						<img
							src={user ? photoList[user.image] : nouser}
							onError={({ currentTarget }) => {
								currentTarget.onerror = null;
								currentTarget.src = nouser;
							}}
							alt="profile"
							className={style.userimg}
						/>
					}
					name="Perfil"
					route="/user"
					state={state}
				/>
			</div>
		</>
	);
}

export default NavRoutes;
