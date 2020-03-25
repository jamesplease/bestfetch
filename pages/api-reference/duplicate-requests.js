import Lowlight from 'react-lowlight';

export default () => {
  return (
    <div className="page">
      <h1>
        <code>duplicateRequests</code>
      </h1>
      <div className="advanced">
        <span className="emoji">💁‍♀️</span> <b>Heads up!</b> Most apps never need
        to use this object.
      </div>
      <p>An object for managing deduplicated requests.</p>
      <Lowlight
        language="js"
        inline={false}
        value={`import { duplicateRequests } from 'bestfetch';`}
      />
      <p>
        <code>duplicateRequests</code> has two methods:
      </p>
      <ul>
        <li>
          <a href="#isrequestinflight">
            <b>
              <code>isRequestInFlight</code>
            </b>
          </a>
        </li>
        <li>
          <a href="#clear">
            <b>
              <code>clear</code>
            </b>
          </a>
        </li>
      </ul>
      <h2 id="isrequestinflight">
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
        value={`duplicateRequests.isRequestInFlight('my-request-key');`}
      />

      <h2 id="clear">
        <code>clear</code>
      </h2>
      <div className="advanced advanced-danger">
        <span className="emoji">💁‍♀️</span> <b>Warning!</b> This method is not
        intended to be used in apps.
      </div>
      <p>
        Removes tracking on all in-flight requests. Be warned: all in-flight
        requests with <code>dedupe: true</code> will never resolve if this
        method is called.
      </p>
      <p>
        We <b>strongly</b> recommend against using this method in your app. You
        have been warned!
      </p>
      <h3>Arguments</h3>
      <p>This method does not accept any arguments.</p>
      <h3>Returns</h3>
      <p>This method does not return anything.</p>
      <h3>Example Usage</h3>
      <Lowlight
        language="js"
        inline={false}
        value={`duplicateRequests.clear();`}
      />
    </div>
  );
};