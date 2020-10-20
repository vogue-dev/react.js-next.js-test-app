import axios from 'axios';

export const fetchingPosts = () => async (dispatch) => {
	// dispatch(setLoaded(false));

	await fetch('https://simple-blog-api.crew.red/posts')
		.then((data) => data.json())
		.then((data) => data.reverse())
		.then((data) => console.log(data))
		.then((data) => setPosts(data));
};

export const setPosts = (posts) => ({
	type: 'GET_POSTS',
	payload: posts,
});

// export const setLoaded = (payload) => ({
// 	type: 'SET_LOADED',
// 	payload,
// });
