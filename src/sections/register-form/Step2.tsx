import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import useVerification from "../../hooks/useVerification";
import PhotoSelector from "../../components/photo-selector/PhotoSelector";
import { Toaster } from "react-hot-toast";

type Props = {
	handleStep: (number: number) => void;
	dataStep: (data: any) => void;
};

function Step2({ handleStep, dataStep }: Props) {
	const { UserSchema } = useVerification();
	const [selectedPhoto, setSelectedPhoto] = useState(1);

	const handleSubmit = (values: any) => {
		dataStep({ ...values, image: selectedPhoto });
		handleStep(1);
	};

	return (
		<>
			<Formik
				initialValues={{ username: "", usersurname: "" }}
				validationSchema={UserSchema}
				onSubmit={handleSubmit}>
				{({ errors, touched }) => (
					<Form className="form">
						<div className="arrowInputs">
							<div className="columnInputs">
								<label htmlFor="username">Nombre</label>
								<Field
									type="text"
									id="username"
									name="username"
									placeholder="La Mona"
								/>
								<ErrorMessage name="username" component="small" />
							</div>
							<div className="columnInputs">
								<label htmlFor="usersurname">Apellido</label>
								<Field
									type="text"
									id="usersurname"
									name="usersurname"
									placeholder="Jimenez"
								/>
								<ErrorMessage name="usersurname" component="small" />
							</div>
						</div>
						<PhotoSelector
							setSelectedPhoto={setSelectedPhoto}
							selectedPhoto={selectedPhoto}
						/>
						<div className="arrowInputs">
							<button type="button" onClick={() => handleStep(-1)}>
								Atrás
							</button>
							<button type="submit" onClick={() => {}}>
								Enviar
							</button>
						</div>
					</Form>
				)}
			</Formik>
			<Toaster position="top-right" />
		</>
	);
}

export default Step2;
