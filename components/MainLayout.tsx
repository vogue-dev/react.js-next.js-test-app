import Link from 'next/link';
import Head from 'next/head';
import { Navbar, Nav } from 'react-bootstrap';
// In this component, i use some Bootstrap UI

export const MainLayout = ({ children, title = 'Default Title', description = 'Default description' }) => {
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
                        <Navbar.Brand>TheBiggestLogoEver</Navbar.Brand>
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
                </Navbar.Collapse>
            </Navbar>

            <main className="container text-center">{children}</main>
        </>
    );
};

export default MainLayout;
