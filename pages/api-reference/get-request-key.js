import Lowlight from 'react-lowlight';

export default () => {
  return (
    <div className="page">
      <h1>
        <code>getRequestKey</code>
      </h1>
      <div className="advanced">
        <span className="emoji">💁‍♀️</span> <b>Heads up!</b> Most apps never need
        to use this function.
      </div>
      <p>
        A function that implements the default algorithm of generating a request
        key.
      </p>
      <Lowlight
        language="js"
        inline={false}
        value={`import { getRequestKey } from 'bestfetch';`}
      />
      <h2>Arguments</h2>
      <ol>
        <li>
          <b>
            <code>options</code>
          </b>
          : An object that contains information about a request.
          <br />
          The options are:
          <ul>
            <li>
              <b>
                <code>url</code>
              </b>
              : The URL of the request.
            </li>
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
              : The <code>body</code> option of the request.
            </li>
            <li>
              <b>
                <code>responseType</code>
              </b>
              : The <code>responseType</code> option of the request.
            </li>
          </ul>
        </li>
      </ol>
      <h2>Returns</h2>
      <p>
        A <code>string</code> that is the request key..
      </p>
      <h2>Example Usage</h2>
      <div className="advanced">
        <span className="emoji">💁‍♀️</span> <b>Heads up!</b> You can copy and
        paste the following code snippet into your browser's developer tools to
        try it out!
      </div>
      <Lowlight
        language="js"
        inline={false}
        value={`const requestKey = getRequestKey({
  url: '/api/books/2',
  method: 'POST',
  body: '{}',
  responseType: 'json'
});

console.log('The request key is:', requestKey);`}
      />
      <p>
        Keep in mind that bestfetch automatically generates request keys for
        you, so it's very unlikely that you will ever need to call this function
        directly.
      </p>
    </div>
  );
};
