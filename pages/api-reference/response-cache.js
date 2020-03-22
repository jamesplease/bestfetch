import Lowlight from 'react-lowlight';

export default () => {
  return (
    <div className="page">
      <h1>
        <code>responseCache</code>
      </h1>
      <p>
        An object that allows direct read and write access to the response
        cache.
      </p>
      <Lowlight
        language="js"
        inline={false}
        value={`import { responseCache } from 'bestfetch';`}
      />
      <p>
        <code>responseCache</code> has the following methods:
      </p>
      <ul>
        <li>
          <b>
            <code>get</code>
          </b>
        </li>
        <li>
          <b>
            <code>set</code>
          </b>
        </li>
        <li>
          <b>
            <code>has</code>
          </b>
        </li>
        <li>
          <b>
            <code>delete</code>
          </b>
        </li>
        <li>
          <b>
            <code>clear</code>
          </b>
        </li>
        <li>
          <b>
            <code>useCachedResponse</code>
          </b>
        </li>
      </ul>
    </div>
  );
};
