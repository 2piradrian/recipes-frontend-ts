export type ingredient = {
	cant: string;
	unit: string;
	name: string;
};

export type comment = {
	author: string;
	content: string;
};

export type recipe = {
	id?: string;
	name: string;
	category: string;
	time: string;
	description: string;
	ingredients: Array<ingredient>;
	steps: Array<string>;
	image: string;
	authorId: string;
};

export type registerUserData = {
	email: string;
	password: string;
	name: string;
	image: number;
};
/* cambiarle el nombre a UserData */
export type fullUserData = {
	id: string;
	email: string;
	name: string;
	surname: string;
	image: number;
	categories: Array<string>;
	favourites: Array<string>;
	recipes: Array<recipe>;
};

export type action = {
	type: string;
	payload: any;
};

/* mover esto a donde se usa */
export type Step1 = {
	title: string;
	category: string;
	estimatedTime: string;
	unit: string;
};

export type Step2 = {
	imageUrl: string;
	description: string;
};
/*  */
export type SesionData = {
	user: fullUserData;
	tokens: Tokens;
};

export type Tokens = {
	accessToken: string;
	refreshToken: string;
};
