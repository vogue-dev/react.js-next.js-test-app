import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';

import Router from 'next/router';
import Loader from '../components/Loader';
import { MainLayout } from '../components/MainLayout';
import { MyPosts } from '../interfaces/posts';
import { deletePost, setSsrPostsData } from '../redux/actions/posts';

const HeadText = styled.h1`
    text-align: center;
    color: white;
`;

const Card = styled.div`
    max-width: 90%;
    position: relative;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: rgba(0, 0, 0, 0.25);
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, 0.125);
    border-radius: 0.25rem;
    margin: 0 auto;
    margin-top: 50px;
    padding: 30px;
`;

const CardHeader = styled.h4`
    margin-bottom: 0.75rem;
    font-weight: 500;
    line-height: 1.2;
    color: gray;
`;

const CardBody = styled.div`
    padding-top: 10px;
`;

const CardTitle = styled.h5`
    color: white;
    padding: 10px;
`;
const CardText = styled.p`
    color: lightgray;
    margin-top: 0;
    margin-bottom: 1rem;
    display: block;
    padding-bottom: 30px;
    margin: 0 10px 0 10px;
`;

const ButtonPrimary = styled.button`
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
    margin: 0 10px 0 10px;
    display: inline-block;
    padding: 6px 12px;
    border: 0px;
    border-radius: 0.25rem;
    transition-duration: 0.3s;
    :hover {
        color: #fff;
        background-color: #0069d9;
        border-color: #0062cc;
    }
`;

const ButtonDanger = styled.button`
    color: #fff;
    background-color: #dc3545;
    margin: 0 10px 0 10px;
    display: inline-block;
    padding: 6px 12px;
    border: 0px;
    border-radius: 0.25rem;
    transition-duration: 0.3s;
    :hover {
        color: #fff;
        background-color: #c82333;
        border-color: #bd2130;
    }
`;

interface PostsPageProps {
    ssrData: object;
}

const Index = ({ ssrData: ServerPost }: PostsPageProps) => {
    const dispatch = useDispatch();
    const isLoaded = useSelector(({ posts }) => posts.isLoaded);
    const posts = useSelector(({ posts }) => posts.posts);

    useEffect(() => {
        ServerPost ? dispatch(setSsrPostsData(ServerPost)) : null;
    }, [dispatch]);

    const onClickRemovePost = async (id) => {
        await dispatch(deletePost(id));
    };

    return (
        <>
            {isLoaded ? (
                <MainLayout title={'Posts Page'} description={'This is all posts'}>
                    <HeadText>THE WALL STREET JOURNAL</HeadText>
                    {posts &&
                        posts.map((post) => (
                            <Card key={post.id}>
                                <CardHeader>Post ID: {post.id}</CardHeader>
                                <CardBody>
                                    <CardTitle>{post.title}</CardTitle>
                                    <CardText>{post.body}</CardText>
                                    <ButtonPrimary onClick={() => Router.push(`/posts/${post.id}`)}>
                                        Read Post
                                    </ButtonPrimary>
                                    <ButtonDanger onClick={() => onClickRemovePost(post.id)}>Remove post</ButtonDanger>
                                </CardBody>
                            </Card>
                        ))}
                </MainLayout>
            ) : (
                <Loader />
            )}
            )
        </>
    );
};

Index.getInitialProps = async ({ req }) => {
    if (!req) {
        return { post: null };
    }

    const ssrData = await axios('https://simple-blog-api.crew.red/posts').then((data) => data.data.reverse());
    return { ssrData };
};

export default Index;
