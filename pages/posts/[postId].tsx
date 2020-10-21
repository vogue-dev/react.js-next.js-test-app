import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Loader from '../../components/Loader';
import Router, { useRouter } from 'next/router';
import { MainLayout } from '../../components/MainLayout';
import { NextPageContext } from 'next';
import { MyPost } from '../../interfaces/posts';

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
    padding: 10px 20px;
    border: 0px;
    border-radius: 5px;
    transition-duration: 0.3s;
    :hover {
        color: #fff;
        background-color: #0069d9;
        border-color: #0062cc;
    }
`;

interface PostPageProps {
    post: MyPost;
}

export const Post = ({ post: ServerPost }: PostPageProps) => {
    let [post, setPost] = useState(ServerPost);
    const router = useRouter();

    useEffect(() => {
        async function load() {
            await axios(`https://simple-blog-api.crew.red/posts/?id=${router.query.postId}`).then((data) =>
                setPost(data.data[0])
            );
        }

        !ServerPost ? load() : null;
    }, []);

    return (
        <>
            {post ? (
                <MainLayout title={`Post #${post.title}`} description={'This is post'}>
                    <HeadText>{post.title}</HeadText>
                    <Card key={post.id}>
                        <CardHeader>Post ID: {post.id}</CardHeader>
                        <CardBody>
                            <CardTitle>{post.title}</CardTitle>
                            <CardText>{post.body}</CardText>
                            <ButtonPrimary onClick={() => Router.push(`/`)}>Go to all posts</ButtonPrimary>
                        </CardBody>
                    </Card>
                </MainLayout>
            ) : (
                <Loader />
            )}
        </>
    );
};

Post.getInitialProps = async ({ query, req }: NextPageContext) => {
    if (!req) {
        return { post: null };
    }
    let post: MyPost = await axios(`https://simple-blog-api.crew.red/posts/?id=${query.postId}`).then(
        (data) => data.data[0]
    );
    return { post };
};

export default Post;
