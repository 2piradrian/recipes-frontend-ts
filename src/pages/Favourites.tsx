import Titles from "../components/titles/Titles";
import FavouritesView from "../sections/favourites-view/FavouritesView";

function Favourites() {
	return (
		<div className="bigcontainer">
			<Titles title="Tus favoritos" subtitle="aquellas recetas que marcaste con un corazon" />
			<FavouritesView />
		</div>
	);
}

export default Favourites;
