import { useState, useEffect } from 'react';
import { MainLayout } from '../components/MainLayout';
import Link from 'next/link';
import Loader from '../components/Loader';
import { MyPost } from '../interfaces/posts';
import { Card, Button } from 'react-bootstrap';
import { NextPageContext } from 'next';

interface PostsPageProps {
	posts: MyPost[];
}

const Index = ({ posts: ServerIndex }: PostsPageProps) => {
	let [posts, setPosts] = useState(ServerIndex);

	useEffect(() => {
		async function load() {
			await fetch('https://simple-blog-api.crew.red/posts')
				.then((data) => data.json())
				.then((data) => data.reverse())
				.then((data) => setPosts(data));
		}
		if (!ServerIndex) {
			load();
		}
	}, []);

	const removePost = async (id) => {
		let question = confirm('You sure to delete this post?');

		if (question) {
			var requestOptions: any = {
				method: 'DELETE',
				redirect: 'follow',
			};

			// delete post
			await fetch(`https://simple-blog-api.crew.red/posts/${id}`, requestOptions)
				.then((response) => response.text())
				.then((result) => console.log('success', result))
				.then(() => alert('Post successfully deleted'))
				.catch((error) => console.log('error', error));

			// update current! not state data
			await fetch('https://simple-blog-api.crew.red/posts')
				.then((data) => data.json())
				.then((data) => data.reverse())
				.then((data) => setPosts(data));
		}
	};

	if (!posts) {
		return <Loader />;
	}

	return (
		<>
			<MainLayout title={'Posts Page'} description={'This is all posts'}>
				<h1>THE WALL STREET JOURNAL</h1>
				<ul>
					{console.log('posts', posts)}
					{posts.map((post) => (
						<Card className="col-xs-12 col-sm-12 col-md-12 col-lg-10 col-xl-10" key={post.id}>
							<Card.Header>Post ID: {post.id}</Card.Header>
							<Card.Body>
								<Link href={`/posts/[postId]`} as={`/posts/${post.id}`}>
									<a>
										<Card.Title>{post.title}</Card.Title>
									</a>
								</Link>
								<Card.Text>{post.body}</Card.Text>
								<Link href={`/posts/[postId]`} as={`/posts/${post.id}`}>
									<a>
										<Button variant="primary">Read this Post</Button>
									</a>
								</Link>
								<Button variant="danger" onClick={() => removePost(post.id)}>
									Remove post
								</Button>
							</Card.Body>
						</Card>
					))}
				</ul>
			</MainLayout>
		</>
	);
};

Index.getInitialProps = async ({ req }: NextPageContext) => {
	if (!req) {
		return { posts: null };
	}

	const response = await fetch('https://simple-blog-api.crew.red/posts');
	let posts = await response.json();
	posts = posts.reverse();

	return { posts };
};

export default Index;
