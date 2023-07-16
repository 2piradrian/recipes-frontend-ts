import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import style from "./style.module.css";

type Props = {
	route?: string;
	action?: () => void;
	content: ReactNode;
};

function ActionButton({ route, content, action }: Props) {
	const navigate = useNavigate();
	return (
		<div
			className={style.container}
			onClick={() => {
				action ? action() : navigate(route!);
			}}>
			{content}
		</div>
	);
}

export default ActionButton;
