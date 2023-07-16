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
	comments: Array<comment>;
	image: string;
	authorname: string;
	authoruid: string;
	authorphoto?: string;
};

export type partialUserData = {
	email: string;
	name: string;
	surname: string;
	image: number;
	categories: Array<string>;
	favourites: Array<string>;
	recipes: Array<recipe>;
};
export type fullUserData = {
	uid: string;
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
