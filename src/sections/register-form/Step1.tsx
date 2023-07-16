import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import useVerification from "../../hooks/useVerification";
import style from "./style.module.css";
import "../../styles/forms.css";

type Props = {
	handleStep: (number: number) => void;
	dataStep: (data: any) => void;
};

function Step1({ handleStep, dataStep }: Props) {
	const { RegisterSchema } = useVerification();

	const handleSubmit = (values: any) => {
		handleStep(1);
		dataStep(values);
	};

	return (
		<div className={style.container}>
			<Formik
				initialValues={{ email: "", password: "", repeatpass: "" }}
				validationSchema={RegisterSchema}
				onSubmit={handleSubmit}>
				{({ errors, touched }) => (
					<Form className="form">
						<div className="columnInputs">
							<label htmlFor="email">Correo electrónico</label>
							<Field
								type="email"
								id="email"
								name="email"
								placeholder="example@email.com"
							/>
							<ErrorMessage name="email" component="small" />
						</div>
						<div className="columnInputs">
							<label htmlFor="password">Contraseña</label>
							<Field
								type="password"
								id="password"
								name="password"
								placeholder="* * * * * * * * * *"
							/>
							<ErrorMessage name="password" component="small" />
						</div>
						<div className="columnInputs">
							<label htmlFor="repeatpass">Repetir contraseña</label>
							<Field
								type="password"
								id="repeatpass"
								name="repeatpass"
								placeholder="* * * * * * * * * *"
							/>
							<ErrorMessage name="repeatpass" component="small" />
						</div>
						<button type="submit">Siguiente</button>
					</Form>
				)}
			</Formik>
			<Link to="/login" className="link">
				Ya tengo una cuenta 👨‍🍳
			</Link>
			<Toaster />
		</div>
	);
}

export default Step1;
