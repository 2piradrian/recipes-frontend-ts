import { useContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Titles from "../components/titles/Titles";
import useAccount from "../hooks/useAccount";
import { AuthContext } from "../provider/AuthProvider";

import Step1 from "../sections/register-form/Step1";
import Step2 from "../sections/register-form/Step2";

type Step1 = {
	email: string;
	password: string;
	repeatpass: string;
};

type Step2 = {
	image: number;
	username: string;
	usersurname: string;
};

function Register() {
	const userData = useContext(AuthContext);
	const { register } = useAccount();

	const [formStep, setFormStep] = useState(1);
	const [dataStep1, setDataStep1] = useState<Step1 | null>();
	const [dataStep2, setDataStep2] = useState<Step2 | null>();

	useEffect(() => {
		if (formStep === 3) {
			registerUser();
		}
	}, [formStep, dataStep1, dataStep2]);

	const handleStep = (number: number) => {
		setFormStep(formStep + number);
	};

	const registerUser = () => {
		const { email, password } = dataStep1!;
		const { username, usersurname, image } = dataStep2!;

		const userData = {
			email: email,
			password: password,
			name: username + " " + usersurname,
			image: image,
		};

		register(userData);
	};

	if (userData) {
		return <Navigate to="/user" replace />;
	}

	return (
		<section className="bigcontainer">
			<Titles title="Sumate al equipo" subtitle="registrate acá 👇" />
			<div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
				{formStep === 1 ? (
					<Step1 handleStep={handleStep} dataStep={setDataStep1} />
				) : (
					<Step2 handleStep={handleStep} dataStep={setDataStep2} />
				)}
			</div>
		</section>
	);
}

export default Register;
