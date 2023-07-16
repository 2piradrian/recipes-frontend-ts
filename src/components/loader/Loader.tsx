import { ColorRing } from "react-loader-spinner";

function Loader() {
	return (
		<ColorRing
			visible
			height="80"
			width="80"
			ariaLabel="recipe-loading"
			wrapperClass="blocks-wrapper"
			colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
		/>
	);
}

export default Loader;
