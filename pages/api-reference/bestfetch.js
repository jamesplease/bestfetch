import Lowlight from 'react-lowlight';
import Link from '../../components/link';

export default function bestfetch() {
  return (
    <div className="page">
      <h1>
        <code>bestfetch</code>
      </h1>
      <p>Initiates an HTTP request.</p>
      <Lowlight
        language="js"
        inline={false}
        value={`import { bestfetch } from 'bestfetch';`}
      />
      <h3>Arguments</h3>
      <ol>
        <li>
          <code>url</code>. The URL of the request.
        </li>
        <li>
          [<code>options</code>]. An object that allows you to configure the
          request. No options are required. Supported options are:
          <ul>
            <li>
              <b>
                <code>method</code>
              </b>
              : The HTTP method of the request.
            </li>
            <li>
              <b>
                <code>body</code>
              </b>
              : The body of the request; typically a <code>string</code>.
            </li>
            <li>
              <b>
                <code>headers</code>
              </b>
              : An object of HTTP headers to include in the request.
            </li>
            <li>
              <b>
                <code>dedupe</code>
              </b>
              : Whether or not to deduplicate the request. Defaults to{' '}
              <code>true</code>.{' '}
              <Link href="/guides/deduplicating-requests">
                <a>Learn more here</a>
              </Link>
            </li>
            <li>
              <b>
                <code>cachePolicy</code>
              </b>
              : Determines how the cache will be used, if at all. Defaults to{' '}
              <code>"cache-first"</code>. Valid values are{' '}
              <code>"cache-first"</code>, <code>"network-only"</code>, and{' '}
              <code>"cache-only"</code>.{' '}
              <Link href="/guides/caching-responses">
                <a>Learn more here</a>
              </Link>
              .
            </li>
            <li>
              <b>
                <code>responseType</code>
              </b>
              : The <code>responseType</code> option of the request. Defaults to{' '}
              <code>"json"</code>. Valid values are <code>"json"</code>,{' '}
              <code>"text"</code>, <code>"formData"</code>, <code>"blob"</code>,
              and <code>"arrayBuffer"</code>.{' '}
              <Link href="/guides/other-response-types">
                <a>Learn more here</a>
              </Link>
              .
            </li>
            <li>
              <b>
                <code>requestKey</code>
              </b>
              : Optional.{' '}
              <Link href="/guides/caching-responses">
                <a>Learn more here</a>
              </Link>
              .
            </li>
          </ul>
          <p>Additional, less commonly used options come from fetch:</p>
          <ul>
            <li>
              <b>
                <code>mode</code>
              </b>
            </li>
            <li>
              <b>
                <code>credentials</code>
              </b>
            </li>
            <li>
              <b>
                <code>cache</code>{' '}
              </b>
              <i>
                (note: this is unrelated to the caching system of bestfetch)
              </i>
            </li>
            <li>
              <b>
                <code>redirect</code>
              </b>
            </li>
            <li>
              <b>
                <code>referrer</code>
              </b>
            </li>
            <li>
              <b>
                <code>referrerPolicy</code>
              </b>
            </li>
            <li>
              <b>
                <code>integrity</code>
              </b>
            </li>
            <li>
              <b>
                <code>keepalive</code>
              </b>
            </li>
            <li>
              <b>
                <code>signal</code>
              </b>
            </li>
          </ul>
        </li>
      </ol>
      <p>
        To learn more about the options that come from <code>fetch</code>, refer
        to{' '}
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch">
          the MDN documentation
        </a>
        .
      </p>
      <h3>Returns</h3>
      <p>
        A{' '}
        <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise">
          Promise
        </a>{' '}
        that resolves once the response is received from the server or cache. It
        rejects otherwise.
      </p>
      <h3>Example Usage</h3>
      <Lowlight
        language="js"
        inline={false}
        value={`bestfetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(res => {
    console.log('Got some data', res.data);
  });`}
      />
      <p>
        More examples, as well as guidance on usage, can be found in the{' '}
        <Link href="/guides/making-requests">
          <a>Making Requests</a>
        </Link>{' '}
        guide.
      </p>
    </div>
  );
}
