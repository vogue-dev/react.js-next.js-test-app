const initialState = {
	posts: [],
	// loading: false,
};

export const posts = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_POSTS':
			return {
				...state,
				posts: action.payload,
				// loading: action.payload,
			};

		default:
			return state;
	}
};
