const initialState = {
    posts: [],
    isLoaded: false,
};

export const posts = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SSR_DATA':
            return {
                ...state,
                posts: action.payload,
                isLoaded: true,
            };

        case 'SET_DATA':
            return {
                ...state,
                posts: action.payload,
                isLoaded: true,
            };

        case 'SET_LOADED':
            return {
                ...state,
                isLoaded: action.payload,
            };

        default:
            return state;
    }
};
