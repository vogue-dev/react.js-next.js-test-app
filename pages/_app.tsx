import App from 'next/app';
import { Provider } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import store from '../redux/store';

import '../styles/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
// import NextNprogress from 'nextjs-progressbar';

class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props;
		return (
			<Provider store={store}>
				<Component {...pageProps}> </Component>
			</Provider>
		);
	}
}

// export default function MyApp({ Component, pageProps }) {
// 	return (
// 		<>
// 			{/* <NextNprogress color="blue" startPosition="0.3" stopDelayMs="200" height="3" /> */}
// 			<Component {...pageProps} />
// 		</>
// 	);
// }

const makestore = () => store;
const wrapper = createWrapper(makestore);

export default wrapper.withRedux(MyApp);
