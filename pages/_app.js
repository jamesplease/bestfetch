import Lowlight from 'react-lowlight';
import {
  bestfetch,
  CacheMissError,
  responseCache,
  activeRequests,
  getRequestKey,
} from 'bestfetch';
import js from 'highlight.js/lib/languages/javascript';
import './styles.css';
import './code-styles.css';
import style from './app.module.css';
import Header from '../components/header';
import Nav from '../components/nav';
import Footer from '../components/footer';

Lowlight.registerLanguage('js', js);

if (typeof window !== 'undefined') {
  window.bestfetch = bestfetch;
  window.CacheMissError = CacheMissError;
  window.responseCache = responseCache;
  window.activeRequests = activeRequests;
  window.getRequestKey = getRequestKey;
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
