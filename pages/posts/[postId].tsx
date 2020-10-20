import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { MainLayout } from '../../components/MainLayout';
import Loader from '../../components/Loader';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { NextPageContext } from 'next';

export const Post = ({ post: ServerPost }) => {
	let [post, setPost] = useState(ServerPost);
	const router = useRouter();

	useEffect(() => {
		async function load() {
			const response = await fetch(
				`https://simple-blog-api.crew.red/posts/?id=${router.query.postId}`
			);
			await response.json().then((data) => setPost(data[0]));
		}
		if (!ServerPost) {
			load();
		}
	}, []);

	if (!post) {
		return <Loader />;
	}

	return (
		<>
			<MainLayout title={`Post #${post.title}`} description={'This is post'}>
				<h1>{post.title}</h1>
				<Card className="col-xs-12 col-sm-12 col-md-12 col-lg-10 col-xl-10">
					<Card.Header>Post ID: {post.id}</Card.Header>
					<Card.Body>
						<Card.Title>{post.title}</Card.Title>
						<Card.Text>{post.body}</Card.Text>
						<Link href="/">
							<a>
								<Button variant="primary">Go to all posts</Button>
							</a>
						</Link>
					</Card.Body>
				</Card>
			</MainLayout>
		</>
	);
};

Post.getInitialProps = async ({ query, req }: NextPageContext) => {
	if (!req) {
		return { post: null };
	}

	const response = await fetch(`https://simple-blog-api.crew.red/posts/?id=${query.postId}`);
	let post = await response.json();
	post = await post[0];

	return { post };
};

export default Post;
