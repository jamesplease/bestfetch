import { bestfetch } from 'bestfetch';
import './styles.css';
import style from './app.module.css';
import Header from '../components/header';
import Nav from '../components/nav';
import Footer from '../components/footer';

if (typeof window !== 'undefined') {
  console.log('hi');
  window.bestfetch = bestfetch;
}
// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Header />
      <div>
        <Nav />
        <div className={style.bodyContents}>
          <Component {...pageProps} />
          <Footer />
        </div>
      </div>
    </React.Fragment>
  );
}
