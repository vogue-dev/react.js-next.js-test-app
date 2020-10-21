import axios from 'axios';

// getting POSTS data first time from SSR
export const setSsrPostsData = (ssrData) => (dispatch) => {
    dispatch(setSsrData(ssrData));
};

// getting POSTS data when we want on Client Side
export const gettingPostsData = () => async (dispatch) => {
    dispatch(setLoaded(false));
    await axios('https://simple-blog-api.crew.red/posts')
        .then((data) => data.data.reverse())
        .then((data) => dispatch(setData(data)));
};

// delete post
export const deletePost = (id) => async (dispatch) => {
    let question = confirm('You sure to delete this post?');

    if (question) {
        var requestOptions: any = {
            method: 'DELETE',
            redirect: 'follow',
        };

        await fetch(`https://simple-blog-api.crew.red/posts/${id}`, requestOptions)
            .then((response) => response.text())
            .then((result) => console.log('success', result))
            .then(() => alert('Post successfully deleted'))
            .catch((error) => console.log('error', error));

        await axios('https://simple-blog-api.crew.red/posts')
            .then((data) => data.data.reverse())
            .then((data) => dispatch(setData(data)));
    }
};

// create new post
export const createNewPost = (titleValue, bodyValue, router) => async (dispatch) => {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let raw = JSON.stringify({
        title: titleValue,
        body: bodyValue,
    });

    let requestOptions: any = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
    };

    await fetch('https://simple-blog-api.crew.red/posts', requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .then(() => alert('Post successfully added'))
        .then(() => router.push('/'))
        .catch((error) => console.log('error', error));

    dispatch(gettingPostsData());
};

export const setSsrData = (ssrData) => ({
    type: 'SET_SSR_DATA',
    payload: ssrData,
});

export const setData = (data) => ({
    type: 'SET_DATA',
    payload: data,
});

export const setLoaded = (payload) => ({
    type: 'SET_LOADED',
    payload,
});
