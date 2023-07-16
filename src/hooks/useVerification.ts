import * as Yup from "yup";

function useVerification() {
	const RegisterSchema = Yup.object().shape({
		email: Yup.string()
			.email("Correo electrónico inválido")
			.required("Este campo es requerido"),
		password: Yup.string()
			.min(8, "La contraseña debe tener al menos 8 caracteres")
			.required("Este campo es requerido"),
		repeatpass: Yup.string()
			.oneOf([Yup.ref("password")], "Las contraseñas deben coincidir")
			.required("Este campo es requerido"),
	});

	const SignInSchema = Yup.object().shape({
		email: Yup.string()
			.email("Correo electrónico inválido")
			.required("Este campo es requerido"),
		password: Yup.string()
			.min(8, "La contraseña debe tener al menos 8 caracteres")
			.required("Este campo es requerido"),
	});

	const UserSchema = Yup.object().shape({
		username: Yup.string().required("Este campo es requerido"),
		usersurname: Yup.string().required("Este campo es requerido"),
	});

	const IngredientsSchema = Yup.object({
		ingredients: Yup.array().of(
			Yup.object().shape({
				amount: Yup.string().required("La cantidad es requerida"),
				unit: Yup.string().notOneOf(["Unidad"], "Seleccione una unidad"),
				name: Yup.string().required("El nombre es requerido"),
			})
		),
	});

	const RecipeSchema = Yup.object().shape({
		title: Yup.string().required("Este campo es obligatorio"),
		category: Yup.string().required("Este campo es obligatorio"),
		estimatedTime: Yup.number().required("Este campo es obligatorio"),
		unit: Yup.string().required("Este campo es obligatorio"),
	});

	const DescriptionSchema = Yup.object().shape({
		description: Yup.string().required("Este campo es obligatorio"),
		imageUrl: Yup.string().url("Debe ser una URL válida").required("Este campo es obligatorio"),
	});

	return {
		UserSchema,
		RegisterSchema,
		SignInSchema,
		IngredientsSchema,
		RecipeSchema,
		DescriptionSchema,
	};
}

export default useVerification;
