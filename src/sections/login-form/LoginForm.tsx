import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import Titles from "../../components/titles/Titles";
import useAccount from "../../hooks/useAccount";
import useVerification from "../../hooks/useVerification";
import "../../styles/forms.css";

function LoginForm() {
	const { login } = useAccount();
	const { SignInSchema } = useVerification();

	const handleSubmit = (values: any) => {
		login(values.email, values.password);
	};

	return (
		<section className="bigcontainer">
			<Titles title="Hola de nuevo" subtitle="ingresá acá 👇" />
			<Formik
				initialValues={{ email: "", password: "" }}
				onSubmit={handleSubmit}
				validationSchema={SignInSchema}>
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
								placeholder="* * * * * * * * * * * * * *"
							/>
							<ErrorMessage name="password" component="small" />
						</div>
						<button type="submit">Ingresar</button>
					</Form>
				)}
			</Formik>
			<Link to="/register" className="link">
				Aún no tengo una cuenta 😔
			</Link>
		</section>
	);
}

export default LoginForm;
