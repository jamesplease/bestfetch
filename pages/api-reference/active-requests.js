import Lowlight from 'react-lowlight';

export default () => {
  return (
    <div className="page">
      <h1>
        <code>activeRequests</code>
      </h1>
      <div className="advanced">
        <span className="emoji">💁‍♀️</span> <b>Heads up!</b> Most apps never need
        to use this object.
      </div>
      <p>An object for managing the active requests.</p>
      <Lowlight
        language="js"
        inline={false}
        value={`import { activeRequests } from 'bestfetch';`}
      />
      <p>
        <code>activeRequests</code> has two methods:
      </p>
      <ul>
        <li>
          <b>
            <code>isRequestInFlight</code>
          </b>
        </li>
        <li>
          <b>
            <code>clear</code>
          </b>
        </li>
      </ul>
      <h2>
        <code>isRequestInFlight</code>
      </h2>
      <p>
        A method you can call to determine if a request is in flight for a given{' '}
        <code>requestKey</code>.
      </p>
      <h3>Arguments</h3>
      <ol>
        <li>
          <b>
            <code>requestKey</code>
          </b>
          : The <code>requestKey</code> to check.
        </li>
      </ol>
      <h3>Returns</h3>
      <p>
        A <code>boolean</code> representing whether or not a request is in
        flight for the specified <code>requestKey</code>.
      </p>
      <h3>Example Usage</h3>
      <Lowlight
        language="js"
        inline={false}
        value={`activeRequests.isRequestInFlight('my-request-key')`}
      />

      <h2>
        <code>clear</code>
      </h2>
      <p>
        Removes tracking on all in-flight requests. In-flight requests are{' '}
        <b>not</b> cancelled: calling this method only ensures that subsequent
        identical requests are not deduped.
      </p>
      <h3>Arguments</h3>
      <p>This method does not accept any arguments.</p>
      <h3>Returns</h3>
      <p>This method does not return anything.</p>
      <h3>Example Usage</h3>
      <Lowlight language="js" inline={false} value={`activeRequests.clear()`} />
    </div>
  );
};
