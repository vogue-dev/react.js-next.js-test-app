import Link from 'next/link';
import Head from 'next/head';
import { Navbar, Nav } from 'react-bootstrap';

export const MainLayout = ({
	children,
	title = 'Default Title',
	description = 'Default description',
}) => {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description}></meta>
				<meta charSet="utf-8" />
			</Head>

			<Navbar bg="primary" variant="dark" expand="lg">
				<Link href="/">
					<a>
						<Navbar.Brand>We need bigger LOGO</Navbar.Brand>
					</a>
				</Link>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link as="span">
							<Link href="/">
								<a>Posts</a>
							</Link>
						</Nav.Link>
						<Nav.Link as="span">
							<Link href="/posts/new">
								<a>Create Post</a>
							</Link>
						</Nav.Link>
					</Nav>
					{/* <Form inline>
						<FormControl type="text" placeholder="Search" className="mr-sm-2" />
						<Button variant="outline-success">Search</Button>
					</Form> */}
				</Navbar.Collapse>
			</Navbar>

			<main className="container text-center">{children}</main>
			<style jsx>{`
				nav {
					position: fixed;
					height: 60px;
					left: 0px;
					top: 0px;
					right: 0px;
					background: black;
					display: flex;
					justify-content: space-around;
					align-items: center;
				}

				nav a {
					color: white;
					text-decoration: none;
				}

				main {
					margin-top: 60px;
					padding: 1rem;
				}
			`}</style>
		</>
	);
};

export default MainLayout;
