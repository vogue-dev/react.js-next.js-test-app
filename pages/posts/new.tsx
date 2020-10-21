import { useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
// On this page, i use someBootstrap UI

import { MainLayout } from '../../components/MainLayout';
import { useRouter } from 'next/router';
import { createNewPost } from '../../redux/actions/posts';

const HeadText = styled.h1`
    text-align: center;
    color: white;
`;

export const CreatePost = () => {
    const dispatch = useDispatch();
    let router = useRouter();
    let title: any = useRef();
    let body: any = useRef();

    const onClickAddNewPost = (e) => {
        e.preventDefault();
        let titleValue = title.current.value;
        let bodyValue = body.current.value;

        dispatch(createNewPost(titleValue, bodyValue, router));
    };

    return (
        <>
            <MainLayout title={'Create new Post'} description={'Here you can create new post'}>
                <HeadText>CREATE NEW POST</HeadText>
                <Form className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 create__post__form">
                    <Form.Control ref={title} type="text" name="title" placeholder="title" />
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Control as="textarea" ref={body} type="text" name="body" placeholder="body" />
                    </Form.Group>
                    <Button onClick={onClickAddNewPost}>Create new Post</Button>
                </Form>
            </MainLayout>
        </>
    );
};

export default CreatePost;
