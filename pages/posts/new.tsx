import { MainLayout } from '../../components/MainLayout';
import { useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';

export const CreatePost = () => {
	let router = useRouter();
	let title: any = useRef();
	let body: any = useRef();

	const onSumbitForm = (e) => {
		e.preventDefault();
		let titleValue = title.current.value;
		let bodyValue = body.current.value;

		// create new post
		var myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');
		var raw = JSON.stringify({
			title: titleValue,
			body: bodyValue,
		});

		var requestOptions: any = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
			redirect: 'follow',
		};

		fetch('https://simple-blog-api.crew.red/posts', requestOptions)
			.then((response) => response.text())
			.then((result) => console.log(result))
			.then(() => alert('Post successfully added'))
			.then(() => router.push('/'))
			.catch((error) => console.log('error', error));
	};

	return (
		<>
			<MainLayout title={'Create new Post'} description={'Here you can create new post'}>
				<h1>Create new Post</h1>

				<Form className="col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 create__post__form">
					<Form.Control ref={title} type="text" name="title" placeholder="title" />
					<Form.Group controlId="exampleForm.ControlTextarea1">
						<Form.Control as="textarea" ref={body} type="text" name="body" placeholder="body" />
					</Form.Group>
					<Button onClick={onSumbitForm}>Create new Post</Button>
				</Form>
			</MainLayout>
		</>
	);
};

export default CreatePost;
