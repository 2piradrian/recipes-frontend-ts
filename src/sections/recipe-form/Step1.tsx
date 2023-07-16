import { Formik, Form, Field, ErrorMessage } from "formik";
import FormSelector from "../../components/form-selector/FormSelector";
import StepTitle from "../../components/step-title/StepTitle";
import { categories, time } from "../../data/data";
import useVerification from "../../hooks/useVerification";
import "../../styles/forms.css";

type Props = {
	handleStep: (number: number) => void;
	dataStep: (data: any) => void;
	style: Object;
	data: any;
};

function Step1({ handleStep, dataStep, data, style }: Props) {
	const { RecipeSchema } = useVerification();
	return (
		<Formik
			initialValues={{ ...data }}
			validationSchema={RecipeSchema}
			enableReinitialize
			onSubmit={(values) => {
				dataStep(values);
				handleStep(1);
			}}>
			{() => (
				<Form className="form" style={style}>
					<StepTitle step={1} title="¡Empecemos!" />
					<div className="columnInputs">
						<label>Título</label>
						<Field type="text" placeholder="Pollo al disco" name="title" />
						<ErrorMessage name="title" component="small" />
					</div>
					<div className="columnInputs">
						<label>Categoria</label>
						<Field as="select" name="category">
							<FormSelector data={categories} label="Categorias" />
						</Field>
						<ErrorMessage name="category" component="small" />
					</div>
					<div className="arrowInputs">
						<div className="columnInputs">
							<label>Tiempo estimado</label>
							<Field type="number" placeholder="20" name="estimatedTime" />
							<ErrorMessage name="estimatedTime" component="small" />
						</div>
						<div className="columnInputs">
							<label>Unidad</label>
							<Field as="select" name="unit">
								<FormSelector data={time} label="Tiempo" />
							</Field>
							<ErrorMessage name="unit" component="small" />
						</div>
					</div>
					<div className="columnInputs">
						<button type="submit">Siguiente</button>
					</div>
				</Form>
			)}
		</Formik>
	);
}

export default Step1;
