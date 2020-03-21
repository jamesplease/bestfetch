import Link from 'next/link';

export default () => {
  return (
    <div className="page">
      <h1>Other Response Types</h1>
      <div className="advanced">
        <span className="emoji">💁‍♀️</span> <b>Heads up!</b> This is an advanced
        API that most people will not need to use.
      </div>
      <p>
        bestfetch assumes that all requests return JSON responses. If you have
        an endpoint that returns something other than JSON, then you must use
        the <code>responseType</code> option when calling <code>bestfetch</code>{' '}
        to configure how it will be parsed.
      </p>
      <h2>
        Using <code>responseType</code>
      </h2>
      <p>
        The supported values for <code>responseType</code> are all of the{' '}
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/Body#Methods">
          Body mixin methods
        </a>
        :
      </p>
      <ul>
        <li>
          <code>"json"</code>: Returns the result of parsing the response text
          as JSON.
        </li>
        <li>
          <code>"text"</code>: Returns a string of the response body.
        </li>
        <li>
          <code>"formData"</code>: Returns a{' '}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/FormData">
            FormData
          </a>{' '}
          object from the response body.
        </li>
        <li>
          <code>"blob"</code>: Returns a{' '}
          <a href="https://developer.mozilla.org/en-US/docs/Web/API/Blob">
            Blob
          </a>{' '}
          from the response body.
        </li>
        <li>
          <code>"arrayBuffer"</code>: Returns an{' '}
          <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer">
            ArrayBuffer
          </a>{' '}
          from the response body.
        </li>
      </ul>
      <p>
        For more information, please reference{' '}
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/Body#Methods">
          the Body mixin documentation
        </a>{' '}
        on MDN.
      </p>
    </div>
  );
};
